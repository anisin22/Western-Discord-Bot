const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();


module.exports = {
	name: 'roles',
	description: 'Lists all the roles',
	execute(message, args) {
        message.delete(10);

		let sEmbed = new Discord.RichEmbed()
		.setColor('RANDOM')
		.setTitle("How to add Roles")
		.setThumbnail(`${message.guild.iconURL}`)
		.setAuthor(`${message.guild.name} Roles`, `${message.guild.iconURL}`)
		
		.setDescription('Use ?add <role name> to add the role to yourself. Do not include @ in front of the role you want to add.')
		.addField('**Role Count:**', `${message.guild.roles.size}`, true)
        .addField('**Roles:**', message.guild.roles.map(r => r).join(' ') , true)
        
        .setFooter('Western Bot', `${message.guild.iconURL}`);
        
		message.channel.send({embed: sEmbed})
		
	
		console.log('Someone used roles');	
	
	},
};