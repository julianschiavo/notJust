const Discord = require('discord.js');

const Command = require('../../cmdModule/commands').Command

class blCommand extends Command {
  constructor() {
    super({
      name: 'blacklist',
      help: 'Blacklist a server or user',
      lhelp: '{id}\n{id} is ID of the user or server to blacklist'
    })
  }

  hasPermission(message) {
    if (message.author.id == require('../../config.json').owner) return true
    return false
  }

  async run(message, args, api) {
    if (!args[1]) {
      api.error('Please specify a user or server ID to blacklist.')
    }

    function isN(num) {
      return !isNaN(num)
    }

    function countWords(str) {
      return str.split(" ").length;
    }
    if (!isN(args[1])) {
      api.error('Please specify an all numeric user or server ID.')
    }
    if (message.client.guilds.get(args[1])) {
    var guild = message.client.guilds.get(args[1])
    var gid
    if (guild) {
      gid = guild.id
      guild.leave()
    } else {
      gid = args[1]
    }

    if (!message.client.settings.get(gid)) {
      message.client.settings.set(gid, message.client.defaultSettings);
    }

    const thisConf = message.client.settings.get(gid);
    thisConf.isBlacklisted = true;
    message.client.settings.set(gid, thisConf);

    let embed = new Discord.RichEmbed()
    if (guild) {
      embed.setTitle('<:apple_hammer:359560554479878144> `Blacklisted and Left ' + guild.name + '!`')
    } else {
      embed.setTitle('<:apple_hammer:359560554479878144> `Blacklisted ' + gid + '!`')
    }
    embed.setDescription(String.fromCharCode(8203))
    embed.setColor('#00ff00')
    //embed.setTimestamp()
    embed.setFooter('Replying to ' + message.author.tag)

    message.channel.send({
      embed
    })
  } else if (message.client.users.get(args[1])) {
    var user = message.client.users.get(args[1])
    var current = message.client.settings.get('global')
    current.blacklistedUsers.push(user.id)
    message.client.settings.set('global', current);
    
    let embed = new Discord.RichEmbed()
    embed.setTitle('<:apple_hammer:359560554479878144> `Blacklisted ' + user.tag + '!`')
    embed.setDescription(String.fromCharCode(8203))
    embed.setColor('#00ff00')
    //embed.setTimestamp()
    embed.setFooter('Replying to ' + message.author.tag)

    message.channel.send({
      embed
    })
    
  } else {
    api.error('User/server could not be found. Remember that if you are blacklisting a user, he must be in one of the bot\'s servers.')
  }
    return true
  }
}

module.exports = blCommand
