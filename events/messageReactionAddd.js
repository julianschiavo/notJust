const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (reaction, user) => {
  console.log('new reacrion')
  var role
  var given
  if (reaction.message.id == '405912702855282698') {
    console.log('valid reacrion')
    if (reaction.emoji.id == '405909843098992650') {
      role = reaction.message.guild.roles.get('384675152400482304')
      console.log('new ping reaction')
    } else if (reaction.emoji.id == '405911142012026891') {
      role = reaction.message.guild.roles.get('404981161241214977')
      console.log('new pingo reacrion')
    }
    if (user.hasRole(role)) {
      user.removeRole(role)
      given = ' You have left @'
    } else {
      user.addRole(role)
      given = ' You have joined @'
    }
    console.log('new reacrion done')
    user.send(reaction.emoji.toString() + given + role.name + '.')
  }
}
