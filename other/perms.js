module.exports = {
  check: function (module, command, config) {
    if (config.indexOf(module) >= -1) {
			return true
		}
  }
};
