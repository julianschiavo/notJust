const Discord = require('discord.js')
const Command = require('../../cmdModule/commands').Command

class flipCommand extends Command {
  constructor() {
    super({
      name: 'flip',
      help: 'Flip a coin'
    })
  }

  async run(message, args, api) {
    //message.delete()
    //api.evalembed([245, 236, 71], "🏓 `Ping Successful`", "Heartbeat", one, "Ping", two)
    var result = Math.floor((Math.random() * 2) + 1);
    	
	  args.splice(0,1)
      var q = args.join(' ');
			//bot.reply(message, sayings[result]);
    let embed = new Discord.RichEmbed()
      //embed.setTimestamp()
      embed.setTitle('<:apple_money_bag:359560552210759681> `Coin Flip Successful`')
	  embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      //embed.setFooter('Replying to: ' + this.message.author.tag)
      embed.setTimestamp()
      if (result == 1) {
    		embed.addField('`Result`', 'Heads', false)
    	} else if (result == 2) {
    		embed.addField('`Result`', 'Tails', false)
    	}
        
      message.channel.send({ embed })
    return true
  }
}

module.exports = flipCommand
