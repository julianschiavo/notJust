const games = require('../games.json')
const config = require('../config.json')
exports.run = (bot) => {
  console.log(`${bot.user.username} is online and ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers!`)
  if (games.length > 0) {
    setInterval(() => {
      const game = Math.floor(Math.random() * games.length)
      bot.user.setStatus('online')
      bot.user.setGame(games[game])
    }, config.timer)
  }
}
