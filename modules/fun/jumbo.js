const Discord = require('discord.js');
const twemoji = require('twemoji');
const Command = require('../../cmdModule/commands').Command

class jumboCommand extends Command {
	constructor() {
		super({
			name: 'jumbo',
			help: 'Show jumbo version of emoji',
			lhelp: '\n Note: Jumbo only works on non default emoji for now.'
		})
	}

	async run(message, args, api) {
		args.splice(0, 1)
		if (!args[0]) {
			api.error('Please provide an emoji to jumbo.')
		}
		var arg = args[0]
		//var argtest = \ < \: . + \: \d + \ > .test(arg);
		//var argtest = arg.match(/\D/g);
		if (arg.indexOf('<') >= 0) {
			arg = arg.replace(/\D/g, '');
			//arg = arg.replace(/[^a-zA-Z-]/g, '')
			//var emojilink = message.client.emojis.get(arg).url
			//var emojilink = message.client.emojis.find('name', arg).url
			var emojilink = 'https://cdn.discordapp.com/emojis/' + arg + '.png'
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
		} else {
			var arg = twemoji.convert.toCodePoint(arg)
			var emojilink = 'https://raw.githubusercontent.com/twitter/twemoji/gh-pages/2/72x72/' + arg + '.png'
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
		//https://raw.githubusercontent.com/twitter/twemoji/gh-pages/2/svg/twemoji.convert.toCodePoint('unicodeEmojiOutputHere').svg

	}
}

module.exports = jumboCommand
