const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');
const { prefix, token } = require('./config.json');

client.on('ready', () => {
	console.log('Western Bot Online!');
	client.user.setActivity('?help for commands', { type: "PLAYING" });
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on('message' ,async message => {
	
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);

	const command = args.shift().toLowerCase();

	 if (message.content === prefix + 'reset') {
		message.delete(10);
		switch(message.content.toUpperCase()) {
			case '!RESET':
				resetBot(message.channel);
				break;		
		}     
	}
	else if (message.content === prefix + 'ping') {
		message.delete(0);
		const m = await message.channel.send("Ping?");

		const L = `${m.createdTimestamp - message.createdTimestamp}ms`;
		const Al = `${Math.round(client.ping)}ms`;
		let pEmbed = new Discord.RichEmbed()
		.setColor('RANDOM')
		.setAuthor('Pong!')
		
		
		.addField("Latency", "```"+ L +" ```")
		.addField(" API Latency", "```"+ Al +" ```", true)
		.setFooter('Western Bot', client.user.displayAvatarURL)


		m.edit(pEmbed);
		console.log('Someone used ping');

	}
})

client.on('guildMemberAdd', async member => {
	
	const channel = member.guild.channels.find(ch => ch.name === 'leaves-joins');
	if (!channel) return;
	//console.log(member);
	let jEmbed = new Discord.RichEmbed()
		.setColor('RANDOM')
		.setAuthor('Welcome to Western Class of 2023+', member.guild.iconURL)
		.setThumbnail(`${member.guild.iconURL}`)
		.addField(`Welcome to the Western class of 2023, ${member.user.username}!`, 'Please change your discord name to match your real name so that everyone can get to know you. Also you can go to <#544006119249412116> to get a role which basically tells everyone what program you are doing in Western.')
		.setTimestamp()
		.setFooter(`Western Bot || Total members: ${member.guild.memberCount}`, client.user.displayAvatarURL)
		
		channel.send({embed: jEmbed}); 

	

	
	console.log('Someone joined');
});

client.on('guildMemberRemove', member => {
	const channel = member.guild.channels.find(ch => ch.name === 'leaves-joins');	
	
	if (!channel) return;
	let jEmbed = new Discord.RichEmbed()
		.setColor('RANDOM')
		.setAuthor('Someone Left the Discord', member.guild.iconURL)
		.setThumbnail(`${member.guild.iconURL}`)
		.addField(`The Server has been left by, ${member.user.username}`, "Bye Bye, you will be missed")
		.setTimestamp()
		.setFooter(`Western Bot || Total members: ${member.guild.memberCount}`, client.user.displayAvatarURL)
		
		channel.send({embed: jEmbed}); 
	
		console.log('Someone left');
});

function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Resetting...')
    .then(msg => client.destroy())
	.then(() => client.login(token));
	console.log('Someone used reset');
}

client.login(token);

