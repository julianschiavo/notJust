const Discord = require('discord.js');
const GoogleImages = require('google-images');
const client = new GoogleImages('014338422944177884073:dkjfxeuq_dy', 'AIzaSyB2AcbLRMT-gTe6T75wYBx4JCarYBe7pBE');

const Command = require('../../cmdModule/commands').Command

class srCommand extends Command {
  constructor() {
    super({
      name: 'search',
      help: 'Search for an image'
    })
  }

  async run(message, args, api) {
	

args.splice(0,1);
var argsg = args.join(' ');

	  
client.search(argsg)
	.then(images => {
		/*
		[{
			"url": "http://steveangello.com/boss.jpg",
			"type": "image/jpeg",
			"width": 1024,
			"height": 768,
			"size": 102451,
			"thumbnail": {
				"url": "http://steveangello.com/thumbnail.jpg",
				"width": 512,
				"height": 512
			}
		}]
		 */
	let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_face_sunglasses:359559678809866240> `Image Found Successfully`')
	  embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      //embed.setTimestamp()
	  embed.setFooter('Replying to ' + message.author.tag)
	embed.setImage(images[0].url);
	message.channel.send({ embed })
	});
 
    

//	embed.setImage(img)


      
    return true
  }
}

module.exports = srCommand
