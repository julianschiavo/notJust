const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (bot, oemoji, nemoji) => {
 var conf = bot.settings.get(nemoji.guild.id)
  if (conf) {
  
  if (conf.useLogs && conf.useLogs == true) {
   var channel
			if (nemoji.guild.channels.find('name', conf.logChannel)) {
				var channel = nemoji.guild.channels.find('name', conf.logChannel)
			} else {
				console.log('Failed to find logChannel for ' + nemoji.guild.name)
				return
			}
   
   if (nemoji.name !== oemoji.name) {
  channel.send('<:apple_symbol_name_badge:359559749760581633> emoji `' + nemoji.id + '` changed name from `' + oemoji.name + '` to `' + nemoji.name + '`')
  }
      
  } else {
  return
  }
  
  } else {
    bot.settings.set(emoji.guild.id, bot.defaultSettings);
    return
  }
  
  
  
  }
