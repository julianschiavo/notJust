const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class givCommand extends Command {
  constructor() {
    super({
      name: 'give',
      help: 'Give gold bars to a member',
      lhelp: '{user} {amount}\n{user} is the ID or ping of the user\n{amount} is the amount of gold bars'
    })
  }

  hasPermission(message) {
   if ((message.author.id == require('../../config.json').owner) && message.guild.id == '268970339948691456') return true
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
      amount: 0
      }
      message.client.currency.set(user.id, curr);
    }

    var thisConf = message.client.currency.get(user.id)
    
      if (isN(args[2])) {
      var amount = args[2]
      } else {
      api.error('Please specify a numeric amount of gold bars.')
      return
      }
      
      
      var idd = user.id
      thisConf.amount = parseInt(thisConf.amount + amount);
          message.client.currency.set(user.id, thisConf);
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:gold:383074743089364992> `' + amount + ' Gold Bars Given To ' + user.user.tag + '`')
    embed.addField('Current Amount', thisConf.amount, false)
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
