const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (bot, member, oser) => {
 var conf = bot.settings.get(member.guild.id)
  if (conf) {
  
  if (conf.useLogs && conf.useLogs == true) {
  
  var user = member
      var icon = user.user.avatarURL
      var oicon = oser.user.avatarURL
      
      var id = user.user.id

      var name = user.user.username
      var oname = oser.user.username
      
      var nick = user.nickname
      var onick = oser.nickname
      
      var roles = user.roles.map(r => r.name).join('`, `')
   var oroles = oser.roles.map(r => r.name).join('`, `')
      
      
      let embed = new Discord.RichEmbed()
      
      embed.setColor('#00ff00')
      embed.setTimestamp()
      embed.setDescription(String.fromCharCode(8203))
      embed.addField('`ID`', id, false)
   
   if (icon !== oicon) {
    embed.setTitle('<:apple_symbol_info:359559750096257024> `' + name + ' Changed Avatar`')
    embed.setThumbnail(icon)
   } else {
    
   if (name !== oname) {
    embed.setTitle('<:apple_symbol_info:359559750096257024> `' + name + ' Changed Username`')
    embed.addField('`Old Username`', oname, true)
    embed.addField('`New Username`', name, true)
   } else {
    
  if (roles !== oroles) {
    embed.setTitle('<:apple_symbol_info:359559750096257024> `' + name + ' Changed Roles`')
    embed.addField('`Old Roles`', roles, false)
    embed.addField('`New Roles`', roles, false)
   } else {
    
    if (nick !== onick) {
    embed.setTitle('<:apple_symbol_info:359559750096257024> `' + name + ' Changed Nickname`')
    embed.addField('`Old Nickname`', onick, false)
    embed.addField('`New Nickname`', nick, false)
   } else {
    embed.setTitle('<:apple_symbol_info:359559750096257024> `' + name + ' Changed`')
   }
    
   }
    
   }
    
   }
      
      /*embed.addField('`Created`', time, true)
      embed.addField('`Joined`', join, true)*/
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
