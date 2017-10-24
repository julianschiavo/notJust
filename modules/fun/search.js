const Discord = require('discord.js');
var imageSearch = require('node-google-image-search');

const Command = require('../../cmdModule/commands').Command

class srCommand extends Command {
  constructor() {
    super({
      name: 'search',
      help: 'Search for an image'
    })
  }

  async run(message, args, api) {
	let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_face_sunglasses:359559678809866240> `Image Found Successfully`')
	  embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      //embed.setTimestamp()
	  embed.setFooter('Replying to ' + message.author.tag)

args.splice(0,1);
var argsg = args.join(' ');
var offset = Math.floor((Math.random() * 100) + 1);
var results = imageSearch(argsg, callback, offset, 1);
 
function callback(results) {
    embed.setImage(results[0])
}

//	embed.setImage(img)


      message.channel.send({ embed })
    return true
  }
}

module.exports = srCommand
