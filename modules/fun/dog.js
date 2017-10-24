const Discord = require('discord.js');
var request = require ("request");
var url = "http://random.dog/woof.json"

const Command = require('../../cmdModule/commands').Command

function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

class dogCommand extends Command {
  constructor() {
    super({
      name: 'dog',
      help: 'Get a random dog picture'
    })
  }

  async run(message, args, api) {
	
	  
	  /*const response = await request('https://random.dog/woof.json'),
            body = JSON.parse(response.body),
            imageURL = body.url;
	  message.channel.send(imageURL)
	  embed.setImage(imageURL)*/
	  const response = await request('https://random.dog/woof.json', (e,r,b) => {  
    var imageURL = JSON.parse(b).url
    var check = checkURL(imageURL)
    if (check) {
    let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_animal_dog:372248984783290369> `Dog Fetched Successfully`')
	  embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
	  embed.setFooter('Replying to ' + message.author.tag)
    embed.setImage(imageURL)
		  console.log(imageURL)
	 //message.channel.send(imageURL) 
	  message.channel.send({ embed })
    } else {
	    api.error('Error Code: `Dog_A`\nAn error has occured. Please try again.')
    }
  })
	  
      /*var img
      var img2
    request({
        url: url,
        json: true
    }, function (error, response, body) {
	var bod = JSON.parse(response.body)
        console.log(bod.url);
	    var img = bod.url
	    var img2 = encodeURI(bod.url);
	embed.setImage(img)
    })(*/
	  
	  /*get(url).then(response => {
	embed.setImage(response.body.file)
	}*/

      //message.channel.send(bod)
        /*message.channel.send(img)
	  message.channel.send(img2)
      message.channel.send({ embed })*/
    return true
  }
}

module.exports = dogCommand
