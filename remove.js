const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();




module.exports = {
	name: 'remove',
	description: 'Remove a role ',
	execute(message, args) {
        message.delete(10);
			

			const role = args.slice(0).join(" ");
			const roleToRe = message.guild.roles.find(x => x.name === role);
if (roleToRe) {
	// do something with role
	message.member.removeRole(roleToRe).catch(console.error);

	let proEmbed = new Discord.RichEmbed()
						.setColor('RANDOM')
						.setTitle('Role Removed')
						.setThumbnail(`${message.guild.iconURL}`)
						.addField("The role has been removed", `${message.member} You lost ${roleToRe}`)
						message.channel.send({embed: proEmbed});
						console.log('Someone used remove');	
	
} else {
    message.channel.send(new Discord.RichEmbed().setColor("RANDOM").setDescription(`${message.member} That role cannot be found or it is not self-assignable`));
}
},
			
};
