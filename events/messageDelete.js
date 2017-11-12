const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (bot, message) => {
if (message.system == true) {
return
}
 var conf = bot.settings.get(message.guild.id)
  if (conf) {
  
  if (conf.useLogs && conf.useLogs == true) {
   var channel
			if (message.guild.channels.find('name', conf.logChannel)) {
				var channel = message.guild.channels.find('name', conf.logChannel)
			} else {
				console.log('Failed to find logChannel for ' + message.guild.name)
				return
			}
  
	  channel.send('<:apple_pencil_paper:359560552701231106> message \n```' + message.content + '```\n(`' + message.id + '`) deleted by `' + message.author.tag + '`')
      
  } else {
  return
  }
  
  } else {
    bot.settings.set(message.guild.id, bot.defaultSettings);
    return
  }
  
  
  
  }
