const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class jumboCommand extends Command {
  constructor() {
    super({
      name: 'jumbo',
      help: 'Show jumbo version of emoji'
    })
  }

  async run(message, args, api) {
  args.splice(0,1)
  if (!args[0]) {
  api.error('Please provide an emoji to jumbo.')
  }
  var arg = args[0]
  
  //arg = arg.replace(/\D/g,'');
  var emojilink = message.client.emojis.get(arg).url
    let embed = new Discord.RichEmbed()
			embed.setFooter('Replying to ' + message.author.tag)
			embed.setTitle('<:apple_face_smile:359559572634992672> `Emoji Jumboed`')
			embed.setDescription(String.fromCharCode(8203))
			embed.setColor('#00ff00')
			embed.setImage(emojilink)
			message.channel.send({
				embed
			})
      return true
  }
}

module.exports = jumboCommand
