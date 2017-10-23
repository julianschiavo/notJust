const Command = require('../../cmdModule/commands').Command


class LoldCommand extends Command {
  constructor() {
    super({
      name: 'remove',
      help: 'Remove a member',
      lhelp: '{user}\n{user} is the user to remove from Light'
    })
  }

  hasPermission(message) {
        let dotGuildMember = message.guild.members.get(message.author.id)
          if (message.guild.id == '277006003797491712' && dotGuildMember.roles.has('277031574133014530')) return true
    return false  
  }

  async run(msg, args, api) {
    msg.delete()
    let user = msg.guild.member(msg.mentions.users.first());
    let rolename = msg.guild.roles.find('name', 'Members')
    let newrolename = msg.guild.roles.find('name', 'Leaving')
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
    user.removeRole(rolename)
    user.addRole(newrolename)
    user.removeRole(oldrolename)
    msg.reply(`${user} has been removed from the ${rolename.name} (\`${rolename}\`) and ${oldrolename.name} (\`${oldrolename}\`) roles and added to the ${newrolename.name} (\`${newrolename}\`) role!`)
  }
}

module.exports = LoldCommand
