const Discord = require('discord.js');

const Command = require('../../cmdModule/commands').Command

class setCommand extends Command {
  constructor() {
    super({
      name: 'set',
      help: 'Set a preference',
      lhelp: '{name} {value}\n{name} is the preference name\n{value} is the value for the preference'
    })
  }

  hasPermission(message) {
    if (message.guild && message.author.id == message.guild.ownerID) return true
    return false
  }

  async run(message, args, api) {

    if (!message.client.settings.get(message.guild.id)) {
      // Adding a new row to the collection uses `set(key, value)`
      message.client.settings.set(message.guild.id, message.client.defaultSettings);
    }

    const thisConf = message.client.settings.get(message.guild.id);


    function countWords(str) {
      return str.split(" ").length;
    }

    function isN(num) {
      return !isNaN(num)
    }

    if (!args[1] || !args[2]) {
      api.error('Please specify a preference name and value.')
      return
    }
    var name = args[1].toLowerCase()
    var value = args[2]

    if (name == 'mute' || name == 'muterole' || name == 'mutedrole') {
      if (!isN(value)) {
        let role = message.guild.roles.find("name", value)
        if (role && countWords(role.name) == 1) {
          /* SET IT TO ROLE.NAME */
          thisConf.muteRole = role.name;
          message.client.settings.set(message.guild.id, thisConf);
          let embed = new Discord.RichEmbed()
          embed.setTitle('<:green_tick:330712173288488960> `Mute Role Set`')
          embed.addField('`Value`', role.name, false)
          embed.setDescription(String.fromCharCode(8203))
          embed.setColor('#00ff00')
          //embed.setTimestamp()
          embed.setFooter('Replying to ' + message.author.tag)

          message.channel.send({
            embed
          })
        } else {
          api.error('The specified mute role name is invalid. Try again, making sure it only contains one word.')
        }
      } else {
        let role = message.guild.roles.get(value)
        if (role && countWords(role.name) == 1) {
          /* SET IT TO ROLE.NAME */
          thisConf.muteRole = role.name;
          message.client.settings.set(message.guild.id, thisConf);
          let embed = new Discord.RichEmbed()
          embed.setTitle('<:green_tick:330712173288488960> `Mute Role Set`')
          embed.addField('`Value`', role.name, false)
          embed.setDescription(String.fromCharCode(8203))
          embed.setColor('#00ff00')
          //embed.setTimestamp()
          embed.setFooter('Replying to ' + message.author.tag)

          message.channel.send({
            embed
          })
        } else {
          api.error('The specified mute role ID is invalid. Try again, making sure the role name only contains one word.')
          return
        }
      }
    }









    if (name == 'log' || name == 'logs' || name == 'logchannel' || name == 'channel') {
      if (!isN(value)) {
        let channel = message.guild.channels.find("name", value)
        if (channel && countWords(channel.name) == 1) {
          /* SET IT TO CHANNEL.NAME */
          thisConf.logChannel = channel.name;
          message.client.settings.set(message.guild.id, thisConf);
          let embed = new Discord.RichEmbed()
          embed.setTitle('<:green_tick:330712173288488960> `Log Channel Set`')
          embed.addField('`Value`', channel.name, false)
          embed.setDescription(String.fromCharCode(8203))
          embed.setColor('#00ff00')
          //embed.setTimestamp()
          embed.setFooter('Replying to ' + message.author.tag)

          message.channel.send({
            embed
          })
        } else {
          api.error('The specified log channel name is invalid. Try again, making sure it doesn\'t contain spaces.')
          return
        }
      } else {
        let channel = message.guild.channels.get(value)
        if (channel && countWords(channel.name) == 1) {
          /* SET IT TO CHANNEL.NAME */
          thisConf.logChannel = channel.name;
          message.client.settings.set(message.guild.id, thisConf);
          let embed = new Discord.RichEmbed()
          embed.setTitle('<:green_tick:330712173288488960> `Log Channel Set`')
          embed.addField('`Value`', channel.name, false)
          embed.setDescription(String.fromCharCode(8203))
          embed.setColor('#00ff00')
          //embed.setTimestamp()
          embed.setFooter('Replying to ' + message.author.tag)

          message.channel.send({
            embed
          })
        } else {
          api.error('The specified log channel ID is invalid. Try again, making sure the channel name doesn\'t contain spaces.')
          return
        }
      }
    }


    if (name == 'roles' || name == 'selfroles' || name == 'self' || name == 'group' || name == 'joinroles') {
      if (!isN(value)) {
        let role = message.guild.roles.find("name", value)
        if (role && countWords(role.name) == 1) {
          /* SET IT TO ROLE.NAME */
          var check = thisConf.selfRoles.includes(role.id)
          if (check == true) {
            var index = thisConf.selfRoles.indexOf(role.id);
            if (index > -1) {
              thisConf.selfRoles.splice(index, 1);
            }
            message.client.settings.set(message.guild.id, thisConf);
            let embed = new Discord.RichEmbed()
            embed.setTitle('<:green_tick:330712173288488960> `Self Role Removed`')
            embed.addField('`Role`', role.name, false)
            embed.setDescription(String.fromCharCode(8203))
            embed.setColor('#00ff00')
            //embed.setTimestamp()
            embed.setFooter('Replying to ' + message.author.tag)

            message.channel.send({
              embed
            })
          } else {
            thisConf.selfRoles.push(role.id)
            message.client.settings.set(message.guild.id, thisConf);
            let embed = new Discord.RichEmbed()
            embed.setTitle('<:green_tick:330712173288488960> `Self Role Added`')
            embed.addField('`Role`', role.name, false)
            embed.setDescription(String.fromCharCode(8203))
            embed.setColor('#00ff00')
            //embed.setTimestamp()
            embed.setFooter('Replying to ' + message.author.tag)

            message.channel.send({
              embed
            })
          }
        } else {
          api.error('The specified self role name is invalid. Try again, making sure it doesn\'t contain spaces.')
          return
        }
      } else {
        let role = message.guild.roles.get(value)
        if (role && countWords(role.name) == 1) {
          var check = thisConf.selfRoles.includes(role.id)
          if (check == true) {
            var index = thisConf.selfRoles.indexOf(role.id);
            if (index > -1) {
              thisConf.selfRoles.splice(index, 1);
            }
            message.client.settings.set(message.guild.id, thisConf);
            let embed = new Discord.RichEmbed()
            embed.setTitle('<:green_tick:330712173288488960> `Self Role Removed`')
            embed.addField('`Role`', role.name, false)
            embed.setDescription(String.fromCharCode(8203))
            embed.setColor('#00ff00')
            //embed.setTimestamp()
            embed.setFooter('Replying to ' + message.author.tag)

            message.channel.send({
              embed
            })
          } else {
            thisConf.selfRoles.push(role.id)
            message.client.settings.set(message.guild.id, thisConf);
            let embed = new Discord.RichEmbed()
            embed.setTitle('<:green_tick:330712173288488960> `Self Role Added`')
            embed.addField('`Role`', role.name, false)
            embed.setDescription(String.fromCharCode(8203))
            embed.setColor('#00ff00')
            //embed.setTimestamp()
            embed.setFooter('Replying to ' + message.author.tag)

            message.channel.send({
              embed
            })
          }
        } else {
          api.error('The specified self role ID is invalid. Try again, making sure the role\'s name doesn\'t contain spaces.')
          return
        }
      }
    }
    
    if (name == 'color' || name == 'colour' || name == 'colors' || name == 'colours' || name == 'colorroles') {
        let role = message.guild.roles.find("name", value)
        if (role && countWords(role.name) == 1) {
          /* SET IT TO ROLE.NAME */
          var check = thisConf.colorRoles.includes(role.id)
          if (check == true) {
            var index = thisConf.colorRoles.indexOf(role.id);
            if (index > -1) {
              thisConf.colorRoles.splice(index, 1);
            }
            message.client.settings.set(message.guild.id, thisConf);
            let embed = new Discord.RichEmbed()
            embed.setTitle('<:green_tick:330712173288488960> `Color Role Removed`')
            embed.addField('`Role`', role.name, false)
            embed.setDescription(String.fromCharCode(8203))
            embed.setColor('#00ff00')
            //embed.setTimestamp()
            embed.setFooter('Replying to ' + message.author.tag)

            message.channel.send({
              embed
            })
          } else {
            thisConf.colorRoles.push(role.id)
            message.client.settings.set(message.guild.id, thisConf);
            let embed = new Discord.RichEmbed()
            embed.setTitle('<:green_tick:330712173288488960> `Color Role Added`')
            embed.addField('`Role`', role.name, false)
            embed.setDescription(String.fromCharCode(8203))
            embed.setColor('#00ff00')
            //embed.setTimestamp()
            embed.setFooter('Replying to ' + message.author.tag)
            message.channel.send({
              embed
            })
          }
        } else {
          api.error('The specified color role name is invalid. Try again, making sure it doesn\'t contain spaces.')
          return
        }
    }







    return true
  }
}

module.exports = setCommand
