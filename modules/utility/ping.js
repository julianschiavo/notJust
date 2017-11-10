const Command = require('../../cmdModule/commands').Command

class PingCommand extends Command {
  constructor() {
    super({
      name: 'ping',
      help: 'Ping the bot'
    })
  }
  
  hasPermission(message) {
    var check = require('../../other/perms').check('utility','ping',JSON.stringify(message.client.settings.get('global')))
    if (check == false) return false
    return true
  }

  async run(message, args, api) {
    //message.delete()
    let start = Date.now()
    let one = message.client.ping.toFixed().toString() + " ms"
    message.channel.send("Pinging...").then(newMessage => {
      let end = Date.now();
      let two = Math.round(end - start) + " ms"
      newMessage.delete()
      api.evalembed([245, 236, 71], "<:apple_pingpong:372233015784505345> `Bot Pinged`", "`Heartbeat`", one, "`Ping`", two)
    })
    //api.embed([245, 236, 71], "🏓 `Ping Successful!`", "**Heartbeat:** " + message.client.ping.toFixed().toString() + " ms\n**Ping:** " + final + " ms")
    return true
  }
}

module.exports = PingCommand
