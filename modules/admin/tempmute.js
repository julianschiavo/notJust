const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class tmuteCommand extends Command {
  constructor() {
    super({
      name: 'tempmute',
      help: 'Temporarily mute a member',
      lhelp: '{time} {user} [reason]\n{time} is the amount of time to mute the member for (max 1 day)\n{user} is the user to mute (id or mention)\n[reason] is the Audit Log reason for the mute'
    })
  }

  hasPermission(message) {
    //if (message.author.id == require('../../config.json').owner) return true
    if (message.guild && message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return true
    return false
  }

  async run(message, args, api) {
    const thisConf = message.client.settings.get(message.guild.id);
    args.splice(0, 1)
    if (!args[0]) {
      api.error('Please specify the amount of time to mute the user for.')
    }
    var time = args[0]
    var parse = require('parse-duration')
    time = parse(time)
    if (!args[1]) {
      api.error('Please specify which user to mute.')
    }
    var arg = args[1]
    var user = api.getUser(arg, 'member')
    if (user.user.id == message.author.id) {
      api.error('You can\'t mute yourself!')
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
      if (message.guild.member(user.id).hasPermission("KICK_MEMBERS") && message.author.id !== message.guild.ownerID) {
        api.error('You can\'t mute staff members unless you are the server owner.')
        return
      }
      if (user.roles.has(role.id)) {
        api.error('This user is already muted!')
        return
      }
      var reason
      if (args[1]) {
        reason = args.join(' ');
        user.addRole(role, reason)
      } else {
        user.addRole(role)
      }
      if (!thisConf.tempMutes) {
        thisConf.tempMutes = []
        message.client.settings.set(message.guild.id, thisConf);
      }
      thisConf.tempMutes.push(user.user.id)
      message.client.settings.set(message.guild.id, thisConf);

      function unmute() {
        user.removeRole(role, 'Automatic unmute')
      }
      setTimeout(function() {
        unmute()
      }, time)

      let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_muted:372902540393709569> `Temporarily Muted ' + user.user.username + '`')
      embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      embed.addField('`Duration`', time, false)
      if (reason) {
        embed.addField('`Reason`', reason, false)
      }
      //embed.setTimestamp()
      embed.setFooter('Replying to ' + message.author.tag)

      message.channel.send({
        embed
      })
    } else {
      api.error('This server\'s mute role is invalid, non existent, or couldn\'t be found. Please check your preferences.')
    }
    return true
  }
}

module.exports = tmuteCommand