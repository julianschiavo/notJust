const Command = require('../../cmdModule/commands').Command

class LbestCommand extends Command {
  constructor() {
    super({
      name: 'best',
      help: 'Set the best crew member or change it\'s role color',
      lhelp: '{B/G/Y/R} {user}\n{B/G/Y/R} is the crew the member/user is in\n{user} is @ the user'
    })
  }

  hasPermission(message) {
    if (message.guild.id == '277006003797491712' && message.guild.members.get(message.author.id).roles.has('277031574133014530')) return true
    return false
  }

  async run(msg, args, api) {
    args.splice(0, 1)
    if (!args[0] || !args[1]) {
      api.error('Please remember to specify which user and crew you want to set best member for!')
      return;
    }

    var user = msg.guild.member(msg.mentions.users.first());
    var crew
    var role
    var color

    crew = args[0].toLowerCase()
    if (crew !== 'b' && crew !== 'g' && crew !== 'y' && crew !== 'r') {
      api.error('Please remember to specify which crew the member is in!')
      return;
    } else if (crew == 'b') {
      role = msg.guild.roles.find('name', 'Bluelight Best Player')
      color = '#4c4cff'
      role.setColor(color)
    } else if (crew == 'g') {
      role = msg.guild.roles.find('name', 'Greenlight Best Player')
      color = '#00aa00'
      role.setColor(color)
    } else if (crew == 'y') {
      role = msg.guild.roles.find('name', 'Yellowlight Best Player')
      color = '#ffff4c'
      role.setColor(color)
    } else if (crew == 'r') {
      role = msg.guild.roles.find('name', 'Redlight Best Player')
      color = '#ff3232'
      role.setColor(color)
    }
    args.splice(0, 1)

      user.addRole(role)
    
    role.members.filter(user => {
      user.removeRole(role)
      return
    })

    api.embed(color, `<:Tick:318378431051989003> \`${user.user.username} has been set as the ${role.name}!\``, '')
  }

}

module.exports = LbestCommand
