const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class startCommand extends Command {
  constructor() {
    super({
      name: 'start',
      help: 'Start inviting members to earn gold bars'/*,
      lhelp: '{user} {amount}\n{user} is the ID or ping of the user\n{amount} is the amount of gold bars'*/
    })
  }

  hasPermission(message) {
   if (message.guild && message.guild.id == '268970339948691456') return true
    return false
  }

  async run(message, args, api) {
    
    var user = message.guild.member(message.author);
    if (!message.client.currency.get(user.id)) {
      var curr = {
      amount: 0,
      invite: false
      }
      message.client.currency.set(user.id, curr);
    }
    if ((message.client.currency.get(user.id).invite == true) && user.id !== '193908323911860224') {
      api.error('You have already created an invite. Find it in <#383422802407194625>.')
      return
    } else {
      var curr = message.client.currency.get(user.id)
      curr.invite = true
      message.client.currency.set(user.id,curr)
    }
    
    
    var chan = message.guild.channels.find('name', 'welcome')
    var chan2 = message.guild.channels.find('name', 'invites')
    var inv = await chan.createInvite({maxAge:0,unique:true},'Gold Bar Invite for ' + message.author.tag)
    
    chan2.send('<:gold:383074743089364992> Created **Gold Bar Invite** `' + inv.replace('https://discord.gg/', '') + '` for `' + message.author.tag + '`')

      let embed = new Discord.RichEmbed()
      embed.setTitle('<:gold:383074743089364992> `Gold Bar Invite Created`')
   embed.addField('User', message.author.tag, true)
   embed.addField('Invite', inv.toString(), true)
    
      embed.setColor('#00ff00')
      embed.setFooter('Replying to ' + message.author.tag)
      embed.setDescription(String.fromCharCode(8203))
      message.channel.send({
        embed
      })






    return true
  }
}

module.exports = startCommand
