const Discord = require('discord.js')
const config = require('../config.json')

class PermsApi {
check(mod,cmd,message) {
		if (message.client.settings.get('global').includes(mod)) {
			return true
		}
}
}

module.exports = PermsApi
