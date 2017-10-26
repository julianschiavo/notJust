const Discord = require('discord.js')
const Command = require('../../cmdModule/commands').Command

class serversCommand extends Command {
	constructor() {
		super({
			name: 'servers',
			help: 'Get a list of servers'
		})
	}

	async run(message, args, api) {
		const guilds = message.client.guilds.map(g => {
    `${g.name} (${g.id})`
    }).join("\n");

		let embed = new Discord.RichEmbed()
		//embed.setTimestamp()
		embed.setTitle('<:apple_symbol_info:359559750096257024> `Server List`')
		embed.setColor('#00ff00')
		//embed.setFooter('Replying to: ' + this.message.author.tag)
		//embed.setTimestamp()
		embed.setFooter('Replying to ' + message.author.tag)
		embed.setDescription(String.fromCharCode(8203))
		embed.addField('`List`', guilds, false)
		message.channel.send({
			embed
		})
		return true
	}
}

module.exports = serversCommand
