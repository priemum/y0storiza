module.exports = {
	name: 'idea', // اسم الامر
	description: "Help Of Commands", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
let row = await db.find({id: client.user.id})
if(row.length < 1) return;
let prefix = row[0] ? row[0].prefix : "#"

let user = await msg.author.getDMChannel().catch(err =>{
  msg.addReaction("❎")
})
if(user) msg.addReaction("✅")
if(user) user.createMessage("https://discord.gg/BHVHJCJVTX")
	},
};
