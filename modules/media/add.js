const Discord = require('discord.js');
const yt = require('ytdl-core');
const Command = require('../../cmdModule/commands').Command

class addCommand extends Command {
	constructor() {
		super({
			name: 'add',
			help: 'Add media to queue',
			lhelp: '{id/url}\n{id/url} is the YouTube video URL or ID.'
		})
	}

	hasPermission(message) {
		if (message.guild && (message.client.settings.get(message.guild.id).isDonator == true || message.author.id == require('../../config.json').owner)) {
			return true
		} else {
			let embed = new Discord.RichEmbed()

		embed.setTitle('<:apple_symbol_info:359559750096257024> `About notJust Premium`')
		embed.setColor('#00ff00')

		embed.setFooter('Replying to ' + message.author.tag)
		embed.setDescription('**I, the founder of notJust, am just 13 and have to run my servers and sites off donations.**\n\nBecause of this, I have created **notJust Premium**: a premium, paid, server-based upgrade to notJust which gives access to many donator only commands and modules. \nThese include the AI command (chat with an artificial assistant) and Media Module (play music/videos from YouTube in voice channels).\n\n**Get notJust Premium - and support me - by [donating](https://patreon.com/justdotJS)**.')
		//embed.addField('`Premium`', '', false)
				message.channel.send({
			embed
		})
		}
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
		embed.setTitle('<:apple_music:372943300753227786> `Queue Updated`')




		let url = args[1];
		if (url == '' || url === undefined) return api.error('You must give a YouTube video url or id.');
		yt.getInfo(url, (err, info) => {
			if (err) return api.error('Invalid YouTube Link: ' + err);
			if (!message.client.queue.hasOwnProperty(message.guild.id)) message.client.queue[message.guild.id] = {}, message.client.queue[message.guild.id].playing = false, message.client.queue[message.guild.id].songs = [];
			message.client.queue[message.guild.id].songs.push({
				url: url,
				title: info.title,
				requester: message.author.tag
			});
			embed.addField('`Added`', info.title, false)
			message.channel.send({
				embed
			})
		});

		return true
	}
}

module.exports = addCommand
