const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command
const Chance = require('chance')
const ccc = new Chance()

class reactCommand extends Command {
  constructor() {
    super({
      name: 'react',
      help: 'Start the reaction event',
      lhelp: '|{timeout}|{gold}|{chance}|{channel}|{message}\n{timeout} is the timeout of the event in seconds\n{channel} is the name of the text channel to run the event in\n{gold} is the amount of gold to award for reacting\n{chance} is the chance of getting gold, 1 is 1%, 100 is 100%\n{message} is the text for the event message'
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
    var args = message.content.split('|')
    args.splice(0,1)
    if (!args[0] || !args[1] || !args[2] || !args[3] || !args[4]) {
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
      return api.error('Please specify a numeric amount of dots to award.')
    }
    var chance
    if (isN(args[2])) {
      chance = Number(args[2])
    } else {
      return api.error('Please specify a numeric chance of getting the dots.')
    }
    var chan
    if (isN(args[3])) {
      chan = message.guild.channels.get(args[3])
    } else {
      return api.error('Please specify a numeric channel id.')
    }
    var log = chan
    message.channel.send(`Event Starting Very Soon. \nTimeout: ${timeout}\nDot Amount: ${amount}\nChance: ${chance}\nChannel: ${chan}`)
    args.splice(0,4)
    var them = args.join(' ')
    chan.send(them).then(msg => { 
      msg.react(msg.guild.emojis.find('name','code'));
      const collector = msg.createReactionCollector(
        (reaction, user) => reaction.me,
        { time: timeout }
      );
      var list = [];
      collector.on('collect', r => {
        r.users.map(u => {
          var dots = message.client.dots.get(u.id) || { dots: 0, level: 0, time: 0 };
          var rand = ccc.integer({min: 0, max: 100})
          if (list.indexOf(u.id) == -1 && message.client.dots.get(u.id) && rand < chance) {
            var nuu = message.client.dots.get(u.id);
            nuu.dots = nuu.dots + amount;
            message.client.currency.set(u.id,nuu);
            list.push(u.id);
            log.send(`<:green_tick:330712173288488960> \`${u.tag}\` (\`${u.id}\`)`)
          } else if (list.indexOf(u.id) == -1 && message.client.currency.get(u.id)) {
            list.push(u.id);
            log.send(`<:red_tick:330712188681453590> \`${u.tag}\` (\`${u.id}\`)`).then(msg => {
              msg.delete(10000)
            })
          } else if (list.indexOf(u.id) > -1) {
            var nuu = message.client.dots.get(u.id);
            nuu.dots = nuu.dots - amount;
            message.client.currency.set(u.id,nuu);
            list.push(u.id);
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
