const Command = require('../../cmdModule/commands').Command
const Discord = require('discord.js')
var _ = require('lodash')
_.mixin(({
  'sortByKeys': (object, cb) => {
    const keys = Object.keys(object)
    const sortedKeys = _.sortBy(keys, cb)

    return _.fromPairs(
      _.map(sortedKeys, key => [key, object[key]])
    )
  }
}))
class HelpCommand extends Command {
  constructor() {
    super({
      name: 'help',
      help: 'Give available commands'
    })
  }
  async run(message, args, api) {
    message.delete()
    let dotcolor = [245, 236, 71]
    if (args.length == 1) {
      let order = ['admin', 'fun', 'media', 'misc', 'prefs', 'utility', 'sudo', 'light']
      let modulesio = {}
      let modules = {}
      let moduleEmbeds = []
      for (let _cmd in api.handler.commands) {
        if (!api.handler.commands.hasOwnProperty(_cmd)) continue
        let cmd = api.handler.commands[_cmd]
        modules[cmd.module] = modules[cmd.module] || []
        modules[cmd.module].push(cmd.command)
      }
      modulesio = _.sortByKeys(modules, (key) => {
        let i = _.indexOf(order, key)
        if (i == -1)
          i = order.length++
        return i
      })
      for (let mod in modulesio) {
        if (!modulesio.hasOwnProperty(mod)) continue
        let commands = modulesio[mod]
        let embed = new Discord.RichEmbed()
        embed.setColor(dotcolor)
        embed.setTitle(`<:apple_symbol_info:359559750096257024> \`${api.handler.modules[mod] ? api.handler.modules[mod] : mod}\``)
        var name = api.handler.modules[mod] ? api.handler.modules[mod] : mod
        if (name == '#code') {
          continue
        }
        var oneCommand = false
        for (let _cmd in commands) {
          if (!commands.hasOwnProperty(_cmd)) continue
          let cmd = commands[_cmd]
          if (!cmd.hasPermission(message)) continue
          oneCommand = true
          embed.addField(`${api.handler.prefix}${cmd.name}`, cmd.help, true)
        }
        if (!oneCommand) continue
        //moduleEmbeds[mod] = await message.channel.send({ embed })
        if (message.channel.type == 'text') {
          if (message.channel.id == '342611254193553408') {
            moduleEmbeds[mod] = await message.channel.send({ embed })
          } else {
            moduleEmbeds[mod] = await message.author.send({ embed })
          }
        } else {
          moduleEmbeds[mod] = await message.author.send({ embed })
        }
      }
    } else {
      for (let _cmd in api.handler.commands) {
        if(!api.handler.commands.hasOwnProperty(_cmd)) continue
        let cmd = api.handler.commands[_cmd]
        let command = cmd.command
        if (command.name == args[1]) {
          let embed = new Discord.RichEmbed()
          embed.setColor(dotcolor)
          embed.setTitle(`<:apple_symbol_info:359559750096257024> \`${api.handler.prefix}${command.name}\``)
          if (command.lhelp == ' ' || command.lhelp == command.help) {
            embed.setDescription(command.help)
          } else {
            embed.setDescription(`${command.help}\n\n${api.handler.prefix}${command.name} ${command.lhelp}`)
          }
          //return message.channel.send({embed})
          if (message.channel.type == 'text') {
          if (message.channel.id == '342611254193553408') {
            return message.channel.send({ embed })
          } else {
            return message.author.send({ embed })
          }
        } else {
          return message.author.send({ embed })
        }
        }
      }
    }
  }
  /*async shit(message, args, api) {
    let modules = {}
    let modulesTxt = {}
    for (let _cmd in api.handler.commands) {
      if (!api.handler.commands.hasOwnProperty(_cmd)) continue
      let cmd = api.handler.commands[_cmd]
      let command = cmd.command
      modules[cmd.module] = modules[cmd.module] || []
      modulesTxt[cmd.module] = modulesTxt[cmd.module] || ''
      modules[cmd.module].push(command)
    }
    if (args.length == 1) {
      var i = 0
      var max = modules.length
      var oneembed //fun
      var twoembed //music
      var threeembed //misc
      var fourembed //mod
      var fiveembed //admin
      var sixembed //sudo
      var sevenembed //old
      var eightembed //moree
      console.log(max)
      for (let _mod in modules) {
        i = i++;
        if (!modules.hasOwnProperty(_mod)) continue
        let mod = modules[_mod]
        //if (api.handler.modules[_mod] == "Old") return
        var embed = new Discord.RichEmbed()
        embed.setTitle("ℹ `" + api.handler.modules[_mod] + "`")
        embed.setColor([245, 236, 71])
        //embed.setTimestamp()
        if (i == max) {
          embed.setFooter("Replying To: " + message.author.tag)
        }
        var one = false;
        for (let _cmd in mod) {
          if (!mod.hasOwnProperty(_cmd)) continue
          let command = mod[_cmd]
          if (!command.hasPermission(message)) continue
          one = true
          embed.addField(`${api.handler.prefix}${command.name}`, command.help, true)
        }
        if (one) {
          if (api.handler.modules[_mod] == "Fun") {
            oneembed = { embed }
          } else if (api.handler.modules[_mod] == "Music") {
            twoembed = { embed }
          } else if (api.handler.modules[_mod] == "Miscellaneous") {
            threeembed = { embed }
          } else if (api.handler.modules[_mod] == "Moderation") {
            fourembed = { embed }
          } else if (api.handler.modules[_mod] == "Administration") {
            fiveembed = { embed }
          } else if (api.handler.modules[_mod] == "Sudo") {
            sixembed = { embed }
          } else if (api.handler.modules[_mod] == "Old") {
            sevenembed = { embed }
          } else if (api.handler.modules[_mod] == "Put_A_Module_Name_Here") {
            eightembed = { embed }
          }
          //message.channel.send({embed})
          embed = undefined
        } else {
          embed = undefined
        }
      }
      if (sevenembed !== null) {
        message.channel.send(sevenembed)
      }
      if (oneembed) {
        message.channel.send(oneembed)
      }
      if (twoembed !== null) {
        message.channel.send(twoembed)
      }
      if (threeembed !== null) {
        message.channel.send(threeembed)
      }
      if (fourembed !== null) {
        message.channel.send(fourembed)
      }
      if (fiveembed !== null) {
        message.channel.send(fiveembed)
      }
      if (sixembed !== null) {
        message.channel.send(sixembed)
      }
      if (eightembed !== null) {
        message.channel.send(eightembed)
      }
      return true
    } else {
      for (let _mod in modules) {
        i = i++
        if (!modules.hasOwnProperty(_mod)) continue;
        let mod = modules[_mod]
        var one = false
        var embed = new Discord.RichEmbed()
        for (let _cmd in mod) {
          if (!mod.hasOwnProperty(_cmd)) continue;
          let command = mod[_cmd]
          if (!command.hasPermission(message)) continue;
          var argtouse = args[1]
          if (command.name == argtouse) {
            one = true
            embed.setTitle("ℹ `" + api.handler.prefix + command.name + "`")
            embed.setColor([245, 236, 71])
            embed.setFooter("Replying To: " + message.author.tag)
            if (command.lhelp == " " || command.lhelp == command.help) {
              embed.setDescription(command.help)
            } else {
              embed.setDescription(command.help + "\n\n" + api.handler.prefix + command.name + " " + command.lhelp)
            }
          }
        }
        if (one) {
          message.channel.send({
            embed
          })
          embed = undefined
        } else {
          embed = undefined
        }
      }
      return true;
    }
  }*/
}

module.exports = HelpCommand
