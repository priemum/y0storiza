module.exports = {
	name: 'queue', // اسم الامر
description: "get the current queue of the songs",
	cooldown: 5, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
let message = msg
let bot = client
if(!message.member || !message.member.voiceState || !message.member.voiceState.channelID) return bot.createMessage(message.channel.id , {
embed:{
  description:"**You must be in a voice room to use this command**",
  color:2939330
}})
let connection = bot.voiceConnections.find(d => d.id == message.guildID)

if(connection){
if(connection.channelID !== message.member.voiceState.channelID) return bot.createMessage(message.channel.id , {
  embed:{
    description:`*You must be in this room [${bot.getChannel(connection.channelID) ? bot.getChannel(connection.channelID).name || "undefined" : "undefined"}]**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }  }
})
}else{
return bot.createMessage(message.channel.id , {
embed: {
  description: "**There is no music running**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})
}

if(!connection.now || !connection.playing){
return bot.createMessage(message.channel.id , {
embed: {
  description: "**There is no music running**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})
}

let page = Number(args[0]) - 1 || 0
  
let embed = {
title: connection.now.title.slice(0 , 250),
color: connection.now.type === "video" || connection.now.videoId ? 2939330 : 2939330,
description:  connection.songs.slice((page * 8) , (page * 8) + 8).map(value => 
`> ${bot.util.numberFormat(connection.songs.indexOf(value) + 1)} ${value.type === "video" || value.videoId ? "🔴" : "🟠"} **${value.title}**`
).join("\n"),
	footer: {
		text: `Page : ${page + 1}/${Math.ceil(connection.songs.length / 8)}`
  }
}

if(!embed.description || embed.description.length < 1) embed.description = "**There is no music in queue**"  

bot.createMessage(message.channel.id , {embed})

}}