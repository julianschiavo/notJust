const Command = require('../../cmdModule/commands').Command

class aboutCommand extends Command {
  constructor() {
    super({
      name: 'about',
      help: 'Get information about the bot'
    })
  }

  async run(message, args, api) {
    //message.delete()
    //api.evalembed([245, 236, 71], "🏓 `Ping Successful`", "Heartbeat", one, "Ping", two)
    var servers  = message.client.servers.length,
    var channels = message.client.channels.length,
    var users    = message.client.users.length,
    //let online   = this.client.users.filter(u => u.status != "offline").length;
    let embed = new Discord.RichEmbed()
      //embed.setTimestamp()
      embed.setTitle('<:apple_symbol_info:359559750096257024> `About notJust`')
      embed.setColor('#00ff00')
      //embed.setFooter('Replying to: ' + this.message.author.tag)
      embed.setTimestamp()
        embed.setDescription(String.fromCharCode(8203))
        embed.addField('Stats', 'notJust is on ' + servers + ' servers, which contain ' + channels + ' channels, and ' + users + ' users.', false)
        embed.addField('Invite', 'notJust is currently private as it is not finished and may be buggy.', false)
        embed.addField('Description', 'notJust is a state-of-the-art bot made by dotJS. It has modules which include fun commands, moderation commands, and more.', false)
        embed.addField('Contributors', 'notJust couldn\'t have been built without the assistance of Vlad, so thanks for all his help.', false)
      message.channel.send({ embed })
    return true
  }
}

module.exports = aboutCommand
