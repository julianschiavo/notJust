const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class kickCommand extends Command {
	constructor() {
		super({
			name: 'kick',
			help: 'Kick a member',
			lhelp: '{user} [reason]\n{user} is the user to kick (id or mention)\n[reason] is the Audit Log reason for the kick'
		})
	}

	hasPermission(message) {
		//if (message.author.id == require('../../config.json').owner) return true
		if (message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return true
		return false
	}

	async run(message, args, api) {
		args.splice(0, 1)
		if (!args[0]) {
			api.error('Please specify which user to kick.')
		}
		var arg = args[0]
		var user = api.getUser(arg, 'member')
		if (user.user.id == message.author.id) {
			api.error('You can\'t kick yourself!')
			return
		}
		if (message.guild.member(user.id).hasPermission("KICK_MEMBERS") && message.author.id !== message.guild.ownerID) {
			api.error('You can\'t kick staff members unless you are the server owner.')
			return
		}
		args.splice(0, 1)
		var reason
		if (args[0]) {
			reason = args.join(' ');
			user.kick(reason)
		} else {
			user.kick()
		}
		let embed = new Discord.RichEmbed()
		embed.setTitle('<:apple_boot:372659817287909376> `Kicked ' + user.user.username + '`')
		embed.setDescription(String.fromCharCode(8203))
		embed.setColor('#00ff00')
		if (reason) {
			embed.addField('`Reason`', reason, false)
		}
		//embed.setTimestamp()
		embed.setFooter('Replying to ' + message.author.tag)

		message.channel.send({
			embed
		})
		return true
	}
}

module.exports = kickCommand
