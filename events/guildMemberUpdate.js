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
				channel.send('<:apple_picture:372639115323244544> `' + user.user.tag + '` (`' + user.id + '`) changed avatar to:' + user.user.avatarURL)
			}
			if (user.user.username !== member.user.username) {
				channel.send('<:apple_symbol_name_badge:359559749760581633> `' + user.user.tag + '` (`' + user.id + '`) changed username from `' + member.user.username + '` to `' + user.user.username + '`')
			}
			
			if ((user.nickname !== member.nickname) && member.nickname == null) {
				channel.send('<:apple_symbol_name_badge:359559749760581633> `' + user.user.tag + '` (`' + user.id + '`) added nickname `' + user.nickname + '`')
			}
			if ((user.nickname !== member.nickname) && user.nickname == null) {
				channel.send('<:apple_symbol_name_badge:359559749760581633> `' + user.user.tag + '` (`' + user.id + '`) removed nickname `' + member.nickname + '`')
			}
			if ((user.nickname !== member.nickname) && (member.nickname !== null && user.nickname !== null)) {
				channel.send('<:apple_symbol_name_badge:359559749760581633> `' + user.user.tag + '` (`' + user.id + '`) changed nickname from `' + member.nickname + '` to `' + user.nickname + '`')
			}
			var newrole = '`' + user.roles.filter(r => member.roles.map(r => r.id).join(', ').indexOf(r.id) == -1).map(r => r.name) + '`'
			var oldrole = '`' + member.roles.filter(r => user.roles.map(r => r.id).indexOf(r.id) == -1).map(r => r.name) + '`'
			if (newrole !== '``') {
				channel.send('<:apple_scroll:359560551904444435> `' + user.user.tag + '` (`' + user.id + '`) got role ' + newrole)
			}
			if (oldrole !== '``') {
				channel.send('<:apple_scroll:359560551904444435> `' + user.user.tag + '` (`' + user.id + '`) lost role ' + oldrole)
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
