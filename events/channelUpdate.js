const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (bot, old, nuu) => {
	var conf = bot.settings.get(nuu.guild.id)
	if (conf) {
		if (conf.useLogs && conf.useLogs == true) {
			var channel
			if (nuu.guild.channels.find('name', conf.logChannel)) {
				var channel = nuu.guild.channels.find('name', conf.logChannel)
			} else {
				console.log('Failed to find logChannel for ' + nuu.guild.name)
				return
			}

      if (nuu.type == 'text') {
      if (nuu.name !== old.name) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel `' + nuu.id + '` name changed from `#' + old.name + '` to `#' + nuu.name + '`')
      }
      
      if ((nuu.topic !== old.topic) && old.topic == null) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel <#' + nuu.name + '> topic added\n```md' + nuu.topic + '```')
      }
      if ((nuu.topic !== old.topic) && nuu.topic == null) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel <#' + nuu.name + '> topic removed\n```md' + old.topic + '```')
      }
      if ((nuu.topic !== old.topic) && (nuu.topic !== null && old.topic !== null)) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel <#' + nuu.name + '> topic changed from `' + nuu.topic + '` to `' + nuu.topic + '`')
      }
      
      if (old.nsfw == true && nuu.nsfw == false) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel <#' + nuu.name + '> removed NSFW')
      }
      if (old.nsfw == false && nuu.nsfw == true) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel <#' + nuu.name + '> made NSFW')
      }
      } else if (nuu.type == 'voice') {

      if (nuu.name !== old.name) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel `' + nuu.id + '` name changed from `' + old.name + '` to `' + nuu.name + '`')
      }
      
      if ((nuu.userlimit !== old.userlimit) && old.userlimit == 0) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel `' + nuu.name + '` added userlimit `' + nuu.userlimit + '`')
      }
      if ((nuu.userlimit !== old.userlimit) && nuu.userlimit == 0) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel `' + nuu.name + '` removed userlimit')
      }
      if ((nuu.userlimit !== old.userlimit) && (nuu.userlimit !== 0 && old.userlimit !== 0)) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel `' + nuu.name + '` changed userlimit from `' + old.userlimit + '` to `' + nuu.userlimit + '`')
      }
      
      }
			

		} else {
			return
		}

	} else {
		bot.settings.set(nuu.guild.id, bot.defaultSettings);
		return
	}

}
