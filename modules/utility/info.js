const Discord = require('discord.js')
const Command = require('../../cmdModule/commands').Command
const ta = require('../../timeago.js')

class infoCommand extends Command {
	constructor() {
		super({
			name: 'info',
			help: 'Get info about a user or server',
			lhelp: '{server/user} [user]\n{server/user} is whether to get info about the server or a user\n[user] is the user to get info on (defaults to message author)'
		})
	}
	hasPermission(message) {
		if (message.channel.type !== 'text') return false
		return true
	}

	async run(message, args, api) {
		args.splice(0, 1);
		var argg
		if (!args[0]) {
			api.error('Please specify if you want info on the server or a user!')
		} else {
			argg = args[0].toLowerCase()
		}
		if (argg.indexOf('server') >= 0) {
			var channels = message.guild.channels.size
			var users = message.guild.memberCount
			var roles = message.guild.roles.size
			var emojis = message.guild.emojis.size
			var name = message.guild.name
			var owner = message.guild.owner.user.tag
			var gid = message.guild.id
			var time = ta.ago(message.guild.createdTimestamp);
			var icon = message.guild.iconURL
			var _role = message.guild.roles.map(r => r.name).join('`, `')
			var _channel = message.guild.channels.map(r => r.name).join('`, #`')
			//let online   = this.client.users.filter(u => u.status != "offline").length;
			let embed = new Discord.RichEmbed()
			embed.setTitle('<:apple_symbol_info:359559750096257024> `About ' + name + '`')
			embed.setColor('#00ff00')
			embed.setFooter('Replying to ' + message.author.tag)
			embed.setDescription(String.fromCharCode(8203))
			embed.setThumbnail(icon)
			embed.addField('`Channels`', '`' + _channel + '`', false)
			embed.addField('`Roles`', '`' + _role + '`', false)
			embed.addField('`Numbers`', users + ' members, ' + emojis + ' emoji, ' + channels + ' channels and ' + roles + ' roles.', false)
			embed.addField('`Created`', time, true)
			embed.addField('`Owner`', owner, true)
			message.channel.send({
				embed
			})
		} else if (argg.indexOf('user') >= 0) {
			var user
			if (args[1]) {
				user = message.guild.member(message.mentions.users.first());
			} else {
				user = message.guild.member(message.author);
			}
			var icon = user.user.avatarURL
			var time = ta.ago(user.user.createdTimestamp);
			var id = user.user.id
			var join = ta.ago(user.joinedTimestamp);
			var roles = user.roles.map(r => r.name).join('`, `')
		            //roles = '.' + roles + '.'
			var name = user.user.username
			let embed = new Discord.RichEmbed()
			embed.setTitle('<:apple_symbol_info:359559750096257024> `About ' + name + '`')
			embed.setColor('#00ff00')
			embed.setFooter('Replying to ' + message.author.tag)
			embed.setDescription(String.fromCharCode(8203))
			embed.setThumbnail(icon)
			//embed.addField('`Numbers`', users + ' members, ' + emojis + ' emoji, ' + channels + ' channels and ' + roles + ' roles.', false)
			embed.addField('`ID`', id, true)
			embed.addField('`Roles`', '`' + roles + '`', false)
			embed.addField('`Created`', time, true)
			embed.addField('`Joined`', join, true)
			message.channel.send({
				embed
			})
		}
		return true
	}
}

module.exports = infoCommand
