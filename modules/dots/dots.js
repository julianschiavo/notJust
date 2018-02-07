const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class dotsCommand extends Command {
  constructor() {
    super({
      name: 'dots',
      help: 'Check your dots and level'
    })
  }

  hasPermission(message) {
    if (message.guild && message.guild.id == '268970339948691456') return true
    return false
  }

  async run(message, args, api) {
    var user
    if (args[1]) {
      user = message.guild.member(message.mentions.users.first());
      if (!user) {
        user = message.guild.member(message.author);
      }
    } else {
      user = message.guild.member(message.author);
    }
    var dots = message.client.dots.get(user.id)
    !dots ? message.channel.send('You have no dots yet.') : console.log('');
    /*if (dots.level >= '3') {
      user.addRole(message.guild.roles.find('name','emoji'))
    }*/
    if (dots.level >= '10') {
      user.addRole(message.guild.roles.find('name','color'))
    }
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:dots:403826180572053504> `Dots Status`')
      embed.addField('User', user.user.tag, true)
      embed.addField('Amount', dots.dots, true)
      embed.addField('Level', dots.level, true)
      embed.setColor('#00ff00')
      embed.setFooter('Replying to ' + message.author.tag)
      embed.setDescription(String.fromCharCode(8203))
      message.channel.send({
        embed
      })
    return true
  }
}

module.exports = dotsCommand
