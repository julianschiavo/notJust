const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')
exports.run = (bot, member, user) => {
	var conf = bot.settings.get(user.guild.id)
	if (conf) {
		if (conf.useLogs && conf.useLogs == true) {
			var channel
			if (user.guild.channels.find('name', conf.logChannel)) {
				var channel = user.guild.channels.find('name', conf.logChannel)
			} else {
				console.log('Failed to find logChannel for ' + member.guild.name)
				return
			}






			//start
			if (user.user.avatarURL !== member.user.avatarURL) {
				channel.send('<:apple_pencil:359560553032581130> `' + user.user.tag + '` (`' + user.id + '`) changed avatar to:' + user.user.avatarURL)
			}
			if (user.user.username !== member.user.username) {
				channel.send('<:apple_pencil:359560553032581130> `' + user.user.tag + '` (`' + user.id + '`) changed username from `' + member.user.username + '` to `' + user.user.username + '`')
			}
			
			if ((user.nickname !== member.nickname) && member.nickname == null) {
				channel.send('<:apple_pencil:359560553032581130> `' + user.user.tag + '` (`' + user.id + '`) added nickname `' + user.nickname + '`')
			}
			if ((user.nickname !== member.nickname) && user.nickname == null) {
				channel.send('<:apple_pencil:359560553032581130> `' + user.user.tag + '` (`' + user.id + '`) removed nickname `' + member.nickname + '`')
			}
			if ((user.nickname !== member.nickname) && (member.nickname !== null && user.nickname !== null)) {
				channel.send('<:apple_pencil:359560553032581130> `' + user.user.tag + '` (`' + user.id + '`) changed nickname from `' + member.nickname + '` to `' + user.nickname + '`')
			}
			
			var nr = member.roles.map(r => r.name).join(', ')
			var newroles = user.roles.filter(r => nr.indexOf(r.name) > -1).map(r => r.name)
			var or = user.roles.map(r => r.name).join(', ')
			var oldroles = member.roles.filter(r => or.indexOf(r.name) > -1).map(r => r.name)
			if (newroles) {
				channel.send('<:apple_pencil:359560553032581130> `' + user.user.tag + '` (`' + user.id + '`) added role `' + newroles + '`')
			}
			if (oldroles) {
				channel.send('<:apple_pencil:359560553032581130> `' + user.user.tag + '` (`' + user.id + '`) removed role `' + oldroles + '`')
			}
			//var roles = user.roles.map(r => r.name).join('`, `')
			//var oroles = oser.roles.map(r => r.name).join('`, `')






		} else {
			return
		}
	} else {
		bot.settings.set(user.guild.id, bot.defaultSettings);
		return
	}
}
