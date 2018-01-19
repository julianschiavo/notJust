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
    } else {
      user = message.guild.member(message.author);
    }
    var dots = message.client.dots.get(user.id)
    !dots ? message.channel.send('You have no dots yet.') : console.log('');
      var uses = inv.filter(g => g.code == invi).map(g => g.uses)
      curr = message.client.currency.get(user.id)
      curr.amount = (curr.amount + ((uses - past) * 100))
      curr.pastUses = uses
      message.client.currency.set(user.id, curr)
      curr = message.client.currency.get(user.id)
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:GWdotjsVerified:403294615274520576> `Dots Status`')
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
