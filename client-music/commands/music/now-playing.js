module.exports = {
	name: 'now-playing', // اسم الامر
	description: "Now Playing", // شرح الامر
	cooldown: 5, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {

let message = msg
let bot = client
if(!message.member || !message.member.voiceState || !message.member.voiceState.channelID) return bot.createMessage(message.channel.id , {
embed:{
  description:"**You must be in a voice room to use this command**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})
let connection = bot.voiceConnections.find(d => d.id == message.guildID)

if(connection){
if(connection.channelID !== message.member.voiceState.channelID) return bot.createMessage(message.channel.id , {
  embed:{
    description:`**You must be in this room [${bot.getChannel(connection.channelID) ? bot.getChannel(connection.channelID).name || "undefined" : "undefined"}]**`,
    color:2939330
  }
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


let embed = {
title: connection.now.title.slice(0 , 250),
color: connection.now.type === "video" || connection.now.videoId ? 2939330 : 2939330,
description: bot.util.embedFormat(connection)
}

bot.createMessage(message.channel.id , {embed})


}}