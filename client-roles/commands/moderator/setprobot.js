module.exports = {
	name: 'setprobot', // اسم الامر
	description: "Edit ProBot of Buy", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
let row = await db.find({id: client.user.id})
if(row.length < 1) return;
let prefix = row[0] ? row[0].prefix : "#"

if(msg.author.id !== row[0].owner && msg.author.id !== row[0].buyOwner) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Roles Shop",
      "description": "Only Owner Bot or now Owner Can set Owner!",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
let user = await client.getRESTUser(args[0]).catch(err =>{}) || msg.mentions[0]

if(!user || !user.bot) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Roles Shop",
      "description": "I Can't Find This Bot!",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
 await db.updateOne({id: row[0].id}, {"probot": user.id})
client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Roles Shop",
      "description": `Done Move ProBot To <@${user.id}>`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
  }
}