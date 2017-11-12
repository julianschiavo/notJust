const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (bot, chn) => {
	var conf = bot.settings.get(chn.guild.id)
	if (conf) {
		if (conf.useLogs && conf.useLogs == true) {
			var channel
			if (chn.guild.channels.find('name', conf.logChannel)) {
				var channel = chn.guild.channels.find('name', conf.logChannel)
			} else {
				console.log('Failed to find logChannel for ' + chn.guild.name)
				return
			}
      
      channel.send('<:apple_symbol_hash:359559749785616387> channel `' + channel.name + '` (`' + channel.id + '`) created')

		} else {
			return
		}

	} else {
		bot.settings.set(chn.guild.id, bot.defaultSettings);
		return
	}

}
