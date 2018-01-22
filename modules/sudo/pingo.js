const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class pingoCommand extends Command {
  constructor() {
    super({
      name: 'pingo',
      help: 'Pingo',
      lhelp: '|{channel id}|{text}'
    })
  }

  hasPermission(message) {
    if (message.author.id == require('../../config.json').owner) return true
    return false
  }

  async run(message, args, api) {
    var args = message.content.split('|')
    args.splice(0,1)
    if (!args[1]) {
      api.error('Please specify a channel ID for the pingo.')
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
    message.guild.roles.get('404981161241214977').setMentionable(true)
    channel.send('<@&404981161241214977>' + args[2])
    message.guild.roles.get('404981161241214977').setMentionable(false)
    return true
  }
}

module.exports = pingoCommand
