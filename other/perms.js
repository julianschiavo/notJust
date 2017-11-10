function check(mod,cmd,message) {
		if (message.client.settings.get('global').includes(mod)) {
			return true
		}
}
