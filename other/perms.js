module.exports = {
  blacklistCheck: function (config,id) {
    if (config.indexOf(id) >= -1) {
			return true
		}
  }
};
