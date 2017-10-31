const Discord = require('discord.js')
const Command = require('../../cmdModule/commands').Command

class preCommand extends Command {
	constructor() {
		super({
			name: 'premium',
			help: 'Get info about notJust Premium'
		})
	}
	
	hasPermission(message) {
		if (message.guild && message.client.settings.get(message.guild.id).isDonator == true) return false
		//if (message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return true
		// if (message.author.id == message.guild.ownerID) return true
		return true
	}

	async run(message, args, api) {
		let embed = new Discord.RichEmbed()

		embed.setTitle('<:apple_symbol_info:359559750096257024> `About notJust Premium`')
		embed.setColor('#00ff00')

		embed.setFooter('Replying to ' + message.author.tag)
		embed.setDescription('**I, the founder of notJust, am just 13 and have to run my servers and sites off donations.**\n\nBecause of this, I have created **notJust Premium**: a premium, paid, server-based upgrade to notJust which gives access to many donator only commands and modules. \nThese include the AI command (chat with an artificial assistant) and Media Module (play music/videos from YouTube in voice channels).\n\n**Get notJust Premium - and support me - by [donating](https://patreon.com/justdotJS)**.')
		//embed.addField('`Premium`', '', false)
				message.channel.send({
			embed
		})
		return true
	}
}

module.exports = preCommand
