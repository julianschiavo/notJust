const games = require('../games.json')
const config = require('../config.json')
exports.run = (bot) => {
	const snekfetch = require('snekfetch')
	snekfetch.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
		.set('Authorization', config.apiKeys.dbots)
		.send({
			server_count: bot.guilds.size
		})
		.then(() => console.log('Updated discordbots.org stats.'))
		.catch(err => console.error(`Whoops something went wrong: ${err.body}`));

	function unmute(id, g, conf) {
		var user = g.members.get(id)
		var role
		if (conf.muteRole) {
			role = g.roles.find("name", conf.muteRole);
			if (user.roles.has(role.id)) {
				user.removeRole(role, "Automatic unmute")
				//conf.tempMutes.shift()
        conf = conf.filter(function(obj) {
    return obj == id;
});
				bot.settings.set(g.id, conf);
			} else {
				return
			}
		} else {
			return
		}
	}

	function prefsCheck(g) {
		var conf = bot.settings.get(g.id)
		bot.settings.set(g.id, bot.defaultSettings);
		conf = bot.settings.get(g.id)

		if (conf.tempMutes.length >= 1) {
			var mutes = conf.tempMutes
			mutes.forEach(unmute, g, conf)
		}
	}

	bot.guilds.forEach(prefsCheck)

	console.log(`${bot.user.username} is online and ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers!`)
	if (games.length > 0) {
		setInterval(() => {
			const game = Math.floor(Math.random() * games.length)
			bot.user.setStatus('online')
			bot.user.setGame(games[game])
		}, config.timer)
	}
}
