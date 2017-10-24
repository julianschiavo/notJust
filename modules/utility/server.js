const Discord = require('discord.js')
const Command = require('../../cmdModule/commands').Command

class serverCommand extends Command {
  constructor() {
    super({
      name: 'server',
      help: 'Get information about the server'
    })
  }
  hasPermission(message) {
    return true  
    if (message.channel.type !== 'text') return false
  }

  async run(message, args, api) {
    var channels = message.guild.channels.size
    var users    = message.guild.memberCount
    var roles    = message.guild.roles.size
    var emojis   = message.guild.emojis.size
    var name     = message.guild.name
    var owner    = message.guild.owner.tag
    //let online   = this.client.users.filter(u => u.status != "offline").length;
    let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_symbol_info:359559750096257024> `About ' + name + '`')
      embed.setColor('#00ff00')
    embed.setFooter('Replying to ' + message.author.tag)
        embed.setDescription(String.fromCharCode(8203))
        embed.addField('`Owner`', owner, false)
        embed.addField('`Channels`', channels, true)
        embed.addField('`Emojis`', emojis, true)
        embed.addField('`Members`', users, true)
        embed.addField('`Roles`', roles, true)
        
        
        /*embed.addField('`Invite`', 'notJust is currently private as it is not finished and may be buggy.', false)
        embed.addField('`Description`', 'notJust is a state-of-the-art bot made by dotJS. It has modules which include fun commands, moderation commands, and more.', false)
        embed.addField('`Contributors`', 'notJust couldn\'t have been built without the assistance of Vlad, so thanks for all his help.', false)*/
      message.channel.send({ embed })
    return true
  }
}

module.exports = serverCommand
