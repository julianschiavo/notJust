const Discord = require('discord.js');
const vdSDK = require("virtual-device-sdk");
const alexa = new vdSDK.VirtualDevice("d0cbcc55-3a20-49bc-a55a-096a97c887cf");
const config = require('../../config.json')

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
    if (message.guild && message.guild.member(message.author).id == '193908323911860224' && (message.client.settings.get(message.guild.id).isDonator == true || message.author.id == require('../../config.json').owner)) return true
    return false
  }

  async run(message, args, api) {
    args.splice(0, 1)
    if (!args[0]) {
      api.error('Please provide some text to send to the AI.')
      return
    }
    console.log('hi')
    var arg = args.join(' ');
    message.channel.startTyping();
    alexa.message(arg).then((result) => {
      message.channel.send(result.transcript).catch(console.error);
      message.channel.stopTyping();
      console.log("Reply Transcript: " + result.transcript);
      console.log("Reply Audio: " + result.transcript_audio_url);
    });
    return true
  }
}

module.exports = alCommand
