module.exports = {
	name: 'play', // اسم الامر
	description: "play music", // شرح الامر
	cooldown: 5, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
    let row = await db.find({id: msg.channel.guild.id})
let prefix = row[0] ? row[0].prefix : "$"

let message = msg
let bot = client
if(!message.member || !message.member.voiceState || !message.member.voiceState.channelID) return bot.createMessage(message.channel.id , {
embed:{
  description:"**<:no:839305037007814656> You must be in a voice room to use this command**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})
let connection = bot.voiceConnections.find(d => d.id == message.guildID)

if(connection){
if(connection.channelID !== message.member.voiceState.channelID) return bot.createMessage(message.channel.id , {
  embed:{
    description:`**You must be in this room [${bot.getChannel(connection.channelID) ? bot.getChannel(connection.channelID).name || "undefined" : "undefined"}]**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }  }
})
}else{
let join = await await new Promise((re , rej) =>{
bot.joinVoiceChannel(message.member.voiceState.channelID).then(re).catch(e => re())
})
if(!join) return bot.createMessage(message.channel.id , {
embed:{
  description:"**I can't Join this room , please check my permissions**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})
connection = join
bot.util.connectionSetup(join , message , message.member.voiceState.channelID , bot)
}

if(connection.now && connection.paused && args.length < 1) {
try{
connection.resume()
return bot.createMessage( message.channel.id , {
embed:{
  description:`****${connection.now.title} Has been resumed**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}}) 
} catch {}
}

if(args.length < 1) return bot.createMessage( message.channel.id ,{
    embed:{
      description:`**Music play**\n**${prefix}play** Youtube Link\n**${prefix}play** Sound cloud link\n**${prefix}play** Youtube Search`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }    }
} )

bot.createMessage(message.channel.id , {
embed:{
  description:`🔎 **Searching: ${args.join(" ")}**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}}).then(async msg =>{
if(!msg || !msg.id) throw new Error(".")

let searchQuery1 = await bot.util.search(args.join(" "))

if(!searchQuery1) return msg.edit({
embed:{
  description:"**No Results**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})

let searchQuery = await bot.util.search(searchQuery1.title)

if(!searchQuery) return msg.edit({
embed:{
  description:"**No Results**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})
let data = await bot.util.play(connection , searchQuery , message).catch(err =>{})

msg.edit({embed:{
  description :`** ${data.song ? `Start playing : ${data.song}\n` : ""} ${data.added
? typeof data.added === "number" ? `Added ${data.added} song` 
: `ِAdded : ${data.added}`
: ""}**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})

}).catch(err => {return console.log(err)})

}}