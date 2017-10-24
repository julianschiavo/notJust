const Discord = require('discord.js');
var PythonShell = require('python-shell');

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

	  
/*var spawn = require('child_process').spawn,
    py    = spawn('python', ['search.py']);*/

var options = {
scriptPath: '/home/me/notJust/modules/fun/',
args: argsg
};
var pyshell = new PythonShell('search.py', options);

pyshell.on('message', function (message) {	  
  let embed = new Discord.RichEmbed()
      embed.setTitle('<:apple_face_sunglasses:359559678809866240> `Image Found Successfully`')
	  embed.setDescription(String.fromCharCode(8203))
      embed.setColor('#00ff00')
      //embed.setTimestamp()
	  embed.setFooter('Replying to ' + message.author.tag)
	  message.channel.send(message)
	embed.setImage(message);
	message.channel.send({ embed })
});
//py.stdin.end();
  
	  
	
 
    

//	embed.setImage(img)


      
    return true
  }
}

module.exports = srCommand
