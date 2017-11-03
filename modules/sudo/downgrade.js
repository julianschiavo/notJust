const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class downCommand extends Command {
  constructor() {
    super({
      name: 'downgrade',
      help: 'Downgrade a server',
      lhelp: '{server_id}\n{server_id} is ID of the server to downgrade'
    })
  }

  hasPermission(message) {
    if (message.author.id == require('../../config.json').owner) return true
    return false
  }

  async run(message, args, api) {
    if (!args[1]) {
      api.error('Please specify a guild id to downgrade.')
    }

    function isN(num) {
      return !isNaN(num)
    }

    function countWords(str) {
      return str.split(" ").length;
    }
    if (!isN(args[1])) {
      api.error('Please specify an all numeric guild id.')
    }
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
    thisConf.isDonator = false;
    message.client.settings.set(gid, thisConf);

    let embed = new Discord.RichEmbed()
    if (guild) {
      embed.setTitle('<:apple_arrow_down_small:359559750238601216> `Downgraded ' + guild.name + '!`')
    } else {
      embed.setTitle('<:apple_arrow_down_small:359559750238601216> `Downgraded ' + gid + '!`')
    }
    embed.setDescription(String.fromCharCode(8203))
    embed.setColor('#00ff00')
    //embed.setTimestamp()
    embed.setFooter('Replying to ' + message.author.tag)

    message.channel.send({
      embed
    })
    return true
  }
}

module.exports = downCommand