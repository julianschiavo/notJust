const Command = require('../../cmdModule/commands').Command


class LnewCommand extends Command {
  constructor() {
    super({
      name: 'crew',
      help: 'Set a member\'s initial crew',
            lhelp: '{user} {crew letter}\n{user} is the user to add to a crew\n{crew letter} is B or G or Y or R, what crew to add the user to'
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
    var rolename2 = null
    var arggg = args[2].toLowerCase()
    if(arggg.indexOf('b') > -1) {
      rolename2 = msg.guild.roles.find('name', 'Bluelight')
    } else if(arggg.indexOf('g') > -1) {
      rolename2 = msg.guild.roles.find('name', 'Greenlight')
    } else if(arggg.indexOf('y') > -1) {
      rolename2 = msg.guild.roles.find('name', 'Yellowlight')
    } else if(arggg.indexOf('r') > -1) {
      rolename2 = msg.guild.roles.find('name', 'Redlight')
    }
    user.addRole(rolename)
    user.addRole(rolename2)
    msg.reply(`${user} has been given the ${rolename.name} (\`${rolename}\`) and ${rolename2.name} (\`${rolename2}\`) roles!`)
  }
}

module.exports = LnewCommand
