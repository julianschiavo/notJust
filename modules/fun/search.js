const Discord = require('discord.js');
/*const cheerio = require('cheerio'),
      snekfetch = require('snekfetch'),
      querystring = require('querystring');*/
var Scraper = require('images-scraper'),
	yahoo = new Scraper.Yahoo();

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
		

		function randomN(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
		if (argsg.indexOf('img') >= 0 || argsg.indexOf('[img]') >= 0) {
			var query = argsg.replace('[img]', '').replace('img', '')
			//query = encodeURIComponent(query)
			//https://www.google.com.hk/search?q=hi&tbm=isch
			//let searchUrl = 'https://www.google.com/search?q=' + query + '&tbm=isch';

			/*return snekfetch.get(searchUrl).then((result) => {
				let $ = cheerio.load(result.text);

				//let googleData = $('.r').first().find('a').first().attr('href');
				
				//message.channel.send($('.y').first().find('ivg-i').first().find('a').first().attr('src'))
				//var googleData = $('.y').first().find('ivg-i').first().find('a').first().attr('src');
				//var rNum = randomN(1, 100)
				//googleData = googleData.find('img')
				//googleData = googleData.first().attr('src');
				var googleData = $('img').eq(Math.floor(Math.random() * 10)).attr('src')
				//googleData = querystring.parse(googleData.replace('/imgres?imgurl=', ''));
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
			});*/

			yahoo.list({
					keyword: query,
	num: 100,
	detail: true
				})
				.then(function(res) {
					//console.log('first 10 results from bing', res[1].url);
					let embed = new Discord.RichEmbed()
					embed.setTitle('<:apple_face_sunglasses:359559678809866240> `Image Found Successfully`')
					embed.setDescription(String.fromCharCode(8203))
					embed.setColor('#00ff00')
					//embed.setTimestamp()
					embed.setFooter('Replying to ' + message.author.tag)
					//message.channel.send(message)
					var rN = randomN(1, 100)
					embed.setImage(res[rN].url);
					message.channel.send({
						embed
					})
				}).catch(function(err) {
				if (err.indexOf('undefined') >= 0) {
					api.error('No results were returned for that query, or it was an invalid query.')
				} else if err.indexOf('no keyword') >= 0) {
					api.error('Please specify a query.')
				} else {
					api.error(err);
				}
				})



		}



		return true
	}
}

module.exports = srCommand
