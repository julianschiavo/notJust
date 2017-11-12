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
      channel.send('<:apple_symbol_name_badge:359559749760581633> channel `' + nuu.id + '` changed name from `#' + old.name + '` to `#' + nuu.name + '`')
      }
      
      if ((nuu.topic !== old.topic) && (old.topic == '' || old.topic == null)) {
      channel.send('<:apple_scroll:359560551904444435> channel <#' + nuu.id + '> added topic\n```' + nuu.topic + '```')
      }
      if ((nuu.topic !== old.topic) && (nuu.topic == '' || nuu.topic == null)) {
      channel.send('<:apple_scroll:359560551904444435> channel <#' + nuu.id + '> removed topic\n```' + old.topic + '```')
      }
      if (nuu.topic !== old.topic && (old.topic == '' || old.topic == null) && (nuu.topic == '' || nuu.topic == null)) {
      channel.send('<:apple_scroll:359560551904444435> channel <#' + nuu.id + '> changed topic from\n```' + old.topic + '``` \nto\n ```' + nuu.topic + '```')
      }
      
      if (old.nsfw == true && nuu.nsfw == false) {
      channel.send('<:apple_symbol_underage:359559749760450561> channel <#' + nuu.id + '> removed NSFW')
      }
      if (old.nsfw == false && nuu.nsfw == true) {
      channel.send('<:apple_symbol_underage:359559749760450561> channel <#' + nuu.id + '> made NSFW')
      }
      } else if (nuu.type == 'voice') {

      if (nuu.name !== old.name) {
      channel.send('<:apple_symbol_name_badge:359559749760581633> channel `' + nuu.id + '` name changed from `' + old.name + '` to `' + nuu.name + '`')
      }
      
      if ((nuu.userLimit !== old.userLimit) && old.userLimit == 0) {
      channel.send('<:apple_lock:359560553401942017> channel `' + nuu.name + '` added userlimit `' + nuu.userLimit + '`')
      }
      if ((nuu.userLimit !== old.userLimit) && nuu.userLimit == 0) {
      channel.send('<:apple_lock:359560553401942017> channel `' + nuu.name + '` removed userlimit')
      }
      if ((nuu.userLimit !== old.userLimit) && (nuu.userLimit !== 0 && old.userLimit !== 0)) {
      channel.send('<:apple_lock:359560553401942017> channel `' + nuu.name + '` changed userlimit from `' + old.userLimit + '` to `' + nuu.userLimit + '`')
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
