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
	
	
	var val;
var a = ["a", "b", "c"];
for (val of a) {
    console.log(val);
}
*/
	/*var g
	var list = bot.guilds
	for (g of list) {
		var conf = bot.settings.get(g.id);
		var mutes = conf.tempMutes;
		if (mutes.length > 0) {
			for (var l = 0; l < mutes.length; l++) {
				var id = mutes[l];
				var user = g.members.get(id);
				if (conf.muteRole) {
					var role = user.roles.find("name", conf.muteRole);
					if (user.roles.has(role.id)) {
						user.removeRole(role, "Automatic Unmute");
						conf = conf.filter(function(obj) {
							return obj == id;
						});
						bot.settings.set(g.id, conf);
					} else {
						return;
					}
				} else {
					return;
				}
			}
		}
	}*/
	/*
		bot.guilds.forEach(function(guild) {
			var conf = bot.settings.get(guild.id);
			var mutes = conf.tempMutes;
			if (mutes.length >= 1) {
				mutes.forEach(function(id, conf, guild) {
					if (guild && guild.members) {
						var user = bot.users.get(id)
						var member = guild.members.get(user.id)
						if (conf.muteRole) {
							var role = user.roles.find("name", conf.muteRole);
							if (user.roles.has(role.id)) {
								user.removeRole(role, "Automatic unmute")
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
				})
			}
		})*/

	bot.settings.forEach(function(conf) {
		var mutes = conf.tempMutes;
		if (mutes && mutes.length > 0) {
			var user = bot.users.get(mutes)
			if (!user) {
				return;
			}
			var gs = user.guilds.map(g => g.id)
			if (!gs) {
				return;
			}
			gs.forEach(function(guild) {
				var gui = bot.guilds.get(guild)
				var member = gui.members.get(user.id)
				if (conf.muteRole) {
					var role = gui.roles.find("name", conf.muteRole);
					if (role && member.roles.has(role.id)) {
						member.removeRole(role, "Automatic Unmute")
						conf = conf.tempMutes.filter(function(obj) {
							return obj !== user.id;
						});
						bot.settings.set(guild.id, conf);
					}
				}
			})
		}
	})

	console.log(`${bot.user.username} is online and ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers!`)
	if (games.length > 0) {
		setInterval(() => {
			const game = Math.floor(Math.random() * games.length)
			bot.user.setStatus('online')
			bot.user.setGame(games[game])
		}, config.timer)
	}
}
