const config = require('../config.json')

exports.run = (bot, handler, msg) => {
  if (msg.content.startsWith(config.prefix)) {
    handler.handleMessage(msg)
  }
}
