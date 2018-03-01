const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class checkCommand extends Command {
  constructor() {
    super({
      name: 'check',
      help: 'Check your gold bar status'
    })
  }

  hasPermission(message) {
    if (message.guild && message.guild.id == '268970339948691456' && 1 == 0) return true
    return false
  }

  async run(message, args, api) {
    var user
    if (args[1]) {
      user = message.guild.member(message.mentions.users.first());
    } else {
      user = message.guild.member(message.author);
    }
    var curr = message.client.currency.get(user.id)
    if (!curr) {
      var curr = {
        amount: 0,
        invCode: '',
        converted: true,
        pastUses: 0
      }
      message.client.currency.set(user.id, curr);
    } else if (!message.client.currency.get(user.id).converted) {
      var curr = {
        amount: Math.floor(message.client.currency.get(user.id).amount / 10),
        invCode: '',
        converted: true,
        pastUses: 0
      }
      message.client.currency.set(user.id, curr)
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:goldbar:383480100282171392> `Conversion Successful`')
      embed.addField('For', user.user.tag, true)
      embed.addField('Balance', curr.amount, true)
      embed.setColor('#00ff00')
      embed.setDescription(String.fromCharCode(8203))
      message.channel.send({
        embed
      })
      return
    }
    if (!curr.pastUses) {
      curr.pastUses = 0
      message.client.currency.set(user.id, curr)
    }
    curr = message.client.currency.get(user.id)
    var invi = curr.invCode
    var past = curr.pastUses
    message.guild.fetchInvites().then(inv => {
      var uses = inv.filter(g => g.code == invi).map(g => g.uses)
      curr = message.client.currency.get(user.id)
      curr.amount = (curr.amount + ((uses - past) * 200)) /* change back to 100 after invite-a-thon */
      curr.pastUses = uses
      message.client.currency.set(user.id, curr)
      
      /* temporary invite-a-thon section */
      var dots = message.client.dots.get(user.id) || { dots: 0, level: 0, time: 0 };
      dots.dots = (dots.dots + ((uses - past) * 10))
      var desiredLevel = dots.level + 1
      var xpLeft = dots.dots - (5 / 6 * desiredLevel * (2 * desiredLevel * desiredLevel + 27 * desiredLevel + 91))
      if (xpLeft >= 0) {
        message.channel.send(`**${message.author.tag}** is now **Level ${desiredLevel}**!`).then(msg => {msg.delete(10000)}).catch(err => console.error(err))
        dots.level = desiredLevel;
      }
      if (dots.level >= '10') {
        user.addRole(message.guild.roles.find('name','color'))
      }
      message.client.dots.set(user.id,dots)
      /* end temp section */
      
      curr = message.client.currency.get(user.id)
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:goldbar:383480100282171392> `Gold Bar Status for ' + user.user.tag + '`')
      embed.addField('Amount', curr.amount, true)
      if (invi) {
        embed.addField('Invite', '`' + invi + '`', true)
      }
      if (curr.pastUses) {
        embed.addBlankField(false)
        embed.addField('Past Uses', past, true)
      }
      if (uses || curr.pastUses) {
        embed.addField('New Uses', (uses - past), true)
      }
      embed.setColor('#00ff00')
      embed.setFooter('Replying to ' + message.author.tag)
      embed.setDescription(String.fromCharCode(8203))
      message.channel.send({
        embed
      })
    })
    return true
  }
}

module.exports = checkCommand
