const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class unbanCommand extends Command {
  constructor() {
    super({
      name: 'unban',
      help: 'Unban a member',
      lhelp: '{user} [reason]\n{user} is the user to unban\'s ID\n[reason] is the Audit Log reason for the unban'
    })
  }

  hasPermission(message) {
    //if (message.author.id == require('../../config.json').owner) return true
    if (message.guild && message.guild.member(message.author).hasPermission("BAN_MEMBERS") && message.guild.member('329772339967426560').hasPermission("BAN_MEMBERS")) return true
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
      message.guild.unban(user, reason).then(promise => success()).catch(err => {
        api.error(err)
      })
    } else {
      message.guild.unban(user).then(promise => success()).catch(err => {
        api.error(err)
      })
    }

    function success() {
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_hammer:359560554479878144> `User Unbanned`')
      embed.addField('`User`','`'+user+'`',true)
      embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      if (reason) {
        embed.addField('`Reason`', reason, true)
      }
      embed.setFooter('Replying to ' + message.author.tag)
      message.channel.send({
        embed
      })
    }
    return true
  }
}

module.exports = unbanCommand
