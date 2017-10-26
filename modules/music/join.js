const Discord = require('discord.js');

const Command = require('../../cmdModule/commands').Command

class joinCommand extends Command {
	constructor() {
		super({
			name: 'join',
			help: 'Join a voice channel'
		})
	}

	hasPermission(message) {
  if (message.client.settings.get(message.guild.id).isDonator == true || message.author.id == require('../../config.json').owner) return true
		//if (message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return true
   // if (message.author.id == message.guild.ownerID) return true
		return false
	}

	async run(message, args, api) {
		if (!message.client.settings.get(message.guild.id)) {
			// Adding a new row to the collection uses `set(key, value)`
			message.client.settings.set(message.guild.id, message.client.defaultSettings);
		}
    
    return new Promise((resolve, reject) => {
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return api.error('I wasn\'t able to connect to your voice channel.');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
    
					let embed = new Discord.RichEmbed()
					embed.setTitle('<:apple_symbol_hash:359559749785616387> `Voice Channel Joined`')
					embed.setDescription(String.fromCharCode(8203))
					embed.setColor('#00ff00')
					//embed.setTimestamp()
					embed.setFooter('Replying to ' + message.author.tag)

					message.channel.send({
						embed
					})






		return true
	}
}

module.exports = joinCommand
