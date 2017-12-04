const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command
const exec = require('child_process').exec;

class shellCommand extends Command {
  constructor() {
    super({
      name: 'shell',
      help: '⚠️ Run shell commands on server'
    })
  }

  hasPermission(message) {
   if (message.guild && message.author.id == '193908323911860224') return true
    return false
  }

  async run(message, args, api) {
    args.splice(0,1)
exec(args.join(' '), {shell: "/bin/bash"}, (err, stdout, stderr) => {
        if (err) {
           api.error("The command returned an error.\nCheck system console for more details.");
            console.log("Shell: " + err); return;
        }

        let reply = stdout + stderr;
        if (!reply.length) {
           // if (pm.botHasPermission(msg, "ADD_REACTIONS")) msg.react("👌");
        } else {
        message.channel.send(`\`\`\`${reply}\`\`\``)
        }
    });
    return true
  }
}

module.exports = shellCommand
