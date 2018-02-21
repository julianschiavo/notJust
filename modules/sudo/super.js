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
    
var number = 0;
while (number <= 100) {
  
  console.log('Generating invite....')
  
    var user = message.guild.member(message.author);
   var chan = message.guild.channels.find('name', 'welcome')
   var inv = await chan.createInvite({maxAge:0,unique:true},'Invite Generator')
   inv = inv.toString().replace("discord.gg","")
      if ((inv.indexOf('d') > -1 && inv.indexOf('i') > -1 && inv.indexOf('s') > -1 && inv.indexOf('g') > -1) || (inv.indexOf('d') > -1 && inv.indexOf('o') > -1 && inv.indexOf('t') > -1 && inv.indexOf('j') > -1 && inv.indexOf('s') > -1)) {
      return chan.send('Invite generated, loop stopped: ' + inv.toString())
      } else {
      inv.delete()
      }         
}
    chan.send('Loop Done')
    
    
     





    return true
  }
}

module.exports = spCommand
