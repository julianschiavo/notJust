const Discord = require('discord.js');
const yt = require('ytdl-core');
const Command = require('../../cmdModule/commands').Command

class playCommand extends Command {
  constructor() {
    super({
      name: 'play',
      help: 'Play the media queue'
    })
  }

  hasPermission(message) {
    if (message.guild && (message.client.settings.get(message.guild.id).isDonator == true || message.author.id == require('../../config.json').owner)) {
      return true
    } //if (message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return true
    // if (message.author.id == message.guild.ownerID) return true
    return false
  }

  async run(message, args, api) {
    if (!message.client.settings.get(message.guild.id)) {
      // Adding a new row to the collection uses `set(key, value)`
      message.client.settings.set(message.guild.id, message.client.defaultSettings);
    }


    let embed = new Discord.RichEmbed()

    embed.setDescription(String.fromCharCode(8203))
    embed.setColor('#00ff00')
    embed.setFooter('Replying to ' + message.author.tag)
    embed.setTitle('<:apple_music:372943300753227786> `Now Playing`')

    if (message.client.queue[message.guild.id] === undefined) return api.error('Please add some songs to the queue before playing.');
    //if (!message.guild.voiceConnection) return commands.join(message).then(() => commands.play(message));
    if (!message.guild.voiceConnection) return api.error('Please enter a voice channel first');
    if (message.client.queue[message.guild.id].playing) return api.error('Already Playing');
    message.client.dispatcher = ''
    message.client.queue[message.guild.id].playing = true;

    console.log(message.client.queue);
    (function play(song) {
      console.log(song);
      if (song === undefined) return api.error('Queue is empty.').then(() => {
        message.client.queue[message.guild.id].playing = false;
        message.member.voiceChannel.leave();
      });
      embed.addField('`Name`', song.title, false)
      message.channel.send({
        embed
      })
      message.client.dispatcher = message.guild.voiceConnection.playStream(yt(song.url, {
        audioonly: true
      }), {
        passes: '5'
      });
      message.client.dispatcher.on('end', () => {
      });
      message.client.dispatcher.on('error', (err) => {
        return api.error(err)
      });
    })(message.client.queue[message.guild.id].songs.shift());



    return true
  }
}

module.exports = playCommand
