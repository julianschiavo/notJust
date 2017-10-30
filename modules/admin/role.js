const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class roleCommand extends Command {
	constructor() {
		super({
			name: 'role',
			help: 'Add/remove a role from a member',
			lhelp: '{user} {role} [reason]\n{user} is the user to ban (id or mention)\n{role} is the role name or ID. If the role name contains 2 words, you MUST provide the ID.\n[reason] is the Audit Log reason for the role modification\n(Please note it will add or remove the role depending on if the user has it or not)'
		})
	}

	hasPermission(message) {
		//if (message.author.id == require('../../config.json').owner) return true
		if (message.guild && message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return true
		return false
	}

	async run(message, args, api) {
		args.splice(0, 1)
		if (!args[0]) {
			api.error('Please specify which user to modify a role for.')
			return;
		} else if (!args[1]) {
			api.error('Please specify which role to add/remove.')
			return;
		}
		var arg = args[0]
		var user = api.getUser(arg, 'member')
		/*if (message.guild.member(user.id).hasPermission("MANAGE_ROLES") && message.author.id !== message.guild.ownerID) {
			api.error('You can\'t modify staff member roles unless you are the server owner.')
			return
		}*/
		args.splice(0, 1)
		var role

		function isN(num) {
			return !isNaN(num)
		}
		if (!isN(args[0])) {
			role = message.guild.roles.find("name", args[0])
		} else {
			role = message.guild.roles.get(args[0])
		}
		if (!role) {
			api.error('The specified role doesn\'t exist or couldn\'t be found. Try again, and remember to specify the role ID if it\'s name contains more than one word.')
			return;
		}
		args.splice(0, 1)
		var reason
		var type
		if (user.roles.has(role.id) {
				type = 'Added'
				if (args[0]) {
					reason = args.join(' ');
					user.removeRole(role, reason)
				} else {
					user.removeRole(role)
				}
			} else {
				type = 'Removed'
				if (args[0]) {
					reason = args.join(' ');
					user.addRole(role, reason)
				} else {
					user.addRole(role)
				}
			}
			let embed = new Discord.RichEmbed()
			embed.setTitle('<:apple_hammer:359560554479878144> `' + type + ' ' + role.name + ' to ' + user.user.username + '`') embed.setDescription(String.fromCharCode(8203)) embed.setColor('#00ff00') if (reason) {
				embed.addField('`Reason`', reason, false)
			}
			embed.setFooter('Replying to ' + message.author.tag)

			message.channel.send({
				embed
			}) return true
		}
	}

	module.exports = roleCommand
