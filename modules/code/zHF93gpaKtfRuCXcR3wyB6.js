const Command = require('../../cmdModule/commands').Command

class LcodeCommand extends Command {
  constructor() {
    super({
      name: 'zHF93gpaKtfRuCXcR3wyB6',
      help: 'ok'
    })
  }

  hasPermission(message) {
    if (message.guild.id == '268970339948691456') return false
    return true
  }

  async run(msg, args, api) {
    let guild = msg.client.guilds.find("name", "dotHub");
    var user = guild.member(msg.author);
    var role = guild.roles.find('name', 'Stage 2')

    user.addRole(role)
    
    //msg.delete()

    api.embed('#00ff00', `<:green_tick:330712173288488960> \`You have moved into #code Stage 2!\``, '')
  }

}

module.exports = LcodeCommand
