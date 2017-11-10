const Command = require('../../cmdModule/commands').Command

class LdiffCommand extends Command {
  constructor() {
    super({
      name: 'change',
      help: 'Change a member\'s crew',
      lhelp: '{user} {crew letter}\n{user} is the user to change crew for\n{crew letter} is B or G or Y or R, what crew to change the user to',
      module: 'light'
    })
  }

  hasPermission(message) {
    if (message.guild) {
      let dotGuildMember = message.guild.members.get(message.author.id)
      if (message.guild && message.guild.id == '277006003797491712' && dotGuildMember.roles.has('277031574133014530')) return true
    }
    return false
  }

  async run(msg, args, api) {
    let user = msg.guild.member(msg.mentions.users.first());
    var rolename2 = null
    var oldrolename = null
    if (user.roles.has('370811516309602307')) {
      oldrolename = msg.guild.roles.find('name', 'Bluelight')
    } else if (user.roles.has('277031676906045450')) {
      oldrolename = msg.guild.roles.find('name', 'Greenlight')
    } else if (user.roles.has('279166847289524224')) {
      oldrolename = msg.guild.roles.find('name', 'Yellowlight')
    } else if (user.roles.has('339024651747590146')) {
      oldrolename = msg.guild.roles.find('name', 'Redlight')
    }
    var arggg = args[2].toLowerCase()
    if (arggg.indexOf('b') > -1) {
      rolename2 = msg.guild.roles.find('name', 'Bluelight')
    } else if (arggg.indexOf('g') > -1) {
      rolename2 = msg.guild.roles.find('name', 'Greenlight')
    } else if (arggg.indexOf('y') > -1) {
      rolename2 = msg.guild.roles.find('name', 'Yellowlight')
    } else if (arggg.indexOf('r') > -1) {
      rolename2 = msg.guild.roles.find('name', 'Redlight')
    }
    user.addRole(rolename2)
    user.removeRole(oldrolename)
    msg.reply(`${user} has been changed to ${rolename2.name} (\`${rolename2}\`) from ${oldrolename.name} (\`${oldrolename}\`)!`)
  }

}

module.exports = LdiffCommand
