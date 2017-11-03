const Discord = require('discord.js');

const Command = require('../../cmdModule/commands').Command

class reloadCommand extends Command {
  constructor() {
    super({
      name: 'reload',
      help: 'Reload a command',
      lhelp: '{module_folder} {command}\n{module_folder} is the name of the folder for the module for the command to be reloaded\n{command} is the command to reload'
    })
  }

  hasPermission(message) {
    if (message.author.id == require('../../config.json').owner) return true
    return false
  }

  async run(message, args, api) {

    if (!message.client.settings.get(message.guild.id)) {
      // Adding a new row to the collection uses `set(key, value)`
      message.client.settings.set(message.guild.id, message.client.defaultSettings);
    }

    if (!args[1] || !args[2]) {
      api.error('Please specify a module folder and command')
    }
    var mn = args[1]
    var cn = args[2]
    delete require.cache[require.resolve('../' + mn + '/' + cn + '.js')];
    //message.reply(`The command ${args[0]} has been reloaded`);
    let embed = new Discord.RichEmbed()
    embed.setTitle('<:green_tick:330712173288488960> `' + cn + ' Reloaded`')
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

module.exports = reloadCommand