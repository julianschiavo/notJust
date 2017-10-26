const Discord = require('discord.js');

const Command = require('../../cmdModule/commands').Command

class joinCommand extends Command {
	constructor() {
		super({
			name: 'join',
			help: 'Join a voice channel'
		})
	}

	hasPermission(message) {
		if (message.guild && (message.client.settings.get(message.guild.id).isDonator == true || message.author.id == require('../../config.json').owner)) {
			return true
		} else {
			let embed = new Discord.RichEmbed()

		embed.setTitle('<:red_tick:330712188681453590> `Premium Command`')
		embed.setColor('#00ff00')

		embed.setFooter('Replying to ' + message.author.tag)
		embed.setDescription('**I, the founder of notJust, am just 13 and have to run my servers and sites off donations.**\n\nBecause of this, I have created **notJust Premium**: a premium, paid, server-based upgrade to notJust which gives access to many donator only commands and modules. \nThese include the AI command (chat with an artificial assistant) and Media Module (play music/videos from YouTube in voice channels).\n\n**Get notJust Premium - and support me - by [donating](https://patreon.com/justdotJS)**.')
		//embed.addField('`Premium`', '', false)
				message.channel.send({
			embed
		})
		}//if (message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return true
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

		new Promise((resolve, reject) => {
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return api.error('I wasn\'t able to connect to your voice channel.');
			voiceChannel.join().then(connection => {
				resolve(connection)
				embed.setTitle('<:apple_symbol_hash:359559749785616387> `Joined ' + voiceChannel.name + '`')
				message.channel.send({
					embed
				})
			}).catch(err => reject(err));
		});

		return true
	}
}

module.exports = joinCommand
