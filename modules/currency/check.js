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

    if (!message.client.currency.get(user.id)) {
      var curr = {
      amount: 0,
      invCode: '',
        converted: true
      }
      message.client.currency.set(user.id, curr);
    } else if (!message.client.currency.get(user.id).converted) {
      var curr = {
        amount: Math.floor(message.client.currency.get(user.id).amount / 10),
        invCode: '',
        converted: true
      }
      message.client.currency.set(user.id,curr)
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:goldbar:383480100282171392> `Conversion Successful`')
   embed.addField('For', user.user.tag, true)
      embed.addField('Balance', curr.amount, true)
      embed.setColor('#00ff00')
      //embed.setFooter('Replying to ' + message.author.tag)
      embed.setDescription(String.fromCharCode(8203))
      message.channel.send({
        embed
      })
      return
    }
    var curr = message.client.currency.get(user.id)
    if (!curr.pastUses) {
      curr.pastUses = 0
      message.client.currency.set(user.id,curr)
    }
    
    var inv = message.client.currency.get(user.id).invCode
      var curr = message.client.currency.get(user.id)
    message.guild.fetchInvites().then(inv => {
    var uses = inv.filter(g => g.code == inv).map(g => g.uses)
    curr.amount = curr.amount + ((curr.pastUses - uses) * 100)
    curr.pastUses = uses
    message.client.currency.set(user.id,curr)
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:goldbar:383480100282171392> `Gold Bar Status for ' + user.user.tag + '`')
   embed.addField('Amount', curr.amount, true)
    if (inv) {
   embed.addField('Invite', '`' + inv.toString() + '`', true)
    }
    embed.addBlankField(false)
    if (curr.pastUses !== '') {
      //embed.addField('Past Uses', curr.pastUses, true)
    }
    if (uses !== '' && curr.pastUses !== '') {
      embed.addField('New Uses', curr.pastUses - uses, true)
    }
      console.log(curr.pastUses)
    
    
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
