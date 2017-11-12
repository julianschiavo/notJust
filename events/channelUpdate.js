const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (bot, old, new) => {
	var conf = bot.settings.get(new.guild.id)
	if (conf) {
		if (conf.useLogs && conf.useLogs == true) {
			var channel
			if (new.guild.channels.find('name', conf.logChannel)) {
				var channel = new.guild.channels.find('name', conf.logChannel)
			} else {
				console.log('Failed to find logChannel for ' + new.guild.name)
				return
			}

      if (new.type == 'text') {
      if (new.name !== old.name) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel `' + new.id + '` name changed from `#' + old.name + '` to `#' + new.name + '`')
      }
      
      if ((new.topic !== old.topic) && old.topic == null) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel <#' + new.name + '> topic added\n```md' + new.topic + '```')
      }
      if ((new.topic !== old.topic) && new.topic == null) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel <#' + new.name + '> topic removed\n```md' + old.topic + '```')
      }
      if ((new.topic !== old.topic) && (new.topic !== null && old.topic !== null)) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel <#' + new.name + '> topic changed from `' + old.topic + '` to `' + new.topic + '`')
      }
      
      if (old.nsfw == true && new.nsfw == false) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel <#' + new.name + '> removed NSFW')
      }
      if (old.nsfw == false && new.nsfw == true) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel <#' + new.name + '> made NSFW')
      }
      } else if (chn.type == 'voice') {

      if (new.name !== old.name) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel `' + new.id + '` name changed from `' + old.name + '` to `' + new.name + '`')
      }
      
      if ((new.userlimit !== old.userlimit) && old.userlimit == 0) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel `' + new.name + '` added userlimit `' + new.userlimit + '`')
      }
      if ((new.userlimit !== old.userlimit) && new.userlimit == 0) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel `' + new.name + '` removed userlimit')
      }
      if ((new.userlimit !== old.userlimit) && (new.userlimit !== 0 && old.userlimit !== 0)) {
      channel.send('<:apple_symbol_hash:359559749785616387> channel `' + new.name + '` changed userlimit from `' + old.userlimit + '` to `' + new.userlimit + '`')
      }
      
      }
			

		} else {
			return
		}

	} else {
		bot.settings.set(new.guild.id, bot.defaultSettings);
		return
	}

}
