const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class givCommand extends Command {
  constructor() {
    super({
      name: 'gold',
      help: 'Give gold bars to a member',
      lhelp: '{user} {amount}\n{user} is the ID or ping of the user\n{amount} is the amount of gold bars'
    })
  }

  hasPermission(message) {
   if (message.guild && (message.author.id == require('../../config.json').owner) && 1 == 0 && message.guild.id == '268970339948691456') return true
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
      if (args[1]) {
        user = message.guild.member(message.mentions.users.first());
      } else {
        user = message.guild.member(message.author);
      }
          if (!message.client.currency.get(user.id)) {
      var curr = {
      amount: 0,
        converted:true
      }
      message.client.currency.set(user.id, curr);
    }

    var thisConf = message.client.currency.get(user.id)
    
      if (isN(args[2])) {
        var am = Number(args[2])
      var amount = Number(args[2]) + Number(thisConf.amount)
      } else {
      api.error('Please specify a numeric amount of gold bars.')
      return
      }
      
      
      var idd = user.id
      thisConf.amount = Number(amount);
          message.client.currency.set(user.id, thisConf);
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:goldbar:383480100282171392> `' + user.user.tag + ' Gold Bars Updated`')
     // embed.setTitle('<:gold:383074743089364992> `' + amount + ' Gold Bars Given To ' + user.user.tag + '`')
    embed.addField('Amount Added', am, false)
    embed.addField('Total Amount', thisConf.amount, false)
      embed.setColor('#00ff00')
      embed.setFooter('Replying to ' + message.author.tag)
      embed.setDescription(String.fromCharCode(8203))
      message.channel.send({
        embed
      })






    return true
  }
}

module.exports = givCommand
