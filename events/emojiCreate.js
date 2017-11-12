const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (bot, emoji) => {
 var conf = bot.settings.get(emoji.guild.id)
  if (conf) {
  
  if (conf.useLogs && conf.useLogs == true) {
   var channel
			if (emoji.guild.channels.find('name', conf.logChannel)) {
				var channel = emoji.guild.channels.find('name', conf.logChannel)
			} else {
				console.log('Failed to find logChannel for ' + emoji.guild.name)
				return
			}
   
  channel.send('<:apple_face_smile:359559572634992672> <:' + emoji.name + ':' + emoji.id + '> (`' + emoji.id + '`) created by `' + emoji.client.user.tag + '`')
      
  } else {
  return
  }
  
  } else {
    bot.settings.set(emoji.guild.id, bot.defaultSettings);
    return
  }
  
  
  
  }
