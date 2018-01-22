const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class pingCommand extends Command {
  constructor() {
    super({
      name: 'ping',
      help: 'Ping',
      lhelp: '|{channel id}|{text}'
    })
  }

  hasPermission(message) {
    if (message.author.id == require('../../config.json').owner) return true
    return false
  }

  async run(message, args, api) {
    var args = message.content.split('|')
    if (!args[1]) {
      api.error('Please specify a channel ID for the ping.')
      return
    }
    if (isNaN(args[1])) {
      api.error('Please specify an all numeric channel ID.')
      return
    }
    var channel
    if (message.guild.channels.get(args[1])) {
    channel = message.guild.channels.get(args[1])
    } else {
    return api.error('Invalid Channel ID.')
    }
    message.guild.roles.get('384675152400482304').setMentionable(true)
    channel.send('<@&384675152400482304>' + args[2])
    message.guild.roles.get('384675152400482304').setMentionable(false)
    return true
  }
}

module.exports = pingCommand
