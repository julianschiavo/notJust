const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command
const shop = require('../../shop.json')

class shopCommand extends Command {
  constructor() {
    super({
      name: 'shop',
      help: 'View the gold bar shop'
    })
  }

  hasPermission(message) {
   if (message.guild && message.guild.id == '268970339948691456') return true
    return false
  }

  async run(message, args, api) {
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:goldbar:383480100282171392> `Shop Listing`')
      embed.setColor('#00ff00')
      //embed.setFooter('Replying to ' + message.author.tag)
      message.channel.send({
        embed
      })
      for (var i = 0; i < Object.keys(shop).length; i++) {
        var item = shop[Object.keys(shop)]
              let embed = new Discord.RichEmbed()
      embed.setTitle('`' + item.name + '`')
       embed.addField('ID',item.id,false)
        embed.addField('Available',item.av,true)
        embed.addField('Cost',item.price,true)
      embed.setColor('#00ff00')
      embed.setDescription(item.description + '\n')
      message.channel.send({
        embed
      })
      }
    return true
  }
}

module.exports = shopCommand
