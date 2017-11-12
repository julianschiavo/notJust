console.log('b')
const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (bot, message) => {
if (message.system == true) {
	console.log('a')
return
}
 var conf = bot.settings.get(message.guild.id)
  if (conf) {
  console.log('a')
  if (conf.useLogs && conf.useLogs == true) {
   console.log('a')
	  var channel
			if (message.guild.channels.find('name', conf.logChannel)) {
				var channel = message.guild.channels.find('name', conf.logChannel)
			} else {
				console.log('Failed to find logChannel for ' + message.guild.name)
				return
			}
  console.log('a')
	  channel.send('<:apple_pencil_paper:359560552701231106> message `' + message.id + '`\n```' + message.content + '```\ndeleted by `' + message.author.tag + '`')
     console.log('a')
  } else {
  return
  }
  
  } else {
    bot.settings.set(message.guild.id, bot.defaultSettings);
    return
  }
  
  
  
  }
