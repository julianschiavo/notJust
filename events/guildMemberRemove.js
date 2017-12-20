const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (bot, member) => {
   var user = member
 var conf = bot.settings.get(member.guild.id)
  if (member.guild.id == '268970339948691456') {
	let embed = new Discord.RichEmbed();
    embed.setTitle('🔢 `Member Count`');
embed.setDescription(member.guild.memberCount);
    embed.setColor('#ffff00');
	 member.guild.channels.find('name','count').fetchMessage('392113272666718218')
  .then(co => co.edit({embed}))
  .catch(console.log);
   
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
   
  channel.send('<:apple_hand_wave:359559674099400704> `' + user.user.tag + '` (`' + user.id + '`) left (joined ' + ta.ago(user.joinedTimestamp) + ')')
      
  } else {
  return
  }
  
  } else {
    bot.settings.set(member.guild.id, bot.defaultSettings);
    return
  }
  
  
  
  }
