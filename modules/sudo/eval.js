const Command = require('../../cmdModule/commands').Command
const paste = require("better-pastebin")
paste.setDevKey("e7dfc6a968006ffa783f9cb21ec8c0d7")

class EvalCommand extends Command {
  constructor() {
    super({
      name: 'eval',
      help: 'Evaluate some code',
      lhelp: '{code}\n{code} is the D.JS code to run/evaluate.'
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

			if (args.startsWith("http://pastebin.com/") || args.startsWith("https://pastebin.com/") || args.startsWith("pastebin.com/")) {
				var origMsg = args
				var msg = args.replace(/http:\/\//gi, "")
				msg = args.replace(/https:\/\//gi, "")
				msg = args.replace(/www./gi, "")
				msg = args.replace(/pastebin.com\//gi, "")
				msg = args.replace(/raw\//gi, "")

				paste.get(msg, (success, data) => {
					if (!success) {
						var einput = "```js\n" + origMsg + "```"
						var eoutput = "```" + "Pastebin error occured" + "```"
						const embed = new Discord.RichEmbed()
							.setColor("#ff0000")
							.setTimestamp()
							.addField("<:red_tick:330712188681453590> `An Error Occurred.`",
								"Check the console for more info.")
							.addBlankField(true)
							.addField(":inbox_tray: `Input`",
								einput)
							.addField("<:apple_symbol_no_entry_sign:359559750012108800> `Error`",
								eoutput)
						message.channel.send({
							embed
						});
					} else {
						try {
							var result = eval(data)

							if (result.length > 1024) {
								paste.create({
									contents: result
								}, (success, data) => {
									if (!success) {
										var einput = "```js\n" + origMsg + "```"
										var eoutput = "```" + "Pastebin error occured" + "```"
										const embed = new Discord.RichEmbed()
											.setColor("#ff0000")
											.setTimestamp()
											.addField("<:red_tick:330712188681453590> `An Error Occurred.`",
												"Check the console for more info.")
											.addBlankField(true)
											.addField(":inbox_tray: `Input`",
												einput)
											.addField("<:apple_symbol_no_entry_sign:359559750012108800> `Error`",
												eoutput)

										message.channel.send({
											embed
										});
									} else {
										sendResultEmbed(`${data}`, origMsg, message)
									}
								})
							} else {
								sendResultEmbed(result, origMsg, message)
							}
						} catch (e) {
							var einput = "```js\n" + origMsg + "```"
							var eoutput = "```" + e + "```"
							const embed = new Discord.RichEmbed()
								.setColor("#ff0000")
								.setTimestamp()
								.addField("<:red_tick:330712188681453590> `An Error Occurred.`",
									"Check the console for more info.")
								.addBlankField(true)
								.addField(":inbox_tray: `Input`",
									einput)
								.addField("<:apple_symbol_no_entry_sign:359559750012108800> `Error`",
									eoutput)

							message.channel.send({
								embed
							});
						}
					}
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
						.setTimestamp()
						.addField("<:red_tick:330712188681453590> `An Error Occurred.`",
							"Check the console for more info.")
						.addBlankField(true)
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


function sendResultEmbed(result, input, message) {
	if (typeof(result) == "undefined") {
		var oinput = "```js\n" + input + "```"
		var ooutput = "```No Output.```"
		const embed = new Discord.RichEmbed()
			.setColor("#ffff00")
			.setTimestamp()
			.addField("<:null:330712178342625280> `No output was returned.`",
				"Check the console for more info.")
			.addBlankField(true)
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
			.setTimestamp()
			.addField("<:green_tick:330712173288488960> `Execution Successful.`",
				"Check the console for more info.")
			.addBlankField(true)
			.addField(":inbox_tray: `Input`",
				ginput)
			.addField(":outbox_tray: `Output`",
				goutput)
		message.channel.send({
			embed
		});
	}
}
}


module.exports = EvalCommand
