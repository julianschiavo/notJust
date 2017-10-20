const Command = require('../../cmdModule/commands').Command

class LpresCommand extends Command {
  constructor() {
    super({
      name: 'p',
      help: 'Set a prestige car or cup status for a member',
      lhelp: '{type} {y/n/yes/no} [user]\n{type} is car/cup, the type of prestige status to change\n[user] is the user to change prestige status for, defaults to message author'
    })
  }
  
  hasPermission(message) {
          if (message.guild.id == '277006003797491712') return true
    return false  
  }

  async run(msg, args, api) {
    args.splice(0,1)
    if (!args[0] || !args[1]) {
      //msg.reply('<:NoTick:318378431572344832> Please remember to specify the y/n status and car/cup type to change!')
      api.error('Please remember to specify whether or not (y/n) and the type (car/cup) of prestige status!')
      return;
    }
    
    var type
    var status
    var status2
    var when
    var theper
    var prole
    
    var endA
    var endB
    var endC
    var endD
    var color
    var saferole = msg.guild.roles.find('name', 'Prestige Car')
    var safebreak = false

    type = args[0].toLowerCase()
    
    if (type !== 'car' && type !== 'cup') {
      //msg.reply('<:NoTick:318378431572344832> Please remember to specify the y/n status and car/cup type to change!')
      api.error('Please remember to specify whether or not (y/n) and the type (car/cup) of prestige status!')
      return;
    }

    args.splice(0,1)
    
    status2 = args[0].toLowerCase()
    
    if (status2 == 'y' || status2 == 'yes') {
      status = true
    } else {
      status = false
    }
    
    args.splice(0,1)
    
    /*if (args[0]) {
      if (args[0] == 'this' || args[3] == 'current') {
        when = 'this'
      } else if (args[0] == 'last' || args[3] == 'old') {
        when = 'last'
      }
    } else {
      when = 'this'
    }*/
    
    if (args[0] && msg.guild.members.get(msg.author.id).roles.has('277031574133014530')) {
      theper = msg.guild.member(msg.mentions.users.first());
    } else {
      theper = msg.guild.member(msg.author);
    }

    if (theper.roles.has('277031676906045450')) {
      color = '#00ff00'
    } else if (theper.roles.has('279166847289524224')) {
      color = '#ffff00'
    } else if (theper.roles.has('339024651747590146')) {
      color = '#ff0000'
    }
    
    args.splice(0,2)
    
    if (type == 'car') {
      //if (when == 'this') {
        prole = msg.guild.roles.find('name', 'Prestige Car')
      
      //} else if (when = 'last') {
      //  prole = msg.guild.roles.find('name', 'Prestige Car')
      //}
      endA = 'Car'
    } else if (type = 'cup') {
      //if (when == 'this') {
      //  prole = msg.guild.roles.find('name', 'Prestige Cup')
      //} else if (when = 'last') {
      
        prole = msg.guild.roles.find('name', 'Prestige Cup')
      //}
      endA = 'Cup'
    }
    
    if (status == true) {
      if (type == 'cup') {
        if (theper.roles.has(saferole.id)) {
          theper.addRole(prole)
        } else {
          safebreak = true
        }
      } else {
        theper.addRole(prole)
      }
      if (type == 'car') {
        endB = 'has the'
      } else if (type == 'cup') {
        endB = 'has completed the'
      }
      endC = '<:Tick:318378431051989003>'
      endD = '#00ff00'
    } else if (status == false) {
      if (theper.roles.has(prole.id)) {
        theper.removeRole(prole)
      } else {
        //do no thing
      }
      if (type == 'car') {
        endB = 'does not have the'
      } else if (type == 'cup') {
        endB = 'has not completed the'
      }
      endC = '<:NoTick:318378431572344832>'
      endD = '#ff0000'
    }
    if (safebreak == true) {
      api.embed(color, `<:NoTick:318378431572344832> \`Please set your Prestige Car status before your Prestige Cup status.\``, '')
    } else {
    api.embed(color, `${endC} \`${theper.user.username} ${endB} Prestige ${endA}\``, '')
    }
  }

}

module.exports = LpresCommand
