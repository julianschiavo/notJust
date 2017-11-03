const Discord = require('discord.js')
const Command = require('../../cmdModule/commands').Command

class ballCommand extends Command {
  constructor() {
    super({
      name: 'magic',
      help: 'Ask Magic 8ball a question'
    })
  }

  async run(message, args, api) {
    //message.delete()
    //api.evalembed([245, 236, 71], "🏓 `Ping Successful`", "Heartbeat", one, "Ping", two)
    var sayings = ["It is certain",
      "Without a doubt",
      "Definitely",
      "Rely on it",
      "TBH, yes",
      "Probably",
      "Outlook good",
      "Signs point to yes",
      "Ask again later",
      "Cannot predict now",
      "Concentrate and ask again",
      "Hell no",
      "Nahhhh",
      "My sources say no",
      "Outlook not so good",
      "Very doubtful"
    ];
    var Ysayings = ["It is certain",
      "Without a doubt",
      "Definitely",
      "Rely on it",
      "TBH, yes",
      "Probably",
      "Outlook good",
      "Signs point to yes"
    ];



    if (message.author.id !== message.guild.ownerID) {
      var result = Math.floor((Math.random() * sayings.length) + 0);
      args.splice(0, 1)
      var q = args.join(' ');
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_billiards:372006754965389312> `' + q + '`')
      embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      embed.setFooter('Replying to ' + message.author.tag)
      embed.addField('`Response`', sayings[result], false)
      message.channel.send({
        embed
      })
    } else {
      var result = Math.floor((Math.random() * Ysayings.length) + 0);
      args.splice(0, 1)
      var q = args.join(' ');
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_billiards:372006754965389312> `' + q + '`')
      embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      embed.setFooter('Replying to ' + message.author.tag)
      embed.addField('`Response`', Ysayings[result], false)
      message.channel.send({
        embed
      })
    }
    return true
  }
}

module.exports = ballCommand