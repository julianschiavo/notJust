const Discord = require('discord.js')
const Command = require('../../cmdModule/commands').Command

class serversCommand extends Command {
	constructor() {
		super({
			name: 'servers',
			help: 'Get a list of servers'
		})
	}
	
	hasPermission(message) {
		if (message.author.id == require('../../config.json').owner) return true
		return false
	}

	async run(message, args, api) {
		//const guilds = message.client.guilds.map(g => g.id + ': **`' + g.name + '`** (' + g.members.size + ')').join("\n");
                const ids = message.client.guilds.map(g => '`' + g.id + '`').join("\n");
		const names = message.client.guilds.map(g => '`' + g.name + '`').join("\n");
		const sizes = message.client.guilds.map(g => '`' + g.members.size + '`').join("\n");
		let embed = new Discord.RichEmbed()
		//embed.setTimestamp()
		embed.setTitle('<:apple_symbol_info:359559750096257024> `Server List`')
		embed.setColor('#00ff00')
		//embed.setFooter('Replying to: ' + this.message.author.tag)
		//embed.setTimestamp()
		embed.setFooter('Replying to ' + message.author.tag)
		//embed.setDescription('\n' + guilds)
		//embed.setDescription(String.fromCharCode(8203))
		embed.addField('`ID`', ids, true)
		embed.addField('`Name`', names, true)
		
		embed.addField('`Count`', sizes, true)
		message.channel.send({
			embed
		})
		return true
	}
}

module.exports = serversCommand
