const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (bot, omessage, nmessage) => {
if (nmessage.system == true || nmessage.author.bot == true) {
return
}
 var conf = bot.settings.get(nmessage.guild.id)
  if (conf) {
  
  if (conf.useLogs && conf.useLogs == true) {
   var channel
			if (nmessage.guild.channels.find('name', conf.logChannel)) {
				var channel = nmessage.guild.channels.find('name', conf.logChannel)
			} else {
				console.log('Failed to find logChannel for ' + nmessage.guild.name)
				return
			}
  
	  channel.send('<:apple_pencil_paper:359560552701231106> message `' + nmessage.id + '` edited from\n```' + omessage.content + '```\nto\n```' + nmessage.content + '``` by `' + nmessage.author.tag + '`')
      
  } else {
  return
  }
  
  } else {
    bot.settings.set(nmessage.guild.id, bot.defaultSettings);
    return
  }
  
  
  
  }
