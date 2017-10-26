const Discord = require('discord.js');

const Command = require('../../cmdModule/commands').Command

class skipCommand extends Command {
	constructor() {
		super({
			name: 'skip',
			help: 'Skip media'
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

		message.client.dispatcher.end();

		let embed = new Discord.RichEmbed()
		embed.setDescription(String.fromCharCode(8203))
		embed.setColor('#00ff00')
		//embed.setTimestamp()
		embed.setFooter('Replying to ' + message.author.tag)
		embed.setTitle('<:apple_music:372943300753227786> `Skipped Media`')
		message.channel.send({
			embed
		})


		return true
	}
}

module.exports = skipCommand
