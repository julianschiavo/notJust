const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class reactCommand extends Command {
  constructor() {
    super({
      name: 'react',
      help: 'Start the reaction event',
      lhelp: '{timeout} {gold} {message}\n{timeout} is the timeout of the event in seconds\n{channel} is the name of the text channel to run the event in\n{gold} is the amount of gold to award for reacting\n{message} is the text for the event message'
    })
  }

  hasPermission(message) {
   if (message.guild && (message.author.id == require('../../config.json').owner) && message.guild.id == '268970339948691456') return true
    return false
  }

  async run(message, args, api) {
    function isN(num) {
      return !isNaN(num)
    }
    args.splice(0,1)
    if (!args[0] || !args[1] || !args[2]) {
      api.error('Please specify all the required arguments.')
      return
    }
    var timeout
    if (isN(args[0])) {
      timeout = Number(args[0])
    } else {
      return api.error('Please specify a numeric timeout for the event.')
    }
    var amount
    if (isN(args[1])) {
      amount = Number(args[1])
    } else {
      return api.error('Please specify a numeric amount of gold bars to award.')
    }
    args.splice(0,2)
    var them = args.join(' ')
    message.guild.roles.get('384675152400482304').setMentionable(true)
    message.guild.channels.find('name','announcements').send('<@&384675152400482304> <:apple_christmas:390347387908128768> **Merry Christmas!** <:apple_christmas:390347387908128768>\n' + them).then(msg => { 
      msg.guild.roles.get('384675152400482304').setMentionable(false)
      msg.react(msg.guild.emojis.find('name','code'));
      const collector = msg.createReactionCollector(
        (reaction, user) => reaction.me,
        { time: timeout }
      );
      var list = [];
      collector.on('collect', r => {
        r.users.map(u => {
          if (!message.client.currency.get(u.id)) {
            var curr = {
              amount: 0,
              converted:true
            }
            message.client.currency.set(u.id, curr);
          }
          if (list.indexOf(u.id) == -1 && message.client.currency.get(u.id)) {
            var nuu = message.client.currency.get(u.id);
            nuu.amount = nuu.amount + amount;
            message.client.currency.set(u.id,nuu);
            list.push(u.id)
          }
        })
      });
      collector.on('end', collected => {
        msg.react(msg.guild.emojis.find('name','animoji_loading'));
      });
    });
      
    return true
  }
}

module.exports = reactCommand
