const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class muteCommand extends Command {
  constructor() {
    super({
      name: 'mute',
      help: 'Mute a member',
      lhelp: '{user} [reason]\n{user} is the user to mute\n[reason] is the Audit Log reason for the mute'
    })
  }

  hasPermission(message) {
    //if (message.author.id == require('../../config.json').owner) return true
    if (message.guild && message.guild.member(message.author).hasPermission("MANAGE_MESSAGES") && message.guild.member('329772339967426560').hasPermission("MANAGE_ROLES")) return true
    return false
  }

  async run(message, args, api) {
    const thisConf = message.client.settings.get(message.guild.id);
    args.splice(0, 1)
    if (!args[0]) {
      api.error('Please specify which user to mute.')
      return
    }
    var arg = args[0]
    var user = api.getUser(arg, 'member')
    if (user.user.id == message.author.id) {
      api.error('You can\'t mute yourself.')
      return
    }
    args.splice(0, 1)
    var role
    if (thisConf) {
      if (thisConf.muteRole) {
        role = message.guild.roles.find("name", thisConf.muteRole);
      }
    }
    if (role) {
      if (message.guild.member(user.id).hasPermission("MANAGE_MESSAGES") && message.author.id !== message.guild.ownerID) {
        api.error('You can\'t mute staff members unless you are the server owner.')
        return
      }
      if (user.roles.has(role.id)) {
        api.error('This user is already muted!')
        return
      }
      var reason
      if (args[0]) {
        reason = args.join(' ');
        user.addRole(role, reason).then(promise => success()).catch(err => {
          api.error(err)
        })
      } else {
        user.addRole(role).then(promise => success()).catch(err => {
          api.error(err)
        })
      }

      function success() {
        let embed = new Discord.RichEmbed()
        embed.setTitle('<:apple_muted:372902540393709569> `User Muted`')
        embed.addField('User','`'+user.user.tag+'`',false)
        embed.setDescription(String.fromCharCode(8203))
        embed.setColor('#00ff00')
        if (reason) {
          embed.addField('`Reason`', reason, false)
        }
        embed.setFooter('Replying to ' + message.author.tag)
        message.channel.send({
          embed
        })
      }
    } else {
      api.error('This server\'s mute role is invalid, non existent, or couldn\'t be found. Please check your preferences.')
    }
    return true
  }
}

module.exports = muteCommand
