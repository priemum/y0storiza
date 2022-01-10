module.exports = {
	name: 'info', // اسم الامر
	description: "Info System", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
if(!msg.member.permission.has("manageRoles")) return client.createMessage(msg.channel.id, `**Missing Permission**`)
let row = await db.find({id: client.user.id})
if(row.length < 1) return;
let prefix = row[0] ? row[0].prefix : "#"
client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Bc Settings",
      "description": `Done Send to ${row[0].dns.length}
I can't send to ${row[0].errs.length}`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})

  }
}