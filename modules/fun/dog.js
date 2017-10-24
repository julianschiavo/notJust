const Discord = require('discord.js');
var request = require ("request");
var url = "http://random.dog/woof.json"

const Command = require('../../cmdModule/commands').Command

class dogCommand extends Command {
  constructor() {
    super({
      name: 'dog',
      help: 'Get a random dog picture'
    })
  }

  async run(message, args, api) {
	let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_animal_dog:372248984783290369> `Dog Fetched Successfully`')
	  embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
	  embed.setFooter('Replying to ' + message.author.tag)
      var img
      var img2
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        console.log(body.url);
	    var img = body.url
	    var img2 = encodeURI(body.url);
	embed.setImage(img)
    })
	  
	  /*get(url).then(response => {
	embed.setImage(response.body.file)
	}*/

      //message.channel.send(bod)
        message.channel.send(img)
	  message.channel.send(img2)
      message.channel.send({ embed })
    return true
  }
}

module.exports = dogCommand
