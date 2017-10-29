const games = require('../games.json')
const config = require('../config.json')
exports.run = (bot) => {
  const snekfetch = require('snekfetch')
  snekfetch.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
  .set('Authorization', config.dbotstoken)
  .send({ server_count: bot.guilds.size })
  .then(() => console.log('Updated discordbots.org stats.'))
  .catch(err => console.error(`Whoops something went wrong: ${err.body}`));
  
  console.log(`${bot.user.username} is online and ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers!`)
  if (games.length > 0) {
    setInterval(() => {
      const game = Math.floor(Math.random() * games.length)
      bot.user.setStatus('online')
      bot.user.setGame(games[game])
    }, config.timer)
  }
}
