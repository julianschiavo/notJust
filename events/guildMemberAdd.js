const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (bot, member) => {
   var user = member
 var conf = bot.settings.get(member.guild.id)
 
 if (member.guild.id = '268970339948691456') {
	 
 let embed = new Discord.RichEmbed()
    embed.setTitle('<:apple_hand_wave:359559674099400704> `Welcome ' + user.user.tag + '`')
    embed.setDescription(`Please read <#360649401414189089> to see our rules, partners, and more info about Discord Technology!`)
    embed.setColor('#00ff00')
    embed.setFooter('Replying to ' + message.author.tag)
	 member.guild.channels.find('name', 'welcome').send(embed)
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
