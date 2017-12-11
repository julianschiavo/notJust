const Discord = require('discord.js');
const config = require('../../config.json');
var changeCase = require('change-case');

const Command = require('../../cmdModule/commands').Command

class alCommand extends Command {
  constructor() {
    super({
      name: 'ask',
      help: 'Ask Alexa a question',
      lhelp: '{text}\n {text} is the text to send to Alexa.'
    })
  }

  hasPermission(message) {
    if (message.guild && (message.guild.id == '268970339948691456' || (message.guild.id == '364460985689440256' && message.channel.id == '370870070764634112')) && (message.client.settings.get(message.guild.id).isDonator == true || message.author.id == require('../../config.json').owner)) return true
    return false
  }

  async run(message, args, api) {
    args.splice(0, 1)
    if (!args[0]) {
      api.error('Please provide some text to ask Alexa.')
      return
    }
    //console.log('hi')
    var arg = args.join(' ');
    message.channel.startTyping();
    const alexa = message.client.alexa
    alexa.message(arg).then((result) => {
      var text = changeCase.sentenceCase(result.transcript)
      //message.channel.send(result.transcript).catch(console.error);
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_siri:356765237778579457> `' + arg + '`')
      embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      embed.setFooter('Replying to ' + message.author.tag)
      if (text) {
      embed.addField('`Response`', text, false)
      } else {
        embed.addField('`Response`', 'None', false)
      }
      if (result.transcriptAudioURL) {
      embed.addField('`Audio Response`', result.transcriptAudioURL, false)
      } else {
        //embed.addField('`Audio Response`', 'None', false)
      }
      message.channel.send({
        embed
      })
      message.channel.stopTyping();
      //console.log("Reply Transcript: " + result.transcript);
      //console.log("Reply Audio: " + result.transcript_audio_url);
    });
    return true
  }
}

module.exports = alCommand
