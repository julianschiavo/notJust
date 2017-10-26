const Discord = require('discord.js');
const yt = require('ytdl-core');
const Command = require('../../cmdModule/commands').Command

class addCommand extends Command {
	constructor() {
		super({
			name: 'add',
			help: 'Add music',
      lhelp: '{id/url}\n{id/url} is the YouTube video URL or ID.'
		})
	}

	hasPermission(message) {
		if (message.client.settings.get(message.guild.id).isDonator == true || message.author.id == require('../../config.json').owner) return true
		//if (message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return true
		// if (message.author.id == message.guild.ownerID) return true
		return false
	}

	async run(message, args, api) {
		if (!message.client.settings.get(message.guild.id)) {
			// Adding a new row to the collection uses `set(key, value)`
			message.client.settings.set(message.guild.id, message.client.defaultSettings);
		}

		let embed = new Discord.RichEmbed()
		
		embed.setDescription(String.fromCharCode(8203))
		embed.setColor('#00ff00')
		//embed.setTimestamp()
		embed.setFooter('Replying to ' + message.author.tag)
embed.setTitle('<:apple_music:356765236830666762> `Song Added to Queue`')

				
        
    
    let url = args[1];
		if (url == '' || url === undefined) return api.error('You must give a YouTube video url or id.');
		yt.getInfo(url, (err, info) => {
			if(err) return api.error('Invalid YouTube Link: ' + err);
			if (!message.client.queue.hasOwnProperty(message.guild.id)) message.client.queue[message.guild.id] = {}, message.client.queue[message.guild.id].playing = false, message.client.queue[message.guild.id].songs = [];
			message.client.queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.tag});
			embed.addField('`New Song`',info.title,false)
      message.channel.send({
					embed
				})
		});

		return true
	}
}

module.exports = joinCommand
