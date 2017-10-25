const Discord = require('discord.js'),
	cheerio = require('cheerio'),
	snekfetch = require('snekfetch'),
	querystring = require('querystring');

const Command = require('../../cmdModule/commands').Command

class srCommand extends Command {
	constructor() {
		super({
			name: 'search',
			help: 'Search text or an image',
			lhelp: '[img] {query}\n[img] is whether to search for an image or just text, it can be included anywhere in the command.\n{query} is the query to search for.'
		})
	}

	async run(message, args, api) {
		args.splice(0, 1);
		var argsg = args.join(' ');
		var image
		if (argsg.indexOf('img') >= 0 || argsg.indexOf('[img]') >= 0) {
			var query = argsg.replace('[img]', '').replace('img', '')
			query = encodeURIComponent(query)
			//https://www.google.com.hk/search?q=hi&tbm=isch
			let searchUrl = 'https://www.google.com/search?q=' + query + '&tbm=isch';

			// We will now use snekfetch to crawl Google.com. Snekfetch uses promises so we will
			// utilize that for our try/catch block.
			return snekfetch.get(searchUrl).then((result) => {

				// Cheerio lets us parse the HTML on our google result to grab the URL.
				let $ = cheerio.load(result.text);

				// This is allowing us to grab the URL from within the instance of the page (HTML)
				//let googleData = $('.r').first().find('a').first().attr('href');
				function randomN(min, max) {
					return Math.floor(Math.random() * (max - min + 1) + min);
				}
				var googleData = $('.r').first()
				var rNum = randomN(1, 100)
				googleData = googleData.find('img')
				googleData = googleData[rNum].attr('src');

				// Now that we have our data from Google, we can send it to the channel.
				googleData = querystring.parse(googleData.replace('/url?', ''));
				//searchMessage.edit(`Result found!\n${googleData.q}`);
				let embed = new Discord.RichEmbed()
				embed.setTitle('<:apple_face_sunglasses:359559678809866240> `Image Found Successfully`')
				embed.setDescription(String.fromCharCode(8203))
				embed.setColor('#00ff00')
				//embed.setTimestamp()
				embed.setFooter('Replying to ' + message.author.tag)
				//message.channel.send(message)
				embed.setImage(googleData);
				message.channel.send({
					embed
				})
				// If no results are found, we catch it and return 'No results are found!'
			}).catch((err) => {
				api.error(err)
			});



		}



		return true
	}
}

module.exports = srCommand
