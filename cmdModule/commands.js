const parseArgs = require('./parseArgs')
const command = require('./command')
const api = require('./api')
const path = require('path')
const klaw = require('klaw')

class CommandHandler {
  /**
   * @typedef {Object} CommandHandlerOptions
   * @property {Discord.Client} bot - discord.js client
   * @property {string} prefix - Command prefix
   */

  /**
   * @param {CommandHandlerOptions} options - The options for the Commandhnadler
   */
  constructor(options) {
    if (typeof options !== 'object') throw new TypeError('Options must be an object.')
    if (!options.bot) throw new TypeError('Bot must be defined.')

    /**
     * Discord.js client
     * @type {Discord.Client}
     */
    this.bot = options.bot

    /**
     * Command prefix
     * @type {string}
     */
    this.prefix = options.prefix

    this.modules = {}

    this.commands = {}

    let items = []
    klaw(path.join(__dirname, '..', 'modules'))
      .on('data', (item) => {
        items.push(item.path)
      })
      .on('end', () => {
        items.forEach((file) => {
          let arr
          if(process.platform == 'win32') {
            // running windows
            arr = file.split('\\').reverse()
          } else {
            // something other than windows (hopefully *nix based :P)
            arr = file.split('/').reverse()
          }
          if(!arr) {
            throw new Error(`Your paths could not be split properly. Please send this error message to Relative.\nplatform: ${process.platform}\nFile: ${file}`)
          }
          if (file.endsWith('.js')) this.registerCommand(arr[0].replace('.js', ''), arr[1])
        })
      })
  }

  /**
   * @param {string} name - The command name to register
   * @param {string} mod - The module of the command
   */
  registerCommand(name, mod) {
    if (typeof name !== 'string') throw new TypeError('Name must be a string.')
    try {
      let cmd = require(path.join(__dirname, '..', 'modules', mod, name + '.js'))
      console.log(typeof cmd)
      if (typeof cmd == 'object') {
        for(let _c in cmd) {
          if(!cmd.hasOwnProperty(_c)) continue
          let c = cmd[_c]
          let ca = new c()
          this.commands[ca.name] = {
            command: ca,
            module: mod
          }
          this.loadCommand(ca.name)
        }
      } else {
        this.commands[name] = {
          command: new cmd(),
          module: mod
        }
        return this.loadCommand(name)
      }
      
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * @param {string} command - Command to load
   */
  loadCommand(command) {
    if (typeof command !== 'string') throw new TypeError('Command must be a string.')
    if (!this.commands[command]) throw new Error('Command has not been registered.')
    try {
      this.commands[command].command.load()
      return true
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * @param {string} command - Command to unload
   */
  unloadCommand(command) {
    if (typeof command !== 'string') throw new TypeError('Command must be a string.')
    if (!this.commands[command]) throw new Error('Command has not been registered.')
    if (!this.commands[command].command.loaded) throw new Error('Command is not loaded.')
    try {
      this.commands[command].command.unload()
      this.commands[command] = null
      let reqPath = path.join(__dirname, '..', 'modules', this.commands[command].module, command + '.js')
      delete require.cache[reqPath]
      require(reqPath)
      return true
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Register a module for prettified naming in help command
   * @param {string} name 
   * @param {string} prettyName 
   */
  registerModule(name, prettyName) {
    this.modules[name] = prettyName
    return true
  }



  /**
   * @param {string} command - Command to reload
   */
  reloadCommand(command) {
    if (typeof command !== 'string') throw new TypeError('Command must be a string.')
    if (!this.commands[command]) throw new Error('Command has not been registered.')
    try {
      this.unloadCommand(command)
      this.loadCommand(command)
      return true
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * @param {Discord.Message} message - Message to handle
   */
  handleMessage(message) {
    if (!message) throw new TypeError('Message must be a Message.')
    try {
      let prefix = this.prefix
      let _content = message.content
      if (!_content.startsWith(prefix)) return false
      if (_content == prefix) return false
      var preff = prefix + ' '
      if (_content == preff) return false
      let content = _content.substr(prefix.length - 1)
      let args = parseArgs(content)
      if (!this.commands[args[0]]) return false
      let command = this.commands[args[0]].command
      if (command.loaded == false) return false
      var check = require('./perms').blacklistCheck(message.client.settings.get('global').blacklistedUsers,message.author.id)
      console.log(command)
      //var check2 = require('./perms').moduleCheck(message.client.settings.get('global').disabledModules,command)
      if (command.hasPermission(message) && !check) {
        try {
          command.run(message, args, new api(message, args, this))
          //message.react(`:green_tick:330712173288488960`)
        } catch (err) {
          //message.react(`:red_tick:330712188681453590`)
          return new api(message, args, this).error(`An error occured! ${err}`)
        }
        
        return true
      } else if (!check) {
        let apx = new api(message, args, this)
        return apx.error('You cannot execute that command.\nThis may occur because it is a premium command and this is not a premium server, or because you do not have necessary permissions to execute the command\'s action.')
      }
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = {
  CommandHandler: CommandHandler,
  CommandApi: api,
  Command: command
}
