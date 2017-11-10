const Discord = require('discord.js')
const config = require('../config.json')

class PermsApi {
check(module,command,message) {
		if (message.client.settings.get('global').includes(module)) {
			return true
		}
}
}


module.exports = PermsApi
