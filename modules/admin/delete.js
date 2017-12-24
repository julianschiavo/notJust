const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class deleteCommand extends Command {
  constructor() {
    super({
      name: 'delete',
      help: 'Delete messages',
      lhelp: '{count} [user]\n{count} is the number of messages to delete (2-100)\n[user] is a user\'s mention/ID to only delete their messages'
    })
  }

  hasPermission(message) {
    //if (message.author.id == require('../../config.json').owner) return true
    if (message.guild && message.guild.member(message.author).hasPermission("MANAGE_MESSAGES") && message.guild.member('329772339967426560').hasPermission("MANAGE_MESSAGES")) return true
    return false
  }

  async run(message, args, api) {
    args.splice(0, 1)
    if (!args[0]) {
      return api.error('Please specify how many messages to purge.')
    }
    const deleteCount = parseInt(args[0], 10);
    if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
      return api.error("Please provide a number between 2 and 100 for the number of messages to delete.");
    }
    if (!args[1]) {
      message.channel.bulkDelete(deleteCount).then(promise => success()).catch(err => {
        api.error(err)
      })
      function success() {
        let embed = new Discord.RichEmbed()
        embed.setTitle('<:apple_trash:359560553699475456> `Messages Deleted Successfully`')
        embed.addField('Count',deleteCount,false)
        embed.setDescription(String.fromCharCode(8203))
        embed.setColor('#00ff00')
        //embed.setTimestamp()
        embed.setFooter('Replying to ' + message.author.tag)
        message.channel.send({
          embed
        })
      }
    } else {
      var user = api.getUser(args[1], 'user')
      var fetched = await message.channel.fetchMessages({
      count: deleteCount
      });
      fetched = fetched.filter(m => m.author.id == user.id);
      message.channel.bulkDelete(fetched).then(promise => success2()).catch(err => {
        api.error(err)
      })
      function success2() {
        let embed = new Discord.RichEmbed()
        embed.setTitle('<:apple_trash:359560553699475456> `Messages Deleted Successfully`')
        embed.addField('Count',deleteCount,true)
        embed.addField('User','`'+user.tag+'`', true)
        embed.setDescription(String.fromCharCode(8203))
        embed.setColor('#00ff00')
        //embed.setTimestamp()
        embed.setFooter('Replying to ' + message.author.tag)
        message.channel.send({
          embed
        })
      }
    }
    return true
  }
}

module.exports = deleteCommand
