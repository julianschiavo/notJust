const Discord = require('discord.js');

const Command = require('../../cmdModule/commands').Command

class enCommand extends Command {
  constructor() {
    super({
      name: 'enable',
      help: 'Enable a disabled module',
      lhelp: '{name}\n{name} is the code name of the module to enable'
    })
  }

  hasPermission(message) {
    if (message.author.id == require('../../config.json').owner) return true
    return false
  }

  async run(message, args, api) {
    if (!args[1]) {
      api.error('Please specify a module name to enable.')
      return
    }
    var module = args[1].toLowerCase()

    const conf = message.client.settings.get('global');
    for (var i=conf.disabledModules.length-1; i>=0; i--) {
    if (conf.disabledModules[i] === module) {
        conf.disabledModules.splice(i, 1);
    }
}
    message.client.settings.set('global', conf);

    let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_hammer:359560554479878144> `Enabled ' + module + '`')
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

module.exports = enCommand
