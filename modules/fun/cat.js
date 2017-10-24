const Discord = require('discord.js');
var request = require ("request");
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
    message.delete()
	 var img 
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        console.log(body);
	img = body.file
    })

      let embed = new Discord.RichEmbed()
      //embed.setTitle('<:apple_animal_cat:372237719780196353> `Cat Fetched Successfully`')
	  //embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      //embed.setFooter('Replying to: ' + this.message.author.tag)
      embed.setTimestamp()
      embed.setImage(img)
        
      message.channel.send({ embed })
    return true
  }
}

module.exports = catCommand
