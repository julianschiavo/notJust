const Discord = require('discord.js');

const Command = require('../../cmdModule/commands').Command

class setCommand extends Command {
	constructor() {
		super({
			name: 'set',
			help: 'Set a preference',
			lhelp: '{name} {value}\n{name} is the preference name\n{value} is the value for the preference'
		})
	}

	hasPermission(message) {
		if (message.guild && message.author.id == message.guild.ownerID) return true
		return false
	}

	async run(message, args, api) {

		if (!message.client.settings.get(message.guild.id)) {
			// Adding a new row to the collection uses `set(key, value)`
			message.client.settings.set(message.guild.id, message.client.defaultSettings);
		}

		const thisConf = message.client.settings.get(message.guild.id);


		function countWords(str) {
			return str.split(" ").length;
		}

		function isN(num) {
			return !isNaN(num)
		}

		if (!args[1] || !args[2]) {
			api.error('Please specify a preference name and value.')
		}
		var name = args[1].toLowerCase()
		var value = args[2]

		if (name == 'mute' || name == 'muterole' || name == 'role' || name == 'mutedrole') {
			if (!isN(value)) {
				let role = message.guild.roles.find("name", value)
				if (role && countWords(role.name) == 1) {
					/* SET IT TO ROLE.NAME */
					thisConf.muteRole = role.name;
					message.client.settings.set(message.guild.id, thisConf);
					let embed = new Discord.RichEmbed()
					embed.setTitle('<:green_tick:330712173288488960> `Mute Role Set`')
					embed.addField('`Value`', role.name, false)
					embed.setDescription(String.fromCharCode(8203))
					embed.setColor('#00ff00')
					//embed.setTimestamp()
					embed.setFooter('Replying to ' + message.author.tag)

					message.channel.send({
						embed
					})
				} else {
					api.error('The specified mute role name is invalid. Try again, making sure it only contains one word.')
				}
			} else {
				let role = message.guild.roles.get(value)
				if (role && countWords(role.name) == 1) {
					/* SET IT TO ROLE.NAME */
					thisConf.muteRole = role.name;
					message.client.settings.set(message.guild.id, thisConf);
					let embed = new Discord.RichEmbed()
					embed.setTitle('<:green_tick:330712173288488960> `Mute Role Set`')
					embed.addField('`Value`', role.name, false)
					embed.setDescription(String.fromCharCode(8203))
					embed.setColor('#00ff00')
					//embed.setTimestamp()
					embed.setFooter('Replying to ' + message.author.tag)

					message.channel.send({
						embed
					})
				} else {
					api.error('The specified mute role ID is invalid. Try again, making sure the role name only contains one word.')
				}
			}
		}
		return true
	}
}

module.exports = setCommand
