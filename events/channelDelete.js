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
			var nam
      if (chn.type == 'text') {
	      nam = '`#' + chn.id + '`'
      } else {
	      nam = '`' + chn.name + '`'
      }
      channel.send('<:apple_symbol_hash:359559749785616387> channel ' + nam + ' (`' + chn.id + '`) deleted')

		} else {
			return
		}

	} else {
		bot.settings.set(chn.guild.id, bot.defaultSettings);
		return
	}

}
