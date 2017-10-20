const Command = require('../../cmdModule/commands').Command
class EvalCommand extends Command {
  constructor() {
    super({
      name: 'eval',
      help: 'Evaluate some code',
      lhelp: '{code}\n{code} is the D.JS code to run/evaluate.'
    })
  }

  hasPermission(message) {
    let dotGuild = message.client.guilds.get('315380052097499156')
    if (!dotGuild.members.has(message.author.id)) return false
    if (require('../../config.json').env == 'sandbox' && dotGuild.members.get(message.author.id).roles.has('315381167765454849')) return true
    if (message.author.id == require('../../config.json').owner) return true
    return false
  }

  async run(message, args, api) {
    args.splice(0, 1)
    var code = args.join(' ');
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
  }
}

module.exports = EvalCommand
