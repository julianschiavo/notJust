const errors = require('common-errors')
const fs = require('fs')
fs.exists('./config.json', (exists) => {
	if (!exists) {
		throw new errors.io.FileNotFoundError('./config.json', 'Have you copied config.example.json to config.json and changed the respective values?')
	}
})
const Commands = require('./cmdModule/commands')
const config = require('./config.json')
const Discord = require('discord.js')
const api = require('./cmdModule/api')
if (!config.prefix) throw new errors.NotFoundError('(config.json).prefix')
if (!config.token) throw new errors.NotFoundError('(config.json).token')
if (!config.timer) throw new errors.NotFoundError('(config.json).timer')
if (!config.env) throw new errors.NotFoundError('(config.json).env')
const env = config.env
if (env == 'prod' || env == 'production') {
	console.log('notJust is running in PRODUCTION mode. Debug messages will not be shown.')
} else if (env == 'dev' || env == 'development') {
	console.log('notJust is running in DEVELOPMENT mode. Debug messages will be shown.')
} else if (env == 'sandbox') {
	console.warn('notJust is running in SANDBOX mode! Debug messages will be shown. Certain commands will always be able to run, regardless of hasPermission().')
} else {
	throw new errors.ArgumentError('(config.json).env', `config.env should be set to 'prod', 'dev', or 'sandbox'.`)
}
const bot = new Discord.Client()
const handler = new Commands.CommandHandler({
	bot: bot,
	prefix: config.prefix
})

bot.on('error', (e) => console.error(e))
bot.on('warn', (e) => console.warn(e))
bot.on('debug', (e) => {
	if (env == 'dev' || env == 'development' || env == 'sandbox') console.info(e)
})

const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const tableSource = new EnmapLevel({
	name: "settings"
});
bot.settings = new Enmap({
	provider: tableSource
});
bot.queue = {};

bot.defaultSettings = {
	logChannel: "logs",
	muteRole: "Muted",
	selfRoles: "",
	isDonator: false,
	isBlacklisted: false
}

bot.on("guildCreate", guild => {
	// Adding a new row to the collection uses `set(key, value)`
	var isBL = bot.settings.get(guild.id).isBlacklisted
	if (isBL) {
		if (isBL == true) {
			guild.leave()
		}
	} else {
	bot.settings.set(guild.id, bot.defaultSettings);
	}
})

bot.on("guildDelete", guild => {
	// Removing an element uses `delete(key)`
	// bot.settings.delete(guild.id);
	// EDIT: Don't delete bot settings, that way Blacklist is retained
});

bot.dispatcher = ''

//bot.dispatcher.on('end', () => {
	//collector.stop();
	//play(message.client.queue[message.guild.id].songs.shift());
//});

//bot.dispatcher.on('error', (err) => {
//	return api.error(err)/*.then(() => {
		//collector.stop();
		//play(message.client.queue[message.guild.id].songs.shift());
	//});
//});

/*bot.on('guildMemberAdd', member => {
  // Send the message to the guilds default channel (usually #general), mentioning the member
  //member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);

  // If you want to send the message to a designated channel on a server instead
  // you can do the following:
  //const channel = member.guild.channels.find('name', 'admins');
  // Do nothing if the channel wasn't found on this server
  //if (!channel) return;
  // Send the message, mentioning the member
  //const msgg = channel.send(`Set ${member}'s Crew:\n\nReact with:\n:one: Bot\n:two: Redlight\n:three: Yellowlight\n:four: Greenlight`);
  //const collector = msgg.createReactionCollector(
 (reaction) => reaction.emoji.id === '1️⃣' || reaction.emoji.id === '2️⃣' ||reaction.emoji.id === '3️⃣' ||reaction.emoji.id === '4️⃣'
);
collector.on('collect', r => msgg.channel.send(`Run lcrew to set ${member} to ${r}. I can't do it yet, sorry!`));
  
  
  //api.embed('#00ff00', `<:Tick:318378431051989003> \`Prestige Roles Reset for New Season\``, '')
});*/


handler.registerModule('sudo', 'Sudo')
handler.registerModule('fun', 'Fun')
handler.registerModule('media', 'Media')
handler.registerModule('mod', 'Moderation')
handler.registerModule('admin', 'Administration')
handler.registerModule('misc', 'Other')
handler.registerModule('light', 'Light')
handler.registerModule('utility', 'Utility')
handler.registerModule('code', '#code')
handler.registerModule('prefs', 'Preferences')

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err)
	files.forEach(file => {
		bot.on(file.split('.')[0], (...args) => {
			var module = require(`./events/${file}`)
			if (file.split('.')[0] == 'message') {
				module.run(bot, handler, ...args)
			} else {
				module.run(bot, ...args)
			}
		})
	})
})

bot.login(config.token)
