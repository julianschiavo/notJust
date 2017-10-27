const Discord = require('discord.js')
const Command = require('../../cmdModule/commands').Command

class joinCommand extends Command {
	constructor() {
		super({
			name: 'join',
			help: 'Get an invite to join a server'
		})
	}

	hasPermission(message) {
		if (message.author.id == require('../../config.json').owner) return true
		return false
	}

	async run(message, args, api) {
		function isN(num) {
			return !isNaN(num)
		}
		function countWords(str) {
			return str.split(" ").length;
		}
		if (!isN(args[1])) {
			api.error('Please specify an all numeric guild id.')
		}
		var guild = message.client.guilds.get(args[1])
		var chan = guild.channels.array()[0];
		var gid
		if (guild) {
			gid = guild.id
		} else {
			gid = args[1]
		}
		if (!message.client.settings.get(gid)) {
			message.client.settings.set(gid, message.client.defaultSettings);
		}
		let embed = new Discord.RichEmbed()
		if (guild) {
			embed.setTitle('<:apple_pencil_paper:359560552701231106> `Invite for ' + guild.name + '`')
		} else {
			embed.setTitle('<:apple_pencil_paper:359560552701231106> `Invite for ' + gid + '`')
		}
		embed.setDescription(String.fromCharCode(8203))
		embed.setColor('#00ff00')
    embed.setFooter('Replying to ' + message.author.tag)
		//embed.setTimestamp()
		chan.createInvite().then(invite => {
			embed.addField('`Invite`', invite.toString(), false);
			message.author.send({embed})
		})
		return true
	}
}

module.exports = joinCommand
