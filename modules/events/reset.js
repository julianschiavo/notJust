const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class resetCommand extends Command {
  constructor() {
    super({
      name: 'reset',
      help: 'Delete all messages in a channel to clear event channel',
      lhelp: '{id}\n{id} should be ID of the message channel to ensure deletion is not an accident'
    })
  }

  hasPermission(message) {
    if (message.author.id == require('../../config.json').owner && message.guild && message.guild.member('329772339967426560').hasPermission("MANAGE_MESSAGES")) return true
    return false
  }

  async run(message, args, api) {
    args.splice(0, 1)
    if (!args[0] || args[0] !== message.channel.id) {
      return api.error('Please specify the channel id of the current channel.')
    }
      message.channel.bulkDelete(100).catch(err => {
        api.error(err)
      })
      message.channel.bulkDelete(100).catch(err => {
        api.error(err)
      })
      message.channel.bulkDelete(100).catch(err => {
        api.error(err)
      })
    return true
  }
}

module.exports = resetCommand
