const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class toggleCommand extends Command {
	constructor() {
		super({
			name: 'toggle',
			help: 'Toggle a self role',
			lhelp: '{role}\n{role} is the role name or ID.'
		})
	}

	hasPermission(message) {
		//if (message.author.id == require('../../config.json').owner) return true
		if (message.guild) return true
		return false
	}

	async run(message, args, api) {
		var conf
		if (message.client.settings.get(message.guild.id).selfRoles) {
		conf = message.client.settings.get(message.guild.id).selfRoles
		} else {
			api.error('This server does not have any self roles configured.')
			return;
		}
		if (conf.length > 0) {
		} else {
			api.error('This server does not have any self roles configured.')
			return;
		}
		args.splice(0, 1)
		if (!args[0]) {
			api.error('Please specify which role to join.')
			return;
		}
		var arg = args.join(' ')
		var user = message.guild.member(message.author.id)

		var role

		function isN(num) {
			return !isNaN(num)
		}
    
		if (!isN(args[0])) {
			role = message.guild.roles.find("name", arg)
		} else {
			role = message.guild.roles.get(arg)
		}
		if (!role) {
			api.error('The specified role doesn\'t exist or couldn\'t be found. Try again, and remember to specify the role ID if it\'s name contains more than one word.')
			return;
		}
		var check = conf.includes(role.id)
		if (check == false) {
			api.error('The specified role is not configured as a self role.')
			return;
		}
		args.splice(0, 1)

		if (user.roles.has(role.id)) {
				user.removeRole(role)
		} else {
				user.addRole(role)
		}
		let embed = new Discord.RichEmbed()
		embed.setTitle('<:apple_key:359560553431171084> `Toggled ' + role.name + ' for ' + user.user.username + '`')
		embed.setDescription(String.fromCharCode(8203))
		embed.setColor('#00ff00')
		embed.setFooter('Replying to ' + message.author.tag)

		message.channel.send({
			embed
		})
		return true
	}
}

module.exports = toggleCommand
