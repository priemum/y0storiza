var members = []
var datas = []
module.exports = {
	name: 'buy', // اسم الامر
	description: "Buy Role", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
let row = await db.find({id: client.user.id})
if(row.length < 1) return;

let prefix = row[0] ? row[0].prefix : "#"
var msgs = ``
var C = 0
var data = []
for(const d of row[0].roles){
C++
let resulting = Math.floor(Number(d.credits)-(Number(d.credits)*(5/100)));
if(msgs.length < 1900) msgs = msgs + `\n [ ${C} ] Role: <@&${d.id}> | Credits: ${d.credits}`
data.unshift({content: C, role: d.id, credits: resulting, totl: d.credits})
}
if(members.includes(msg.author.id)) return client.createMessage(msg.channel.id, `**You Already request role**
Do you want to cancel your old requested ?`).then(async m =>{
await m.addReaction('✅')
await m.addReaction('❎')
client.on('messageReactionAdd', async (message, emoji, member) =>{
if(member.id !== msg.author.id || message.channel.id !== msg.channel.id || message.id !== m.id) return;
if(emoji.name === "✅"){
let d = datas.find(d => d.author === msg.author.id && d.dn === false && d.dns === false) || datas.find(d => d.author === msg.author.id && d.dn === true && d.dns === false)
d.dn = true
d.dns = true
members.shift(msg.author.id)
m.delete()
msg.delete()
}
if(emoji.name === "❎"){
m.delete()
msg.delete()
}
})
})
members.unshift(msg.author.id)
datas.unshift({dn: false, dns: false, id: msg.id, author: msg.author.id})

 client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Roles Shop",
      "description": msgs + `\n**Select One**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
}).then(mm =>{
client.on('messageCreate', async (message) => {
//${message.author.username}, has transferred \`$${P2}\` to <@${owner}>
if(message.channel.id !== msg.channel.id || datas.find(d => d.id === msg.id && d.dn === true)) return;
if(msg.author.id !== message.author.id) return;
let find = data.find(d => `${d.content}` === `${message.content}`)
if(find){
let d = datas.find(d => d.id === msg.id)
d.dn = true
message.delete()
mm.delete()
 client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Roles Shop",
      "description": `Please Transfer To <@${row[0].buyOwner}>, ${find.totl} credits!`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
}).then(m =>{
client.on('messageCreate', async (newmsg) => {
if(newmsg.channel.id !== message.channel.id || datas.find(d => d.id === msg.id && d.dns === true)) return;
if(newmsg.author.id !== row[0].probot) return;
if(newmsg.content !== `**:moneybag: | ${message.author.username}, has transferred \`$${find.credits}\` to <@!${row[0].buyOwner}> **` && 
newmsg.content !== `**:moneybag: | ${message.author.username}, has transferred \`$${find.credits}\` to <@${row[0].buyOwner}> **`
) return;
let d = datas.find(d => d.id === msg.id)
d.dns = true
m.delete()
members.shift(msg.author.id)
message.member.addRole(find.role)
 client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Roles Shop",
      "description": `**Done**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
})
})
}


})
 })
	},
};
