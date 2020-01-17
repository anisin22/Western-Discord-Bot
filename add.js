const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();




module.exports = {
	name: 'add',
	description: 'Add a role to yourself',
	async execute(message, args) {
        message.delete(10);
			

		const role = args.slice(0).join(" ");
const roleToAdd = message.guild.roles.find(x => x.name === role);
await message.member.addRole(roleToAdd).catch(console.error);
if (message.member.roles.find(x => x.name === role)) {

    let proEmbed = new Discord.RichEmbed()
                        .setColor('RANDOM')
                        .setTitle('Role Added')
                        .setThumbnail(`${message.guild.iconURL}`)
                        .addField("New role has been added", `${message.member} You now have ${roleToAdd}`)
                        message.channel.send({embed: proEmbed});
                        console.log('Someone used add');    
    
} else {
    message.channel.send(new Discord.RichEmbed().setColor("RANDOM").setDescription(`${message.member} That role cannot be found or it is not self-assignable`));
}	
			
			
			
	},
			
	};
