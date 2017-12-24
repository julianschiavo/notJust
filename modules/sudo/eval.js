const Discord = require('discord.js')
const Command = require('../../cmdModule/commands').Command
const paste = require("better-pastebin")
paste.setDevKey("e7dfc6a968006ffa783f9cb21ec8c0d7")

function sendResultEmbed(result, input, message) {
  if (typeof(result) == "undefined") {
    var oinput = "```js\n" + input + "```"
    var ooutput = "```No Output.```"
    const embed = new Discord.RichEmbed()
      .setColor("#ffff00")
      .setTitle("<:null:330712178342625280> `No output was returned.`")
      .setDescription(String.fromCharCode(8203))
      .setFooter('Replying to ' + message.author.tag)
      .addField(":inbox_tray: `Input`",
        oinput)
      .addField(":outbox_tray: `Output`",
        ooutput)
    message.channel.send({
      embed
    });
  } else {
    var ginput = "```js\n" + input + "```"
    var goutput = "```" + result + "```"
    const embed = new Discord.RichEmbed()
      .setColor("#00ff00")
      .setTitle("<:apple_pencil_paper:359560552701231106> `Code Evaluated`")
      .setDescription(String.fromCharCode(8203))
      .setFooter('Replying to ' + message.author.tag)
      .addField(":inbox_tray: `Input`",
        ginput)
      .addField(":outbox_tray: `Output`",
        goutput)
    message.channel.send({
      embed
    });
  }
}


class EvalCommand extends Command {
  constructor() {
    super({
      name: 'eval',
      help: 'Evaluate code',
      lhelp: '{code}\n{code} is the Discord.js code to run/evaluate.'
    })
  }

  hasPermission(message) {
    if (message.author.id == require('../../config.json').owner) return true
    return false
  }

  async run(message, args, api) {
    paste.login("e7dfc6a968006ffa783f9cb21ec8c0d7", "e7dfc6a968006ffa783f9cb21ec8c0d7", function(success, data) {
      if (!success) {
        console.error(new Error("Failed to log in to Pastebin"))
        process.exit(1);
      }
      args.splice(0, 1)

      /*var code = args.join(' ');
    code = api.clean(code)
    try {
      var evaled = eval(code);
      if (typeof evaled !== 'string') {
        evaled = require('util').inspect(evaled);
      }
      api.evalembed("#00ff00", "👌 `Evaluation Finished`", "🔼 Input:", "```xl\n" + code + "\n```", "🔽 Output:", "```js\n" + api.clean(evaled) + "\n```")
    } catch (err) {
      api.error(api.clean(err))
    }
  }*/

      var msg = message.content.split(' ').slice(1)

      if (msg.startsWith("http://pastebin.com/") || msg.startsWith("https://pastebin.com/")) {
        var origMsg = msg
        msg = msg.replace(/http:\/\//gi, "")
        msg = msg.replace(/https:\/\//gi, "")
        msg = msg.replace(/www./gi, "")
        msg = msg.replace(/pastebin.com\//gi, "")
        msg = msg.replace(/raw\//gi, "")

        pastebin
          .getPaste(msg)
          .then(data => {
            try {
              var result = eval(data)

              if (result.length > 1024) {
                pastebin
                  .createPaste(result, "evalBot")
                  .then(data => {
                    sendResultEmbed(`https://pastebin.com/raw/${data}`, origMsg, message)
                  })
                  .fail(err => {
                    var einput = "```js\n" + origMsg + "```"
                    var eoutput = "```" + err + "```"
                    const embed = new Discord.RichEmbed()
                      .setColor("#ff0000")
                      .setDescription(String.fromCharCode(8203))
                      .setFooter('Replying to ' + message.author.tag)
                      .setTitle("<:red_tick:330712188681453590> `An Error Occurred.`")
                      .addField(":inbox_tray: `Input`",
                        einput)
                      .addField("<:apple_symbol_no_entry_sign:359559750012108800> `Error`",
                        eoutput)

                    message.channel.send({
                      embed
                    });
                  })
              } else {
                sendResultEmbed(result, origMsg, message)
              }
            } catch (e) {
              var einput = "```js\n" + origMsg + "```"
              var eoutput = "```" + e + "```"
              const embed = new Discord.RichEmbed()
                .setColor("#ff0000")
                .setDescription(String.fromCharCode(8203))
                .setFooter('Replying to ' + message.author.tag)
                .setTitle("<:red_tick:330712188681453590> `An Error Occurred.`")
                .addField(":inbox_tray: `Input`",
                  einput)
                .addField("<:apple_symbol_no_entry_sign:359559750012108800> `Error`",
                  eoutput)

              message.channel.send({
                embed
              });
            }
          })
          .fail(err => {
            var einput = "```js\n" + origMsg + "```"
            var eoutput = "```" + err + "```"
            const embed = new Discord.RichEmbed()
              .setColor("#ff0000")
              .setDescription(String.fromCharCode(8203))
              .setFooter('Replying to ' + message.author.tag)
              .setTitle("<:red_tick:330712188681453590> `An Error Occurred.`")
              .addField(":inbox_tray: `Input`",
                einput)
              .addField("<:apple_symbol_no_entry_sign:359559750012108800> `Error`",
                eoutput)
            message.channel.send({
              embed
            });
          })
      } else {
        msg = msg.replace(/```js/gi, "")
        msg = msg.replace(/```/gi, "")

        try {
          var result = eval(msg)

          sendResultEmbed(result, msg, message)
        } catch (e) {
          var einput = "```js\n" + msg + "```"
          var eoutput = "```" + e + "```"
          const embed = new Discord.RichEmbed()
            .setColor("#ff0000")
            .setDescription(String.fromCharCode(8203))
            .setFooter('Replying to ' + message.author.tag)
            .setTitle("<:red_tick:330712188681453590> `An Error Occurred.`")
            .addField(":inbox_tray: `Input`",
              einput)
            .addField("<:apple_symbol_no_entry_sign:359559750012108800> `Error`",
              eoutput)
          message.channel.send({
            embed
          });
        }
      }









    });
  }






}


module.exports = EvalCommand
