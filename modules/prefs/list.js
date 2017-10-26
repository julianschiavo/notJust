const Discord = require('discord.js');

const Command = require('../../cmdModule/commands').Command

class listCommand extends Command {
	constructor() {
		super({
			name: 'list',
			help: 'List current server preferences'
		})
	}

	hasPermission(message) {
		if (message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return true
    //if (message.author.id == message.guild.ownerID) return true
		return false
	}

	async run(message, args, api) {

		const defaultSettings = {
			logChannel: "logs",
			muteRole: "Muted"
		}

		if (!message.client.settings.get(message.guild.id)) {
			// Adding a new row to the collection uses `set(key, value)`
			message.client.settings.set(message.guild.id, defaultSettings);
		}

		const thisConf = message.client.settings.get(message.guild.id);
    var muteRole = thisConf.muteRole
    muteRole = message.guild.roles.find("name", muteRole)
    var rmuteRole = muteRole
    
    var logChannel = thisConf.logChannel
    logChannel = message.guild.channels.find("name", logChannel)
    var rlogChannel = logChannel
					let embed = new Discord.RichEmbed()
					embed.setTitle('<:apple_pencil_paper:359560552701231106> `Current Preferences`')
					embed.addField('`Mute Role` (muteRole)', rmuteRole, false)
          embed.addField('`Log Channel` (logChannel)', rlogChannel, false)
		
					embed.setDescription(String.fromCharCode(8203))
					embed.setColor('#00ff00')
					//embed.setTimestamp()
					embed.setFooter('Replying to ' + message.author.tag)

					message.channel.send({
						embed
					})






		return true
	}
}

module.exports = listCommand
