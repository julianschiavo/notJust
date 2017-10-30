const Command = require('../../cmdModule/commands').Command

class LnickCommand extends Command {
	constructor() {
		super({
			name: 'nick',
			help: 'Set a nickname',
			lhelp: '{nickname} {timezone} [user]\n{nickname} is the nickname for the user (NO SPACES OR TIMEZONE)\n{timezone} is the UTC timezone (e.g. +8) to change user to (DON\'T INCLUDE UTC/GMT)\n[user] is the user to change timezone for, defaults to message author'
		})
	}

	hasPermission(message) {
		if (message.guild && message.guild.id == '277006003797491712') return true
		return false
	}

	async run(msg, args, api) {
		args.splice(0, 1)
		if (!args[0] | !args[1]) {
			api.error('Please remember to specify the timezone!')
			return;
		}

		var nick
		var timezone
		var user
		var color

		var matcher1 = "utc";
		var matcher2 = "gmt";
		var matcher3 = "+";
		var matcher4 = "-";
		var matcher5 = "(";
		var matcher6 = ")";
		var matcher7 = "0";

		nick = args[0]

		if (nick.indexOf(matcher1) !== -1 || nick.indexOf(matcher2) !== -1) {
			api.error('Please don\'t include symbols like UTC or GMT in your nickname.')
			return;
		}

		if (nick.indexOf(matcher3) !== -1 || nick.indexOf(matcher4) !== -1 || nick.indexOf(matcher5) !== -1 || nick.indexOf(matcher6) !== -1) {
			api.error('Please don\'t include `+`/`-`/`(`/`)` in your nickname.')
			return;
		}

		args.splice(0, 1)

		timezone = args[0].toLowerCase()


		if (timezone.indexOf(matcher1) !== -1 | timezone.indexOf(matcher2) !== -1 | timezone.indexOf(matcher5) !== -1 | timezone.indexOf(matcher6) !== -1) {
			api.error('Please don\'t include symbols like UTC or GMT or `(`/`)` in your timezone setting, just specify the UTC +/- time.')
			return;
		}

		if (timezone.indexOf(matcher3) == -1 && timezone.indexOf(matcher4) == -1 && timezone.indexOf(matcher7) == -1) {
			api.error('Please include +, - and the timezone time number.')
			return;
		}

		args.splice(0, 1)

		if (args[0]) {
			user = msg.guild.member(msg.mentions.users.first());
		} else {
			user = msg.guild.member(msg.author);
		}

		//if (theper.roles.has('277031676906045450')) {
		color = '#00ff00'
		//} else if (theper.roles.has('279166847289524224')) {
		//  color = '#ffff00'
		//} else if (theper.roles.has('339024651747590146')) {
		//  color = '#ff0000'
		//}

		user.setNickname(nick + " (" + timezone + ")", "Setting nickname and timezone for " + user.user.username)

		api.success(`\`${user.user.username}'s nickname has been set to ${user.nickname}.\``)
	}

}

module.exports = LnickCommand
