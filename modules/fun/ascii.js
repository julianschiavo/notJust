const Discord = require('discord.js');
const twemoji = require('twemoji');
const Command = require('../../cmdModule/commands').Command;
const fs = require('fs');
const im = require('imagemagick');
const gm = require('gm').subClass({imageMagick: true});
var request = require('request');
var https = require('https');
const download = require('image-downloader')

class asciiCommand extends Command {
	constructor() {
		super({
			name: 'ascii',
			help: 'Convert text or an emoji into ascii'
		})
	}
	
	hasPermission(message) {
		if (message.guild && (message.client.settings.get(message.guild.id).isDonator == true || message.author.id == require('../../config.json').owner)) return true
		return false
	}

	async run(message, args, api) {
		args.splice(0, 1)
		if (!args[0]) {
			api.error('Please provide text or an emoji to convert into ascii.')
		}
		var arg = args[0]

		function rEmoji(string) {
			var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
			return string.replace(regex, 'EMOJI');
		}
		var erg = rEmoji(arg)
var link
		if (arg.indexOf('<') >= 0) {
			arg = arg.replace(/\D/g, '');
			link = 'https://cdn.discordapp.com/emojis/' + arg + '.png'
		} else if (erg.indexOf('EMOJI') >= 0) {
			var arg = twemoji.convert.toCodePoint(arg)
			link = 'https://raw.githubusercontent.com/twitter/twemoji/gh-pages/2/72x72/' + arg + '.png'
		} else {
			api.error('Please provide text or an emoji to convert into ascii.')
		}
var output
const options = {
  url: link,
  dest: 'tmp'                  // Save to /path/to/dest/image.jpg
}
	
download.image(options)
  .then(({ filename, image }) => {
    console.log('File saved to', filename)
	conv(filename)
  }).catch((err) => {
    throw err
  })
		
function conv(path) {
im.convert([path, '-trim', '-negate', '-background', 'White', '-alpha', 'remove', '-resize', '130x130', '-colorspace', 'Gray', '-dither', 'FloydSteinberg', '-colors', '2', '-monochrome', '-compress', 'None', 'pbm:-'],
	function(err, stdout) {
		if (err) throw err;
	console.log(err);
		//console.log('stdout:', stdout);
    done(stdout);
	});
}


//link = 'http://www.haziallat.hu/upload/4/article/4335/nyugati-sirly_width.jpg'
		
//https.get(link, function(response) {
    /*gm(response, 'image.jpg')
        .write('test.jpg', function(err) {
            if (err) return handle(err);
            console.log('Created an image from a Buffer!');
        });*/
	
//var endboi;
/*gm(response, 'image.png')
.command('convert')
.in("-trim -background white -alpha remove" + (1 ? " -resize 130x130" : "") + " -colorspace Gray -dither FloydSteinberg -colors 2 -monochrome " + " -compress None pbm:-")
.toBase64('png', toDataUri, function(err, base64){
    var buffer = new Buffer(base64, 'base64');
    endboi = decode64(buffer)
    done(endboi)
});*/
	/*.stream(function (err, stdout, stderr) {
	console.log(err)
	console.log(stdout)
	//console.log(stderr)
  done(end);
});*/
/*.output(function (err, stdout, stderr) {
	console.log(err)
	console.log(stdout)
	//console.log(stderr)
  done(end);
});*/
//});
		
		function done(out) {
out = out.toString().split("\n");
out.shift();
var x = parseInt(out.shift().split(" ")[0]);
out = out.join("").replace(/\s/g, "");
out = splitNChars(out, x);
out = out.join("\n");
out = require("../../utils/braille.js")(out);
out = out.replace(/[\u2800 ]{1,}$/gm, '');
console.log(out)
			alldone(out)
}
		  
function splitNChars(txt, num) {
	var result = [];
	for (var i = 0; i < txt.length; i += num) {
		result.push(txt.substr(i, num));
	}
	return result;
}
    function alldone(out) {
    			let embed = new Discord.RichEmbed()
			embed.setFooter('Replying to ' + message.author.tag)
			embed.setTitle('<:apple_alien:359560556841271296> `Ascii Generated`')
			embed.setDescription(String.fromCharCode(8203))
			embed.setColor('#00ff00')
      //embed.setImage(link)
	    embed.addField('`Input`', arg, false)
			//embed.addField('`Output`', '```' + out + '```', false)
			message.channel.send({
				embed
			})
	    message.channel.send(out)
    }

	}
}

module.exports = asciiCommand
