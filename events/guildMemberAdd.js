const config = require('../config.json')
const ta = require('../../timeago.js')

exports.run = (bot, member) => {
 var conf = bot.settings.get(message.guild.id)
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
      embed.addField('`ID`', id, true)
      embed.addField('`Created`', time, true)
      embed.addField('`Joined`', join, true)
      message.channel.send({
        embed
      })
      
  } else {
  return
  }
  
  } else {
    bot.settings.set(message.guild.id, bot.defaultSettings);
    return
  }
  
  
  
  }
