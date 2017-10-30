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

	/*function unmute(id, user, conf, guild) {
		var role
		if (conf.muteRole) {
			role = user.roles.find("name", conf.muteRole);
			if (user.roles.has(role.id)) {
				user.removeRole(role, "Automatic unmute")
				//conf.tempMutes.shift()
        conf = conf.filter(function(obj) {
    return obj == id;
});
				bot.settings.set(guild.id, conf);
			} else {
				return
			}
		} else {
			return
		}
	}

	function prefsCheck(guild) {
		var conf = bot.settings.get(guild.id)
		if (!conf) {
		bot.settings.set(guild.id, bot.defaultSettings);
		}
		conf = bot.settings.get(guild.id)

		if (conf.tempMutes.length >= 1) {
			var mutes = conf.tempMutes
			
			mutes.forEach(function (id, user, conf, guild) {
			  var user = guild.members.get(id)
                          unmute(id,user,conf,guild);
                        })
			//mutes.forEach(unmute(id, g, conf))
		}
	}

	bot.guilds.forEach(prefsCheck)
	
	
	
	bot.guilds.forEach(function(guild) {
		var conf = bot.settings.get(guild.id);
		var mutes = conf.tempMutes;
		if (mutes.length >= 1) {
		mutes.forEach(function(id, conf, g) {
			var user = bot.users.get(id)
			var member = g.member(user)
			if (conf.muteRole) {
				var role = user.roles.find("name", conf.muteRole);
				if (user.roles.has(role.id)) {
					user.removeRole(role, "Automatic unmute")
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
		})
		}
	})*/

	console.log(`${bot.user.username} is online and ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers!`)
	if (games.length > 0) {
		setInterval(() => {
			const game = Math.floor(Math.random() * games.length)
			bot.user.setStatus('online')
			bot.user.setGame(games[game])
		}, config.timer)
	}
}
