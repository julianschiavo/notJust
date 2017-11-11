const snekfetch = require('snekfetch')
const config = require('../config.json')

exports.run = (bot) => {
console.log('hi')
  snekfetch.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
    .set('Authorization', config.apiKeys.dbots)
    .send({
      server_count: bot.guilds.size
    })
    .then(() => console.log('Updated discordbots.org stats.'))
    .catch(err => console.error(`Whoops something went wrong: ${err.body}`));
    }
