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

const vdSDK = require("virtual-device-sdk");
bot.alexa = new vdSDK.VirtualDevice(config.apiKeys.alexa);

const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const tableSource = new EnmapLevel({
  name: "settings"
});
bot.settings = new Enmap({
  provider: tableSource
});

const tableSourceNew = new EnmapLevel({
  name: "currency"
});
bot.currency = new Enmap({
  provider: tableSourceNew
});
bot.queue = {};

bot.defaultSettings = {
  logChannel: "logs",
  muteRole: "Muted",
  selfRoles: [],
  isDonator: false,
  isBlacklisted: false,
  tempMutes: []
}

bot.defaultGlobalSettings = {
  blacklistedUsers: [],
  disabledModules: []
}

var gconf = bot.settings.get('global')
  if (gconf) {
  } else {
    bot.settings.set('global', bot.defaultGlobalSettings);
  }

const dotProvider = new EnmapLevel({name: "dots"});
bot.dots = new Enmap({provider: dotProvider});

bot.pointsMonitor = (message) => {
  if (message.channel.type !== 'text' || message.guild.id !== '268970339948691456') return;
  if (message.content.startsWith('.')) return;
  const score = bot.dots.get(message.author.id) || { dots: 0, level: 0, time: 0 };
  var curTime = new Date().getTime();
  if ((curTime - score.time) < 60000) {
    score.time = new Date().getTime();
    return bot.dots.set(message.author.id, score);
  } else {
    score.time = new Date().getTime();
  }
  score.dots = score.dots + Math.floor(Math.random() * (30 - 15 + 1)) + 15;
  const curLevel = Math.floor(0.1 * Math.sqrt(score.dots));
  if (score.level < curLevel) {
    message.author.send(`You are now **Level ${curLevel}**!`).catch(err => console.error(err))
    score.level = curLevel;
  }
  if (score.level >= '3') {
    message.guild.member(message.author).addRole(message.guild.roles.find('name','emoji'))
  }
  if (score.level >= '12') {
    message.guild.member(message.author).addRole(message.guild.roles.find('name','color'))
  }
  bot.dots.set(message.author.id, score);
};

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
handler.registerModule('currency', 'Currency')
handler.registerModule('events', 'Events')
handler.registerModule('dots', 'Dots')

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
