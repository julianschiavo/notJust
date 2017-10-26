const Command = require('../../cmdModule/commands').Command

class LcodeCommand extends Command {
	constructor() {
		super({
			name: 'hf93ghe2ak6fr7cxcr39b6',
			help: 'Secret command'
		})
	}

	hasPermission(message) {
		//if (message.channel.type == 'text') return false
		return true
	}

	async run(msg, args, api) {
		if (msg.channel.type == 'text') {
			msg.delete()
			api.embed('#00ff00', `<:red_tick:330712188681453590> \`You MUST run this command in DMs.\``, 'If you run this command again out of DMs you risk being banned from #code as you are ruining the game for everyone.')
			return
		}
		let guild = msg.client.guilds.find("name", "dotHub");
		var user = guild.member(msg.author);
		var role = guild.roles.find('name', 'Stage 2')

		user.addRole(role)

		//msg.delete()

		api.embed('#00ff00', `<:green_tick:330712173288488960> \`You have moved into #code Stage 2!\``, '')
	}

}

module.exports = LcodeCommand
