module.exports = {
  blacklistCheck: function (config,id) {
    if (config.indexOf(id) > -1) {
			return true
	}
  },
  moduleCheck: function (config,command) {
    /*if (config.indexOf(id) > -1) {
			return true
	}*/
	  var modulename
	  const folders = ['admin','code','fun','light','media','prefs','sudo','utility']
	  const folderinitial = '../modules/'
const fs = require('fs');
	  //while
	  for (var i=folders.length-1; i>=0; i--) {
	  var cfolder = folderinitial + folders[i]
	  var cfoldern = folders[i]
fs.readdirSync(cfolder).forEach(file => {
  if (file.indexOf(command) > -1) {
	  modulename = cfoldern
  }
})
	  }
	  if (config.indexOf(modulename) > -1) {
		  return true
	  }
	  //end while
  }
};
