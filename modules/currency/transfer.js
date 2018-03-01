const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class transCommand extends Command {
  constructor() {
    super({
      name: 'transfer',
      help: 'Transfer your gold bars to a member',
      lhelp: '{user} {amount}\n{user} is the ID or ping of the user\n{amount} is the amount of gold bars'
    })
  }

  hasPermission(message) {
   if (message.guild && message.guild.id == '268970339948691456' && 1 == 0) return true
    return false
  }

  async run(message, args, api) {
    function countWords(str) {
      return str.split(" ").length;
    }
    function isN(num) {
      return !isNaN(num)
    }
    if (!args[1] || !args[2]) {
      api.error('Please specify a user and amount.')
      return
    }
    
    var user
    var from
      if (args[1]) {
        user = message.guild.member(message.mentions.users.first());
        from = message.guild.member(message.author)
      } else {
        api.error('User not found.')
        return
      }
    if (user == from) {
      return api.error('You can\'t transfer gold bars to yourself!')
    }
    if (args[2].indexOf('-') > -1) {
      return api.error('You can\'t transfer negative gold bars!')
    }
          if (!message.client.currency.get(user.id)) {
      var curr = {
      amount: 0,
        converted: true
      }
      message.client.currency.set(user.id, curr);
    }
    if (!message.client.currency.get(from.id)) {
      var curr = {
      amount: 0,
        converted: true
      }
      message.client.currency.set(from.id, curr);
    }

    var thisConf = message.client.currency.get(user.id)
    var fromConf = message.client.currency.get(from.id)
    
      if (isN(args[2]) && fromConf.amount >= Number(args[2])) {
        var am = Number(args[2])
        var famount = Number(fromConf.amount) - Number(args[2])
      var amount = Number(args[2]) + Number(thisConf.amount)
      } else {
      api.error('Please specify a numeric amount of gold bars. You may also have gotten this error if you do not have enough gold bars for the transfer.')
      return
      }
      
      
      var idd = user.id
      thisConf.amount = Number(amount);
          message.client.currency.set(user.id, thisConf);
          fromConf.amount = Number(famount);
          message.client.currency.set(from.id, fromConf);
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:goldbar:383480100282171392> `Gold Bars Transferred from ' + from.user.tag + ' to ' + user.user.tag + '`')
     // embed.setTitle('<:gold:383074743089364992> `' + amount + ' Gold Bars Given To ' + user.user.tag + '`')
     embed.addField('Amount Transferred', am, false)
     //embed.addField('From', '`' + from.user.tag + '`', true)
     embed.addField('New From Amount', famount, true)
     //embed.addField('To', '`' + user.user.tag + '`', false)
     embed.addField('New To Amount', amount, true)
      embed.setColor('#00ff00')
      embed.setFooter('Replying to ' + message.author.tag)
      embed.setDescription(String.fromCharCode(8203))
      message.channel.send({
        embed
      })






    return true
  }
}

module.exports = transCommand
