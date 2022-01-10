module.exports = {
	name: 'ping', // اسم الامر
	description: "ping of bot", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
let databaseDate = Date.now()

let row = await db.find({id: client.user.id})
if(row.length < 1) return;
let prefix = row[0] ? row[0].prefix : "#"
let databaseping = Date.now() - databaseDate
 client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Bc Bot".replace('[prefix]', prefix),
      "description": `**DataBase Ping: ${databaseping}\nBot Ping:**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
}).then(m =>{
if(m) m.edit({
  "embed": 
    {
      "title": "Bc Bot".replace('[prefix]', prefix),
      "description": `**DataBase Ping: ${databaseping}\nBot Ping: ${m.timestamp - msg.timestamp}**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})})
	},
};
