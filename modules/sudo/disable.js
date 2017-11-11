const Discord = require('discord.js');

const Command = require('../../cmdModule/commands').Command

class diCommand extends Command {
  constructor() {
    super({
      name: 'disable',
      help: 'Disable a module globally',
      lhelp: '{name}\n{name} is the code name of the module to disable'
    })
  }

  hasPermission(message) {
    if (message.author.id == require('../../config.json').owner) return true
    return false
  }

  async run(message, args, api) {
    if (!args[1]) {
      api.error('Please specify a module name to disable.')
      return
    }
    var module = args[1].toLowerCase()
    if (module.indexOf('sudo') > -1) {
    api.error('You cannot disable the Sudo module, as that would make it impossible to run this command.')
      return
    }

    const conf = message.client.settings.get('global');
    conf.disabledModules.push(module)
    message.client.settings.set('global', conf);

    let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_hammer:359560554479878144> `Disabled ' + module + '`')
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

module.exports = diCommand
