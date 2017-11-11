const Discord = require('discord.js');

const Command = require('../../cmdModule/commands').Command

class wlCommand extends Command {
  constructor() {
    super({
      name: 'whitelist',
      help: 'Whitelist a server or user',
      lhelp: '{id}\n{id} is ID of the user or server to whitelist'
    })
  }

  hasPermission(message) {
    if (message.author.id == require('../../config.json').owner) return true
    return false
  }

  async run(message, args, api) {
    if (!args[1]) {
      api.error('Please specify a user or server ID to whitelist.')
      return
    }

    function isN(num) {
      return !isNaN(num)
    }

    function countWords(str) {
      return str.split(" ").length;
    }
    if (!isN(args[1])) {
      api.error('Please specify an all numeric user or server ID.')
      return
    }

    
    if (message.client.users.get(args[1])) {
    var user = message.client.users.get(args[1])
    var current = message.client.settings.get('global')

for (var i=current.blacklistedUsers.length-1; i>=0; i--) {
    if (current.blacklistedUsers[i] === user.id) {
        current.blacklistedUsers.splice(i, 1);
        //break;       //<-- Uncomment  if only the first term has to be removed
    }
}
      
    message.client.settings.set('global', current);
    
    let embed = new Discord.RichEmbed()
    embed.setTitle('<:apple_hand_wave:359559674099400704> `Whitelisted ' + user.tag + '!`')
    embed.setDescription(String.fromCharCode(8203))
    embed.setColor('#00ff00')
    //embed.setTimestamp()
    embed.setFooter('Replying to ' + message.author.tag)

    message.channel.send({
      embed
    })
    } else {
      var guild = message.client.guilds.get(args[1])
    var gid
    if (guild) {
      gid = guild.id
    } else {
      gid = args[1]
    }
      if (!message.client.settings.get(gid)) {
      message.client.settings.set(gid, message.client.defaultSettings);
    }
    

    const thisConf = message.client.settings.get(gid);
    thisConf.isBlacklisted = false;
    message.client.settings.set(gid, thisConf);

    let embed = new Discord.RichEmbed()
    if (guild) {
      embed.setTitle('<:apple_hand_wave:359559674099400704> `Whitelisted ' + guild.name + '!`')
    } else {
      embed.setTitle('<:apple_hand_wave:359559674099400704> `Whitelisted ' + gid + '!`')
    }
    embed.setDescription(String.fromCharCode(8203))
    embed.setColor('#00ff00')
    //embed.setTimestamp()
    embed.setFooter('Replying to ' + message.author.tag)

    message.channel.send({
      embed
    })
    }
      
    return true
  }
}

module.exports = wlCommand
