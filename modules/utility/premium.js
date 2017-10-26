const Discord = require('discord.js')
const Command = require('../../cmdModule/commands').Command

class preCommand extends Command {
	constructor() {
		super({
			name: 'premium',
			help: 'Get info about notJust Premium'
		})
	}

	async run(message, args, api) {

		let embed = new Discord.RichEmbed()

		embed.setTitle('<:apple_symbol_info:359559750096257024> `About notJust Premium`')
		embed.setColor('#00ff00')

		embed.setFooter('Replying to ' + message.author.tag)
		embed.setDescription(String.fromCharCode(8203))
		embed.addField('`Premium`', 'notJust Premium is a premium, paid, server-based upgrade to notJust which gives access to many donator only commands and modules, including the AI command (chat with an artificial assistant) and Music Module (play music from YouTube in voice channels).\n**Get notJust Premium - and support me - by donating. [Just press here!](https://patreon.com/justdotJS)**', false)
				message.channel.send({
			embed
		})
		return true
	}
}

module.exports = preCommand
