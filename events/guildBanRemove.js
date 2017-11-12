const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (bot, guil, user) => {
 var conf = bot.settings.get(guil.id)
  if (conf) {
  
  if (conf.useLogs && conf.useLogs == true) {
   var channel
			if (guil.channels.find('name', conf.logChannel)) {
				var channel = guil.channels.find('name', conf.logChannel)
			} else {
				console.log('Failed to find logChannel for ' + guil.name)
				return
			}
  
	  channel.send('<:apple_hammer:359560554479878144> `' + user.tag + '` (`' + user.id + '`) unbanned')
      
  } else {
  return
  }
  
  } else {
    bot.settings.set(emoji.guild.id, bot.defaultSettings);
    return
  }
  
  
  
  }
