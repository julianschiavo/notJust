const Discord = require('discord.js')
const Command = require('../../cmdModule/commands').Command
const ta = require('../../timeago.js')

class infoCommand extends Command {
	constructor() {
		super({
			name: 'info',
			help: 'Get user/server/role/channel info',
			lhelp: '{server/user/role/channel} [channel/user/role name]\n{server/user/role/channel} is what to get info about\n[channel/user/role name] is the name or ID of what you want info about'
		})
	}
	hasPermission(message) {
		if (!message.guild || message.channel.type !== 'text') return false
		return true
	}

	async run(message, args, api) {
		args.splice(0, 1);
		var argg
		if (!args[0]) {
			api.error('Please specify if you want info on the server, a user, or a role.')
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
			var _channel = message.guild.channels.map(r => r.name).join('`, `#')
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
		} else if (argg.indexOf('channel') >= 0) {
			var channel

			function isN(num) {
				return !isNaN(num)
			}
			args.splice(0, 1)
			var argsF = args.join(' ')
			if (argsF) {
				if (!isN(argsF)) {
					channel = message.guild.channels.find("name", argsF)
				} else {
					channel = message.guild.channels.get(argsF)
				}
			} else {
				api.error('Please specify a channel ID or name.')
			}
			var pos = channel.calculatedPosition
			var icon = message.guild.iconURL
			var time = ta.ago(channel.createdTimestamp);
			var id = channel.id
			var type = channel.type
			var members
			var limit
			if (type == 'text') {
				type = 'Text Channel'
			} else if (type == 'voice') {
				type = 'Voice Channel'
				members = '`' + channel.members.map(r => r.name).join('`, `') + '`'
				limit = channel.userLimit
			}
			var name = channel.name
			let embed = new Discord.RichEmbed()
			embed.setTitle('<:apple_symbol_info:359559750096257024> `About ' + name + '`')
			embed.setColor('#00ff00')
			embed.setFooter('Replying to ' + message.author.tag)
			embed.setDescription(String.fromCharCode(8203))
			embed.setThumbnail(icon)
			if (members) {
			embed.addField('`Members`', members, false)
			}
			embed.addField('`Position`', pos, true)
			if (limit) {
				embed.addField('`User Limit`', limit , true)
			}
			embed.addField('`Created`', time, true)
			embed.addField('`Type`', type, true)
			embed.addField('`ID`', id, true)
			message.channel.send({
				embed
			})
		} else if (argg.indexOf('role') >= 0) {
			var role
			args.splice(0, 1)
			var argsF = args.join(' ')

			if (argsF) {
				role = message.guild.roles.find("name", argsF);
			} else {
				api.error('Please specify a role name to get info for.')
			}
			var pos = role.calculatedPosition
			var color = role.hexColor
			var time = ta.ago(role.createdTimestamp)
			var hoist
			if (role.hoist == true) {
				hoist = "True"
			} else {
				hoist = "False"
			}
			var id = role.id
			var name = role.name
			var users = '`' + role.members.map(r => r.user.username).join('`, `') + '`'
			var icon = message.guild.iconURL
			let embed = new Discord.RichEmbed()
			embed.setTitle('<:apple_symbol_info:359559750096257024> `About ' + name + '`')
			embed.setColor('#00ff00')
			embed.setFooter('Replying to ' + message.author.tag)
			embed.setDescription(String.fromCharCode(8203))
			embed.setThumbnail(icon)
			//embed.addField('`Numbers`', users + ' members, ' + emojis + ' emoji, ' + channels + ' channels and ' + roles + ' roles.', false)
			embed.addField('`ID`', id, false)
			embed.addField('`Position`', pos, true)
			embed.addField('`Hoisted`', hoist, true)
			embed.addField('`Color`', color, true)
			embed.addField('`Created`', time, true)
			message.channel.send({
				embed
			})
		}
		return true
	}
}

module.exports = infoCommand
