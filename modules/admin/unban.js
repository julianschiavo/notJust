const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class unbanCommand extends Command {
	constructor() {
		super({
			name: 'unban',
			help: 'Unban a member',
			lhelp: '{user} [reason]\n{user} is the user to unban (id or mention)\n[reason] is the Audit Log reason for the unban'
		})
	}

	hasPermission(message) {
		//if (message.author.id == require('../../config.json').owner) return true
		if (message.guild && message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return true
		return false
	}

	async run(message, args, api) {
		args.splice(0, 1)
		if (!args[0]) {
			api.error('Please specify which user to unban.')
		}
		var arg = args[0]
		var user = api.getUser(arg, 'member')
		if (user.user.id == message.author.id) {
			api.error('You can\'t unban yourself!')
			return
		}
		args.splice(0, 1)
		var reason
		if (args[0]) {
			reason = args.join(' ');
			message.guild.unban(user, reason)
		} else {
			message.guild.unban(user)
		}
		let embed = new Discord.RichEmbed()
		embed.setTitle('<:apple_hammer:359560554479878144> `Unbanned ' + user.user.username + '`')
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

module.exports = unbanCommand
