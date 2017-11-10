check(module,command,message) {
		if (message.settings.get('global').includes(module)) {
			return true
		}
}
