const pms = require("pretty-ms")
let random = require('random-id-generator')
const imageToBase64 = require('image-to-base64');
const got = require('got')
module.exports = {
	name: 'vip', // اسم الامر
	description: "Premium Setting", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
let row = await db.find({id: client.user.id})
if(row.length < 1) return;
let prefix = row[0] ? row[0].prefix : "#"

if(!args[0] || args[0] === "info") return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Premium Settings",
      "description": `Purchase By <@${row[0].owner}>\nPremium Ends In [time]\nPremium Number ${row[0].number}`.replace('[time]', pms(row[0].time - Date.now(), { verbose: true })),
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
if(args[0] === "reinvite"){
  if(msg.author.id !== row[0].owner) return client.createMessage(msg.channel.id,{
  "embed": 
    {
      "title": "Premium Settings",
      "description": "Only Owner Bot Can use This Command!",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
 await db.updateOne({id: row[0].id}, {"invite": random(16)})
msg.addReaction('✅')
}

if(args[0] === "invite"){
if(msg.author.id !== row[0].owner) return client.createMessage(msg.channel.id,{
  "embed": 
    {
      "title": "Premium Settings",
      "description": "Only Owner Bot Can use This Command!",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
let user = await msg.author.getDMChannel().catch(err =>{
  msg.addReaction("❎")
})
if(user) msg.addReaction("✅")
if(user) user.createMessage(`https://discord.com/oauth2/authorize?client_id=${row[0].id}&scope=bot&response_type=code&redirect_uri=https://idea-group.glitch.me/api/invite&permissions=2080374975&state=${row[0].invite}\nلا تنشر هذا الرابط!`)

}
if(args[0] === "prefix"){
if(!msg.member.permission.has("manageRoles")) return client.createMessage(msg.channel.id, `**Missing Permission**`)
 await db.updateOne({id: row[0].id}, {"prefix": args[1] || "#"})
return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Premium Settings",
      "description": "**Done**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})

}

if(args[0] === "move"){
if(msg.author.id !== row[0].owner) return client.createMessage(msg.channel.id,{
  "embed": 
    {
      "title": "Premium Settings",
      "description": "Only Owner Bot Can use This Command!",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
let user = await client.getRESTUser(args[1]).catch(err =>{}) || msg.mentions[0]
if(!user) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Premium Settings",
      "description": "I Can't Find This user!",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Premium Settings",
      "description": "To Move Owner send `sure`\nNote You Have move owner to " + `<@${user.id}>!`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
}).then(m =>{
var dn = false
client.on('messageCreate', async (message) => {
if(message.author.id !== msg.author.id && dn) return;

if(message.channel.id !== msg.channel.id){
m.delete()
dn = true
}

if(message.content !== "sure"){
m.delete()
dn = true
}

if(!dn){

 await db.updateOne({id: row[0].id}, {"invite": random(16)})

 await db.updateOne({id: row[0].id}, {"owner": user.id})
m.delete()
client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Premium Settings",
      "description": `Done Move Owner To <@${user.id}>`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
}

})
})
}
let message = msg
if(args[0] === "status"){
if(!msg.member.permission.has("manageRoles")) return client.createMessage(msg.channel.id, `**Missing Permission**`)
if(!args[1]) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Premium Settings",
      "description": "**select one please 'online', 'idle', 'dnd', 'offline'",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
let status = args[1].replace('offline', 'invisible')
let list = ['online','idle','dnd','invisible']
if(!list.includes(status)) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Premium Settings",
      "description": "**select one please 'online', 'idle', 'dnd', 'offline'",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
await client.editStatus( status , {
name: row[0].game,
type: 0, // 0 playing , 1 stream , 2 listen , 3 watch
url: null // رابط الستريم لو فيه
})
 await db.updateOne({id: row[0].id}, {"status": status})
return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Premium Settings",
      "description": "**Done**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
}
if(args[0] === "game"){
if(!msg.member.permission.has("manageRoles")) return client.createMessage(msg.channel.id, `**Missing Permission**`)
let status = args.slice(1).join(" ") || "[none]"
if(status === '[none]'){
client.editStatus( row[0].status , {})
}else{
client.editStatus(row[0].status, {
name: status,
type: 0, // 0 playing , 1 stream , 2 listen , 3 watch
url: null // رابط الستريم لو فيه
})
}
 await db.updateOne({id: row[0].id}, {"game": status})

return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Premium Settings",
      "description": "**Done**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
}
if(args[0] === "avatar"){
if(!msg.member.permission.has("manageRoles")) return client.createMessage(msg.channel.id, `**Missing Permission**`)
let url = msg.attachments[0]
if(url) url = url.url
if(!url) url = args[1]
if(!url) return client.createMessage(msg.channel.id, `**خطا في الصورة!**`)

    try {

        const response = await got(url, { responseType: 'buffer' });
        const buffer = response.body;
var able = true
 client.createMessage(msg.channel.id, `Testing..`, [{file:buffer, name: "profile.jpg"}]).catch(err =>{
able = false
}).then(msgs =>{
msgs.delete()
if(!able) return client.createMessage(msg.channel.id, `**خطا في الصورة!**`)
imageToBase64(url).then((response) => {
var ables = true
client.editSelf({avatar: `data:text/plain;base64,` + response}).catch(err =>{
 ables = false
return client.createMessage(msg.channel.id, `**${err.message.replace('Invalid Form Body', '').replace('  avatar: ', '').replace('\n', '')}**`)
}).then(m =>{
if(ables) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Premium Settings",
      "description": "**Done**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
})
})
 })
    } catch (error) {
return client.createMessage(msg.channel.id, `**خطا في الصورة!**`)
    }

}

if(args[0] === "name"){
if(!msg.member.permission.has("manageRoles")) return client.createMessage(msg.channel.id, `**Missing Permission**`)
var able = true
client.editSelf({username: args.slice(1).join(" ") || "Storiza Group"}).catch(err =>{
able = false
return client.createMessage(msg.channel.id, `**${err.message.replace('Invalid Form Body', '').replace('  username: ', '').replace('\n', '')}**`)
}).then(m =>{
if(able) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Premium Settings",
      "description": "**Done**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
    }
  
})
})
}


  }
}