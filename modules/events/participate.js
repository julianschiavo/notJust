const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class participateCommand extends Command {
  constructor() {
    super({
      name: 'participate',
      help: 'Start the participate reaction event',
      lhelp: '|{timeout}|{channel}|{message}\n{timeout} is the timeout of the event in seconds\n{channel} is the name of the text channel to run the event in\n{message} is the text for the event message'
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
    if (!args[0] || !args[1] || !args[2]) {
      api.error('Please specify all the required arguments.')
      return
    }
    var chan
    if (isN(args[1])) {
      chan = message.guild.channels.get(args[1])
    } else {
      return api.error('Please specify a numeric channel id.')
    }
    var timeout
    if (isN(args[0])) {
      timeout = Number(args[0])
    } else {
      return api.error('Please specify a numeric timeout for the event.')
    }
    var log = chan
    message.channel.send(`Event Starting Very Soon. \nChannel: ${chan}`)
    args.splice(0,2)
    var them = args.join(' ')
    message.guild.roles.get('384675152400482304').setMentionable(true)
    chan.send(them).then(msg => { 
      msg.guild.roles.get('384675152400482304').setMentionable(false)
      msg.react(msg.guild.emojis.find('name','code'));
      const collector = msg.createReactionCollector(
        (reaction, user) => reaction.me,
        { time: timeout }
      );
      var list = [];
      collector.on('collect', r => {
        r.users.map(u => {
          if (list.indexOf(u.id) == -1) {
            list.push(u.id);
            log.send(`<:green_tick:330712173288488960> \`${u.tag}\` (\`${u.id}\`) is participating.`)
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

module.exports = participateCommand
