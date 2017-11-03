const Discord = require('discord.js');

const Command = require('../../cmdModule/commands').Command

class currCommand extends Command {
  constructor() {
    super({
      name: 'show',
      help: 'Show server preferences'
    })
  }

  hasPermission(message) {
    if ((message.guild && message.guild.member(message.author).hasPermission("KICK_MEMBERS")) || message.author.id == require('../../config.json').owner) return true
    //if (message.author.id == message.guild.ownerID) return true
    return false
  }

  async run(message, args, api) {

    if (!message.client.settings.get(message.guild.id)) {
      // Adding a new row to the collection uses `set(key, value)`
      message.client.settings.set(message.guild.id, message.client.defaultSettings);
    }
    if (!args[1]) {
      const thisConf = message.client.settings.get(message.guild.id);
      var muteRole = thisConf.muteRole
      muteRole = message.guild.roles.find("name", muteRole)
      var rmuteRole = muteRole

      var logChannel = thisConf.logChannel
      logChannel = message.guild.channels.find("name", logChannel)
      var rlogChannel = logChannel

      var selfroles = JSON.stringify(thisConf.selfRoles)
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_pencil_paper:359560552701231106> `Current Preferences`')
      embed.addField('`Mute Role` (muteRole)', rmuteRole, false)
      embed.addField('`Self Roles` (selfRoles)', selfroles, false)
      embed.addField('`Log Channel` (logChannel)', rlogChannel, false)

      embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      //embed.setTimestamp()
      embed.setFooter('Replying to ' + message.author.tag)

      message.channel.send({
        embed
      })
    } else if (message.author.id == require('../../config.json').owner) {
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

      let embed = new Discord.RichEmbed()
      if (guild) {
        embed.setTitle('<:apple_pencil_paper:359560552701231106> `Preferences for ' + guild.name + '`')
      } else {
        embed.setTitle('<:apple_pencil_paper:359560552701231106> `Preferences for ' + gid + '`')
      }
      embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      //embed.setTimestamp()
      embed.addField('`Raw List`', JSON.stringify(thisConf, null, 4), false)
      embed.setFooter('Replying to ' + message.author.tag)

      message.channel.send({
        embed
      })

    }



    return true
  }
}

module.exports = currCommand