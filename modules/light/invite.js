const Command = require('../../cmdModule/commands').Command

class LgenCommand extends Command {
  constructor() {
    super({
      name: 'invite',
      help: 'Generate an invite',
      lhelp: '{channel} {uses}\n{channel} is the channel to use\n{uses} is the number of invite uses allowed\n{invite} must be 1/5/10/25/50/100'
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
    msg.delete()
    var au = msg.author
    var channeltouse = null
    var uses = null
    console.log(args[1])
    if (args[1]) {
      channeltouse = msg.guild.channels.find('name', args[1]);
    } else {
      channeltouse = msg.client.guilds.find('id', '315380052097499156').channels.find('name', 'welcome');
    }
    if (args[2] && (args[2] == 1 || args[2] == 5 || args[2] == 10 || args[2] == 25 || args[2] == 50 || args[2] == 100)) {
      uses = args[2]
    } else {
      uses = 1
    }
    channeltouse.createInvite({
        maxUses: uses,
        maxAge: 0
      })
      .then((invite) => au.send('<:Tick:318378431051989003> Here is the invite you requested: ' + `${invite}`))
      .catch(console.error)
  }
}

module.exports = LgenCommand