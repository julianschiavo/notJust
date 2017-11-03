const Command = require('../../cmdModule/commands').Command

class LseasonCommand extends Command {
  constructor() {
    super({
      name: 'season',
      help: 'Reset everything',
      lhelp: '{password}'
    })
  }

  hasPermission(message) {
    if (message.guild) {
      let dotGuildMember = message.guild.members.get(message.author.id)
      if (message.guild && message.guild.id == '277006003797491712' && message.author.id == '193908323911860224') return true
    }
    return false
  }

  async run(msg, args, api) {
    args.splice(0, 1)

    var endA
    var endB
    var endC
    var endD
    var prole
    var prole2

    prole = msg.guild.roles.find('name', 'Prestige Car')
    prole2 = msg.guild.roles.find('name', 'Prestige Cup')

    var rrole2
    rrole2 = msg.guild.roles.find('name', 'Bluelight Best Player')
    var rrole
    rrole = msg.guild.roles.find('name', 'Greenlight Best Player')
    var rrolee
    rrolee = msg.guild.roles.find('name', 'Yellowlight Best Player')
    var rroleee
    rroleee = msg.guild.roles.find('name', 'Redlight Best Player')

    var members = prole.members
    var members2 = prole2.members
    var members3 = rrole.members
    var members4 = rrolee.members
    var members5 = rroleee.members
    var members6 = rrole2.members

    members.filter(user => {
      user.removeRole(prole)
      return
    })

    members2.filter(user => {
      user.removeRole(prole2)
      return
    })

    members3.filter(user => {
      user.removeRole(rrole)
      return
    })

    members4.filter(user => {
      user.removeRole(rrolee)
      return
    })

    members5.filter(user => {
      user.removeRole(rroleee)
      return
    })

    members6.filter(user => {
      user.removeRole(rrole2)
      return
    })

    rrole2.setColor('#4c4cff')
    rrole.setColor('#00aa00')
    rrolee.setColor('#ffff4c')
    rroleee.setColor('#ff3232')

    api.embed('#ffffff', `<:Tick:318378431051989003> \`Everything Reset for New Season!\``, '')
  }
}

module.exports = LseasonCommand