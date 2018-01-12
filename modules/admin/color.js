const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class colorCommand extends Command {
  constructor() {
    super({
      name: 'colour',
      help: 'Select a color',
      lhelp: '{role}\n{role} is the role name or ID.'
    })
  }

  hasPermission(message) {
    //if (message.author.id == require('../../config.json').owner) return true
    if (message.guild && message.guild.member('329772339967426560').hasPermission("MANAGE_ROLES")) return true
    return false
  }

  async run(message, args, api) {
    var conf
    if (message.client.settings.get(message.guild.id).colors) {
      conf = message.client.settings.get(message.guild.id).colors
    } else {
      api.error('This server does not have any colors configured.')
      return;
    }
    if (conf.length > 0) {} else {
      api.error('This server does not have any colors configured.')
      return;
    }
    args.splice(0, 1)
    if (!args[0]) {
      api.error('Please specify which role to join.')
      return;
    }
    var arg = args.join(' ')
    var user = message.guild.member(message.author.id)

    var role

    function isN(num) {
      return !isNaN(num)
    }

    if (!isN(args[0])) {
      role = message.guild.roles.find("name", arg)
    } else {
      role = message.guild.roles.get(arg)
    }
    if (!role) {
      api.error('The specified role doesn\'t exist or couldn\'t be found. Try again, and remember to specify the role ID if it\'s name contains more than one word.')
      return;
    }
    var check = conf.includes(role.id)
    if (check == false) {
      api.error('The specified role is not configured as a color.')
      return;
    }
    let therole = message.guild.roles.find("name", 'color')
    if (user.roles.has(therole.id)) {
      return api.error('You are not at Level 15 yet! Please use `.rank` to check your rank.')
    }
    args.splice(0, 1)
var added
    if (user.roles.has(role.id)) {
      added = false
      user.removeRole(role).then(promise => success()).catch(err => {
        api.error(err)
      })
    } else {
      added = true
      user.addRole(role).then(promise => success()).catch(err => {
        api.error(err)
      })
    }

    function success() {
      let embed = new Discord.RichEmbed()
      if (added == true) {
        embed.addField('`Type`','Added',true)
      } else {
        embed.addField('`Type`','Removed',true)
      }
      embed.addField('`Color`',role.name,true)
      embed.addField('`User`',user.user.tag,true)
      embed.setTitle('<:apple_key:359560553431171084> `Color Toggled Successfully`')
      embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      embed.setFooter('Replying to ' + message.author.tag)
      message.channel.send({
        embed
      })
    }
    return true
  }
}

module.exports = colorCommand
