const config = require('../config.json')
const ta = require('../timeago.js')
const Discord = require('discord.js')

exports.run = (reaction, user) => {
  var role
  var given
  if (reaction.message.id == '405912702855282698') {
    if (reaction.emoji.id == '405909843098992650') {
      role = reaction.message.guild.roles.get('384675152400482304')
    } else if (reaction.emoji.id == '405911142012026891') {
      role = reaction.message.guild.roles.get('404981161241214977')
    }
    if (user.hasRole(role)) {
      user.removeRole(role)
      given = ' You have left @'
    } else {
      user.addRole(role)
      given = ' You have joined @'
    }
    user.send(reaction.emoji.toString() + given + role.name + '.')
  }
}
