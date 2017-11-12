const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (bot, member) => {
 var conf = bot.settings.get(member.guild.id)
  if (conf) {
  
  if (conf.useLogs && conf.useLogs == true) {
  
  var user = member
      var icon = user.user.avatarURL
      var time = ta.ago(user.user.createdTimestamp);
      var id = user.user.id
      var join = ta.ago(user.joinedTimestamp);

      var name = user.user.username
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_symbol_info:359559750096257024> `' + name + ' Joined`')
      embed.setColor('#00ff00')
      embed.setTimestamp()
      embed.setDescription(String.fromCharCode(8203))
      embed.setThumbnail(icon)
      embed.addField('`ID`', id, false)
      embed.addField('`Created`', time, true)
      embed.addField('`Joined`', join, true)
      if (member.guild.channels.find('name', conf.logChannel)) {
       member.guild.channels.find('name', conf.logChannel).send({
        embed
      })
      } else {
       console.log('Failed to find logChannel for ' + member.guild.name)
      }
      
  } else {
  return
  }
  
  } else {
    bot.settings.set(member.guild.id, bot.defaultSettings);
    return
  }
  
  
  
  }
