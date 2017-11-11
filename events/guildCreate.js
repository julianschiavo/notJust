const snekfetch = require('snekfetch')
const config = require('../config.json')

exports.run = (bot, guild) => {
console.log('higuildcreate')
 snekfetch.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
    .set('Authorization', config.apiKeys.dbots)
    .send({
      server_count: bot.guilds.size
    })
    .then(() => console.log('Updated discordbots.org stats.'))
    .catch(err => console.error(`Whoops something went wrong: ${err.body}`));
  // Adding a new row to the collection uses `set(key, value)`
  var conf = bot.settings.get(guild.id)
  if (conf) {
    if (conf.isBlacklisted == true) {
      guild.leave()
    }
    if (conf.isDonator == true) {
      conf.isDonator = false;
      bot.settings.set(guild.id, conf);
    }
  } else {
    bot.settings.set(guild.id, bot.defaultSettings);
  }
  }
