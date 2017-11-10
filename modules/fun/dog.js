const Discord = require('discord.js');
var request = require("request");
var url = "http://random.dog/woof.json"

const Command = require('../../cmdModule/commands').Command

function checkURL(url) {
  return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

class dogCommand extends Command {
  constructor() {
    super({
      name: 'dog',
      help: 'Fetch a random dog',
      module: 'fun'
    })
  }

  async run(message, args, api) {
    const response = await request('https://random.dog/woof.json', (e, r, b) => {
      var imageURL = JSON.parse(b).url
      var check = checkURL(imageURL)
      if (check) {
        let embed = new Discord.RichEmbed()
        embed.setTitle('<:apple_animal_dog:372248984783290369> `Dog Fetched`')
        embed.setDescription(String.fromCharCode(8203))
        embed.setColor('#00ff00')
        embed.setFooter('Replying to ' + message.author.tag)
        embed.setImage(imageURL)
        console.log(imageURL)
        //message.channel.send(imageURL) 
        message.channel.send({
          embed
        })
      } else {
        api.error('Wrong file format returned. Please try again.')
      }
    })

    return true
  }
}

module.exports = dogCommand
