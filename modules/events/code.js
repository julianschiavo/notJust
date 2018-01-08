const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class riddleCommand extends Command {
  constructor() {
    super({
      name: 'code',
      help: 'Start the code event'
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
    var embed = new Discord.RichEmbed();
embed.setImage('https://i.dis.gg/revived.png')
embed.setColor('#ffff00')
message.guild.channels.find('name','code-revived').send({embed})
    
    embed = new Discord.RichEmbed();
embed.setColor(" #ffff00 ");
embed.setTitle("🌞 `#Code Revived`");
embed.setDescription("It's been a while, but I'm happy to finally announce #Code Revived, an event rising from the ashes of #Code, which was shut down in 2017.");
    embed.addBlankField(false)
    embed.addField("`Info`" , `The start of #Code Revived is the image in the embed above. Read below for some tips.`)
    embed.addBlankField(false)
    embed.addField("`Tips`" , `1. Beware false paths.
2. Use links.
3. This is related to the prize.`)
    embed.addBlankField(false)
embed.addField("`Rules`" , `1. No alt.
2. No cheating.
3. You can work together, but there may only be 1 winner.
4. Please only participate if you want the prize.`);
    embed.addBlankField(false)
embed.addField("`Prize`" , `There is only 1 winner. The first person to get to the Discord server gets a free, lifetime, dis.gg premium account. This includes access to dis.gg links, dis.gg images, dis.gg pastes, and many other current and upcoming services.`)
message.guild.channels.find('name','code-revived').send({embed})
      
    return true
  }
}

module.exports = riddleCommand
