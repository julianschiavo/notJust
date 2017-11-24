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
      invCode: ''
      }
      message.client.currency.set(user.id, curr);
    }
    var inv = message.client.currency.get(user.id).invCode
      var curr = message.client.currency.get(user.id)
    
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:gold:383074743089364992> `Gold Bar Status`')
   embed.addField('Amount', curr.amount, true)
    if (inv) {
   embed.addField('Invite', '`' + inv.toString() + '`', true)
    }
    
      embed.setColor('#00ff00')
      embed.setFooter('Replying to ' + message.author.tag)
      embed.setDescription(String.fromCharCode(8203))
      message.channel.send({
        embed
      })






    return true
  }
}

module.exports = checkCommand
