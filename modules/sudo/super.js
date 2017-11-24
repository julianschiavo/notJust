const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class spCommand extends Command {
  constructor() {
    super({
      name: 'super',
      help: 'Create invites till a special one is found'
    })
  }

  hasPermission(message) {
   if (message.guild && message.guild.id == '268970339948691456' && message.author.id == '193908323911860224') return true
    return false
  }

  async run(message, args, api) {
  console.log('Loop started')
  
    var user = message.guild.member(message.author);
   var chan = message.guild.channels.find('name', 'welcome')
   var inv = await chan.createInvite({maxAge:0,unique:true},'Invite Generator')
      if (inv.toString().indexOf('js') > -1 || inv.toString().indexOf('dot') > -1) {
      return chan.send('Invite generated, loop stopped.')
      } else {
      inv.delete()
      }
     





    return true
  }
}

module.exports = spCommand
