let Eris = require('eris')
const mongoose = require("mongoose")
const fs = require('fs')
module.exports = async function(token, db) {
let client = Eris(token, {restMode: true})

client.commands = new Eris.Collection()
let cooldowns = new Eris.Collection()

    fs.readdirSync(__dirname + "/commands/").forEach(dir => {
        const commands = fs.readdirSync(__dirname + `/commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let command = require(`./commands/${dir}/${file}`);
            if (command.name) {
                client.commands.set(command.name, command);
            }
        }
    })
client.on('ready', async () =>{
let row = await db.find({id: client.user.id})
if(row.length < 1) return;

client.editStatus(row[0].status, {
name: row[0].game,
type: 0, // 0 playing , 1 stream , 2 listen , 3 watch
url: null // رابط الستريم لو فيه
})
})

client.on('messageCreate', async (message) => {//con["blacklist"].includes(message.author.id)
	if (message.author.bot || !message.channel.guild) return;
let row = await db.find({id: client.user.id})
if(row.length < 1) return;
let prefix = row[0] ? row[0].prefix : "#"


if(message.channel.guild.id !== row[0].guild || row[0].time - Date.now() < 1) return;
let msg = message
if(msg.content === `<@${client.user.id}>` || msg.content === `<@!${client.user.id}>`) return client.createMessage(msg.channel.id, `**My perfix is \`${prefix}\` **`)
let commandNames = message.content.split(" ")[0].toLowerCase()


	let args = message.content.slice(prefix.length).trim().split(/ +/);

	let commandName = args.shift().toLowerCase();

if(!message.content.startsWith(prefix)) return;


const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) || client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Eris.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		let expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
	timestamps.set(message.author.id, now + 6000);
		return client.createMessage(message.channel.id, ` please wait **${timeLeft.toFixed(1)}** more second(s) before reusing the \`${command.name}\` command.`)
.then(m =>{setTimeout((c)=>{

m.delete()

      }, 3 * 1000)
}, 3 * 1000)
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(client , message, args, db);
	} catch (error) {
 		console.error(error);
		client.createMessage(message.channel.id, 'there was an error trying to execute that command!');
	}

})

client.connect()
}