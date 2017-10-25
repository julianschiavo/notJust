
  
  const Discord = require('discord.js');

const Command = require('../../cmdModule/commands').Command

class reloadCommand extends Command {
  constructor() {
    super({
      name: 'reload',
      help: 'Reload a command file',
      lhelp: '{{module_folder_name}/{command_name}}\n{module_folder_name} is the name of the folder for the module for the command to be reloaded\n{command_name} is the command to reload 
    })
  }
  
  hasPermission(message) {
    if (message.author.id == require('../../config.json').owner) return true
    return false
  }

  async run(message, args, api) {
	let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_animal_cat:372237719780196353> `Cat Fetched`')
	  embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      //embed.setTimestamp()
	  embed.setFooter('Replying to ' + message.author.tag)
      var img
      var img2
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        console.log(body.file);
	//var img = body.file;
	    //var bod = body
	    var check = checkURL(body.file)
    if (check) {
	    } else {
	    api.error('Wrong file format returned. Please try again.')
		    return;
    }
	    var img = body.file
	    var img2 = encodeURI(body.file);
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

module.exports = catCommand
