const { ownerID } = require('../config.json');

module.exports = {
	name: 'invite',
	description: 'Invite the bot to your server',
	execute(message, args) {
        message.delete(10);
        if(message.author.id !== ownerID) return message.reply('You do not have the perms to do this');
			message.channel.send("https://discordapp.com/oauth2/authorize?client_id=560662631552122910&scope=bot&permissions=8");
			console.log('Someone used invite');	
	},
	
};