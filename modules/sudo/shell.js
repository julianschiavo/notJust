const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command
const config = require('../../config.json')
const SSH = require('simple-ssh');

const ssh = new SSH({
	host: config.server.host,
	user: config.server.username,
	pass: config.server.password
});

ssh.on('error', (err) => {
	ssh.end();
	throw new Error(err);
});

ssh.exec('exit', {
	exit: () => {
		ssh.reset();
	},
}).start();

const send = (code, text, msg, msgg) => {
	let color = code ? 'danger' : 'notdanger';
	const embed = new Discord.RichEmbed()
	embed.setTitle(msgg)
	if (color == 'danger') {
		embed.setColor('#FF0000')
	} else {
		embed.setColor('#00aa00')
	}
	embed.setDescription(text)
	embed.setFooter("Executed At", msg.author.avatarURL)
	embed.setTimestamp()
	msg.channel.send({
		embed
	});
}

class shellCommand extends Command {
  constructor() {
    super({
      name: 'shell',
      help: 'Run shell commands on server'
    })
  }

  hasPermission(message) {
   if (message.author.id == '193908323911860224') return true
    return false
  }

  async run(message, args, api) {
    args.splice(0,1)
    var msg = args
    
		var cmd = `ssh ${config.server.username}@${config.server.host} ${msg}`;

		var timeout = setTimeout(() => {
			console.warn(`Command Timeout : ${cmd}`);
			ssh.reset();
			return send('danger', 'Command Timeout', message);
		}, 5000);

		ssh.exec(`${msg}`, {
			exit: (code, stdout, stderr) => {
				clearTimeout(timeout);
				ssh.reset();
				return send(code, stdout || stderr, message, msg);
			},
		}).start();
    
/*exec(args.join(' '), {shell: "/bin/bash"}, (err, stdout, stderr) => {
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
    });*/
    return true
  }
}

module.exports = shellCommand
