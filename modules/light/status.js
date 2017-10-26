const Command = require('../../cmdModule/commands').Command

class LstatusCommand extends Command {
	constructor() {
		super({
			name: 'status',
			help: 'Check the status of a member\'s prestige car/cup',
			lhelp: '{type} [user]\n{type} is car/cup, what type of prestige\n[user] defaults to the message author, but you can specify another user to check status for'
		})
	}

	hasPermission(message) {
		if (message.guild) {
		let dotGuildMember = message.guild.members.get(message.author.id)
		if (message.guild && message.guild.id == '277006003797491712') return true
		}
		return false
	}

	async run(msg, args, api) {
		args.splice(0, 1)
		if (!args[0]) {
			//msg.reply('<:NoTick:318378431572344832> Please remember to specify the crew (G/Y/R) and type of count (car/cup)!')
			api.error('Please remember to specify the type of check (car/cup)!')
			return;
		}

		var user
		var endA
		var endB
		var endC
		var endD
		var type = args[0].toLowerCase();
		var prole
		var crew
		var color

		if (args[1]) {
			user = msg.guild.member(msg.mentions.users.first());
		} else {
			user = msg.guild.member(msg.author);
		}

		if (type == 'car') {
			//if (when == 'this') {
			prole = msg.guild.roles.find('name', 'Prestige Car')
			//} else if (when = 'last') {
			//  prole = msg.guild.roles.find('name', 'Prestige Car')
			//}
			endA = 'Car'
		} else if (type = 'cup') {
			//if (when == 'this') {
			//  prole = msg.guild.roles.find('name', 'Prestige Cup')
			//} else if (when = 'last') {
			prole = msg.guild.roles.find('name', 'Prestige Cup')
			//}
			endA = 'Cup'
		}

		if (user.roles.has('370811516309602307')) {
			color = '#4c4cff'
		} else if (user.roles.has('277031676906045450')) {
			color = '#00aa00'
		} else if (user.roles.has('279166847289524224')) {
			color = '#ffff4c'
		} else if (user.roles.has('339024651747590146')) {
			color = '#ff3232'
		}

		if (user.roles.has(prole.id)) {
			if (type = 'car') {
				endB = 'has the'
			} else if (type = 'cup') {
				endB = 'has completed the'
			}
			endC = '<:Tick:318378431051989003>'
		} else {
			if (type = 'car') {
				endB = 'does not have the'
			} else if (type = 'cup') {
				endB = 'has not completed the'
			}
			endC = '<:NoTick:318378431572344832>'
		}

		//api.success(`**Number of \`${crew.name}\` members with the \`${role.name}\` role:**\n${list.length}\n[${list}]`)
		api.embed(color, `${endC} \`${user.user.username} ${endB} Prestige ${endA}\``, '')
		//msg.reply(`\n<:Tick:318378431051989003> **Number of \`${crew.name}\` members with the \`${role.name}\` role:**\n${list.length}\n(${list})`)

	}

}

module.exports = LstatusCommand
