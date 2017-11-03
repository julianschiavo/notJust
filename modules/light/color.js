const Command = require('../../cmdModule/commands').Command

class LcolorCommand extends Command {
  constructor() {
    super({
      name: 'color',
      help: 'Set Best Player role color',
      lhelp: '{hexcolor}\n{hexcolor} is the hex color (e.g. #ffffff is white) to set your role color to \n(**YOU MUST INCLUDE `#`!**)'
    })
  }

  hasPermission(message) {
    if (message.guild && message.guild.id == '277006003797491712') return true
    return false
  }

  async run(msg, args, api) {
    args.splice(0, 1)
    if (!args[0]) {
      api.error('Please remember to specify the hex color you\'d like (with # at the start)!')
      return;
    }

    var rrole
    rrole = msg.guild.roles.find('name', 'Greenlight Best Player')
    var rrolee
    rrolee = msg.guild.roles.find('name', 'Yellowlight Best Player')
    var rroleee
    rroleee = msg.guild.roles.find('name', 'Redlight Best Player')
    var rrole2
    rrole2 = msg.guild.roles.find('name', 'Bluelight Best Player')
    var member = msg.guild.members.get(msg.author.id)
    var color

    if (member.roles.has(rrole.id) || member.roles.has(rrolee.id) || member.roles.has(rroleee.id) || member.roles.has(rrole2.id)) {
      if (member.roles.has(rrole.id)) {
        rrole = rrole
      } else if (member.roles.has(rrolee.id)) {
        rrole = rrolee
        rrolee = ''
      } else if (member.roles.has(rroleee.id)) {
        rrole = rroleee
        rroleee = ''
        rrolee = ''
      } else if (member.roles.has(rrole2.id)) {
        rrole = rrole2
        rroleee = ''
        rrolee = ''
        rrole2 = ''
      }
    } else {
      api.error('You must be awarded the best player for this season (by an admin) to set your role color!')
      return;
    }

    color = args[0].toLowerCase()
    args.splice(0, 1)

    if (member.roles.has(rrole.id)) {
      rrole.setColor(color)
    } else {
      api.error('You must be awarded the best player for this season (by an admin) to set your role color!')
      return;
    }

    api.embed(color, `<:Tick:318378431051989003> \`${rrole.name}'s color has been changed to ${color}!\``, '')
  }

}

module.exports = LcolorCommand