const Command = require('../../cmdModule/commands').Command

class LcodeCommand extends Command {
  constructor() {
    super({
      name: 'zHF93gpaKtfRuCXcR3wyB6',
      help: 'ok'
    })
  }

  hasPermission(message) {
    //if (message.guild.id == '268970339948691456') return true
    return false
  }

  async run(msg, args, api) {
    var user = msg.guild.member(msg.author);
    var role = msg.guild.roles.find('name', 'Stage 2')

    user.addRole(role)
    
    msg.delete()

    api.embed('#00ff00', `<:Tick:318378431051989003> \`${user.user.username} has moved into #code Stage 2!\``, '')
  }

}

module.exports = LcodeCommand
