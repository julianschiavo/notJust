const Command = require('../../cmdModule/commands').Command

class LcountCommand extends Command {
	constructor() {
		super({
			name: 'list',
			help: 'Member listing',
			lhelp: '{crew letter} [z]\n{crew letter} is B or G or Y or R, what crew to list prestige car + cup for.\n[z] If z is specified, the list will be of the crew\'s user\'s nicks/timezones rather than prestige status'
		})
	}

	hasPermission(message) {
		if (message.guild) {
		let dotGuildMember = message.guild.members.get(message.author.id)
		if (message.guild && message.guild.id == '277006003797491712') return true
		}
		return false
	}

	async run(msg, args, api) {
		if (!args[1]) {
			//msg.reply('<:NoTick:318378431572344832> Please remember to specify the crew (G/Y/R) and type of count (car/cup)!')
			api.error('Please remember to specify the crew (B/G/Y/R)!')
			return;
		}
		var argg = args[1].toLowerCase()
		var arggg
		if (args[2]) {
			arggg = args[2].toLowerCase()
		}
		var crew
		var color
		var endd
		var zz = 'f'
		if (argg.indexOf('b') > -1) {
			crew = msg.guild.roles.find('name', 'Bluelight')
			color = '#4c4cff'
			endd = crew.name
		} else if (argg.indexOf('g') > -1) {
			crew = msg.guild.roles.find('name', 'Greenlight')
			color = '#00aa00'
			endd = crew.name
		} else if (argg.indexOf('y') > -1) {
			crew = msg.guild.roles.find('name', 'Yellowlight')
			color = '#ffff4c'
			endd = crew.name
		} else if (argg.indexOf('r') > -1) {
			crew = msg.guild.roles.find('name', 'Redlight')
			color = '#ff3232'
			endd = crew.name
			/*} else if (argg.indexOf('all') > -1) {
			  crew = msg.guild.roles.find('name', 'Members')
			  color = '#fff'
			  endd = "All"
			  nick = true*/
		}

		if (arggg) {
			if (arggg.indexOf('z') > -1 | arggg.indexOf('nick') > -1 | arggg.indexOf('zone') > -1) {
				zz = 't'
			}
		}

		/*var role
		var rname
		if (args[2].indexOf('car') > -1) {
		  role = msg.guild.roles.find('name', 'Prestige Car').id
		  rname = msg.guild.roles.find('name', 'Prestige Car').name
		} else if (args[2].indexOf('cup') > -1) {
		  role = msg.guild.roles.find('name', 'Prestige Cup').id
		  rname = msg.guild.roles.find('name', 'Prestige Cup').name
		}*/

		if (zz !== 't') {
			var role1 = msg.guild.roles.find('name', 'Prestige Car')
			var role2 = msg.guild.roles.find('name', 'Prestige Cup')

			var members1 = crew.members
			var members2 = crew.members

			var list1 = members1.filter(user => {
				return user.roles.has(role1.id)
			}).map(user => {
				if (msg.guild.member(user.user.id).nickname !== null) {
					return msg.guild.member(user.user.id).nickname
				} else {
					return user.user.username
				}
			}).join('` | `')

			var list2 = members2.filter(user2 => {
				return user2.roles.has(role2.id)
			}).map(user2 => {
				if (msg.guild.member(user2.user.id).nickname !== null) {
					return msg.guild.member(user2.user.id).nickname
				} else {
					return user2.user.username
				}
			}).join('` | `')

			list1 = "`" + list1 + "`"
			list2 = "`" + list2 + "`"

			var count1 = list1.replace(/[^|]/g, "").length
			var count2 = list2.replace(/[^|]/g, "").length

			if (count1 >= '1') {
				count1 = count1 + 1
			}

			if (count2 >= '1') {
				count2 = count2 + 1
			}

			console.log(count1)
			console.log(count2)

			api.evalembed(color, `<:Tick:318378431051989003> \`Prestige List for ${endd} Members:\``, role1.name + " Count: " + count1, role1.name + " List: " + list1, role2.name + " Count: " + count2, role2.name + " List: " + list2)
		}
		if (zz == 't') {
			var members = crew.members

			var list = members.filter(user => {
				if (msg.guild.member(user.user.id).nickname !== null) {
					return user
					//} else {
					//
				}
				//
				//return user.roles.has(role1.id)
			}).map(user => {
				if (msg.guild.member(user.user.id).nickname !== null) {
					return msg.guild.member(user.user.id).nickname
				} else {
					return
				}
			}).join('` | `')

			list = "`" + list + "`"

			var count = list.replace(/[^|]/g, "").length

			if (count >= '1') {
				count = count + 1
			}

			api.evalembed("#ffffff", `<:Tick:318378431051989003> \`Timezone List for ${endd} Members:\``, "Nickname/Timezone" + " Count:", count, "Nickname/Timezone" + " List:", list)
		}

		/*members.map(user => {
		  console.log(user.user.username)
		  return user
		}).filter(user => {
		  console.log(user.roles.has(role))
		})*/

		//for(i = 0; i < members.length; i++){
		/*function eachh(one, two, three) {
		  var thisi = two
		  console.log(thisi.username)
		  //return;
		  if (thisi.roles.has(role)) {
		    list.push(thisi.username);
		  }
		}*/
		//console.log(list)
		//api.success(`**Number of \`${crew.name}\` members with the \`${role.name}\` role:**\n${list.length}\n[${list}]`)
		//api.embed(color, `<:Tick:318378431051989003> \`${crew.name} members with the ${rname} role:\``, `${count}\n(${list})`)



		//msg.reply(`\n<:Tick:318378431051989003> **Number of \`${crew.name}\` members with the \`${role.name}\` role:**\n${list.length}\n(${list})`)

	}

}

module.exports = LcountCommand
