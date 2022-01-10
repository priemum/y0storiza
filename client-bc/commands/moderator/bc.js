module.exports = {
	name: 'bc', // اسم الامر
	description: "Bc System", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
if(!msg.member.permission.has("manageRoles")) return client.createMessage(msg.channel.id, `**Missing Permission**`)

let collection = db
let row = await db.find({id: client.user.id})
if(row.length < 1) return;
let token1;
let token = row[0]
await collection.updateOne({token: token.token}, { errs: []})
await collection.updateOne({token: token.token}, { dns: []})
var title = args.slice(0).join(" ") || "test"
var description;
var pic;
var dn = false
var dns = false
dn = true
var dnss = false
client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Bc Settings",
      "description": `[1] Online (${msg.channel.guild.members.filter(d => d.status).length})\n[2] All (${msg.channel.guild.memberCount})`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
}).then(mm =>{
client.on('messageCreate', async (newmsg2) =>{
if(newmsg2.author.bot || !newmsg2.content || msg.channel.id !== newmsg2.channel.id || msg.author.id !== newmsg2.author.id || dnss) return;
var alldns = []
if(newmsg2.content === "2"){
newmsg2.delete()
mm.delete()
token.dns = 0
token.errors = 0
dnss = true
client.createMessage(msg.channel.id, `**جارى الأرسال :white_check_mark: **`)
var HH = 0
for(const data of msg.channel.guild.members){
HH++
let data1 = msg.channel.guild.members.get(data[0])
if(data1){
if(data1 && data1.clientStatus){
alldns.unshift(args[0])
let user = await client.getDMChannel(data[0]).catch(async err =>{ 
await collection.updateOne({token: token.token}, { $push: { errs: data[0]}}) })
if(user) await collection.updateOne({token: token.token}, { $push: { dns: data[0]}})
if(user) user.createMessage(title + `\n<@${data[0]}>`)
}
}
}

}
if(newmsg2.content === "1"){
dnss = true
var alldns = []
newmsg2.delete()
mm.delete()
client.createMessage(msg.channel.id, `**جارى الأرسال :white_check_mark: **`)
var HH = 0

for(const data of msg.channel.guild.members){
HH++
let data1 = msg.channel.guild.members.get(data[0])
if(data1){
alldns.unshift(args[0])

let user = await client.getDMChannel(data[0]).catch(async err =>{
await collection.updateOne({token: token.token}, { $push: { errs: data[0]}}) })
if(user) await collection.updateOne({token: token.token}, { $push: { dns: data[0]}})
if(user) user.createMessage(title + `\n<@${data[0]}>`)
}
}

}
})
dns = true



})

  }
}