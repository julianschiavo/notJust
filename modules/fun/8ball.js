const Discord = require('discord.js')
const Command = require('../../cmdModule/commands').Command

class ballCommand extends Command {
  constructor() {
    super({
      name: '8ball',
      help: 'Ask 8ball a question'
    })
  }

  async run(message, args, api) {
    //message.delete()
    //api.evalembed([245, 236, 71], "🏓 `Ping Successful`", "Heartbeat", one, "Ping", two)
    var sayings = ["It is certain",
										"It is decidedly so",
										"Without a doubt",
										"Yes, definitely",
										"You may rely on it",
										"As I see it, yes",
										"Most likely",
										"Outlook good",
										"Yes",
										"Signs point to yes",
										"Reply hazy try again",
										"Ask again later",
										"Better not tell you now",
										"Cannot predict now",
										"Concentrate and ask again",
										"Don't count on it",
										"My reply is no",
										"My sources say no",
										"Outlook not so good",
										"Very doubtful"];

			var result = Math.floor((Math.random() * sayings.length) + 0);
	  args.splice(0,1)
      var q = args.join(' ');
			//bot.reply(message, sayings[result]);
    let embed = new Discord.RichEmbed()
      //embed.setTimestamp()
      embed.setTitle('<:apple_billiards:372006754965389312> `' + q + '`')
	  embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      //embed.setFooter('Replying to: ' + this.message.author.tag)
      //embed.setTimestamp()
	  embed.setFooter('Replying to ' + message.author.tag)
        embed.addField('`Response`', sayings[result], false)
      message.channel.send({ embed })
    return true
  }
}

module.exports = ballCommand
