module.exports = {
  blacklistCheck: function (config,id) {
    if (config.indexOf(id) > -1) {
			return true
	}
  },
  moduleCheck: function (config,mod) {
    /*if (config.indexOf(id) > -1) {
			return true
	}*/
	  if (config.indexOf(mod) > -1) {
		  return true
	  }
  }
};
