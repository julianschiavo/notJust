const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class riddleCommand extends Command {
  constructor() {
    super({
      name: 'riddle',
      help: 'Start the riddle event'
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
    let embed = new Discord.RichEmbed();
embed.setColor(" #ffff00 ");
embed.setTitle("`New Year's Riddle Event`");
embed.setDescription("Happy New Year! As celebration, we are hosting a riddle event in conjunction with our awesome partner, Shiki Zone. The riddle will be related to anime, so you'll have to solve anime riddles.");
embed.addField("`Info`" , `• You **must** be on this server (Discord Technology) **and** our partner, Shiki Zone to participate in the event. Join Shiki Zone @ <https://shiki.zone/discord>.
• Start the event by DMing @Megumi#1726 `*riddlestart`.
• You start with one available hint. You can buy up to two more by typing `.buy 2` in #gambling-and-shop in Shiki Zone to purchase one. Then type `*usehint code`, code being the code given by Natusno. 
• Answer all ten riddles, then you will receive a code. Just send `*riddlecode code` to finish the event.
• This event ends in 7 days, at 11:59PM PST, 7/1/2018.`)
embed.addField("Rules" , `1. No alt.
2. No cheating.
3. There are 10 riddles, DM @Megumi#1726 to submit answers.
4. Mention the riddle when DMing the answer. (e.g. \`*riddle10 answer\`)`);
embed.addField("Prizes" , `**1st Finisher:** Speedy Riddler Role, 20,000 :SZskittles:, a $20 steam game, one dis.gg link, and 20,000 gold bars.
**2nd Finisher:** Riddler Role, and 10,000 :SZskittles:, a month of Discord Nitro, and 5,000 gold bars.
**3rd Finisher:** Riddler Role, 5,000 :SZskittles:, and 5,000 gold bars.
**Other Finishers:** 5,000 :SZskittles: and 1,000 gold bars.
Roles, :SZskittles:, Discord Nitro, and the steam game are by Shiki Zone. The dis.gg links and gold bars are by Discord Technology.`)
message.channel.send({embed})
      
    return true
  }
}

module.exports = riddleCommand
