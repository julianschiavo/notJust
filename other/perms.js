module.exports = {
  check: function (mod, cmd, message) {
    if (message.client.settings.get('global').indexOf(mod) >= -1) {
			return true
		}
  }
};
