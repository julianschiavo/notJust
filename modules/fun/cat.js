const Discord = require('discord.js');
var request = require ("request");
//const get = require("snekfetch");
var url = "http://random.cat/meow.php"

const Command = require('../../cmdModule/commands').Command

class catCommand extends Command {
  constructor() {
    super({
      name: 'cat',
      help: 'Get a random cat picture'
    })
  }

  async run(message, args, api) {
	let embed = new Discord.RichEmbed()
      //embed.setTitle('<:apple_animal_cat:372237719780196353> `Cat Fetched Successfully`')
	  //embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      //embed.setFooter('Replying to: ' + this.message.author.tag)
      embed.setTimestamp()
      var img
      var bod
      var img2
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        console.log(body.file);
	//var img = body.file;
	    var bod = body
	    var img = body.file
	var img2 = encodeURI(body.file);
	embed.setImage(img)
    })
	  
	  /*get(url).then(response => {
	embed.setImage(response.body.file)
	}*/

      message.channel.send(bod)
        message.channel.send(img)
	  message.channel.send(img2)
      message.channel.send({ embed })
    return true
  }
}

module.exports = catCommand
