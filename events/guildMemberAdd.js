const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (bot, member) => {
  var user = member
  var conf = bot.settings.get(member.guild.id)

  if (member.guild.id == '268970339948691456') {

    var embed = new Discord.RichEmbed()
    embed.setTitle('<a:animoji_wave:404992889794592778> `Hey, ' + user.user.username + '!`')
    embed.setDescription(`Check out <#360649401414189089> to see some short rules and info about Discord Technology.\nThen, go introduce yourself and say hi in <#268979366896205847>!`)
    embed.setColor('#00ff00')
    member.guild.channels.find('name', 'welcome').send(embed)
    member.addRole(member.guild.roles.get('268973728044417024'))
    member.addRole(member.guild.roles.find('name', 'ping'))
    member.addRole(member.guild.roles.find('name', 'pingo'))
    var a = '🔢 Member Count: ' + member.guild.memberCount
    member.guild.channels.find('name', 'chat').fetchMessage('404994255019311114').then(co => co.edit(a)).catch(console.error);
  }

  if (conf) {

    if (conf.useLogs && conf.useLogs == true) {
      //<:apple_person_raising_hand:359559750712557568>
      var channel
      if (member.guild.channels.find('name', conf.logChannel)) {
        var channel = member.guild.channels.find('name', conf.logChannel)
      } else {
        console.log('Failed to find logChannel for ' + member.guild.name)
        return
      }

      channel.send('<:apple_person_raising_hand:359559750712557568> `' + user.user.tag + '` (`' + user.id + '`) joined (created ' + ta.ago(user.user.createdTimestamp) + ')')

    } else {
      return
    }

  } else {
    bot.settings.set(member.guild.id, bot.defaultSettings);
    return
  }



}
