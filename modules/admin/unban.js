const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class unbanCommand extends Command {
  constructor() {
    super({
      name: 'unban',
      help: 'Unban a member',
      lhelp: '{user_id} [reason]\n{user_id} is the user to unban\'s ID\n[reason] is the Audit Log reason for the unban'
    })
  }

  hasPermission(message) {
    //if (message.author.id == require('../../config.json').owner) return true
    if (message.guild && message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return true
    return false
  }

  async run(message, args, api) {
    args.splice(0, 1)
    if (!args[0]) {
      api.error('Please specify which user to unban.')
      return
    }
    var arg = args[0]

    function isN(num) {
      return !isNaN(num)
    }
    //var user = api.getUser(arg, 'member')
    if (isN(arg) == false) {
      api.error('Please specify the numeric ID of the user you want to unban.')
      return
    }
    var user = arg
    args.splice(0, 1)
    var reason
    if (args[0]) {
      reason = args.join(' ');
      message.guild.unban(user, reason)
    } else {
      message.guild.unban(user)
    }
    let embed = new Discord.RichEmbed()
    embed.setTitle('<:apple_hammer:359560554479878144> `Unbanned ' + user + '`')
    embed.setDescription(String.fromCharCode(8203))
    embed.setColor('#00ff00')
    if (reason) {
      embed.addField('`Reason`', reason, false)
    }
    //embed.setTimestamp()
    embed.setFooter('Replying to ' + message.author.tag)

    message.channel.send({
      embed
    })
    return true
  }
}

module.exports = unbanCommand
