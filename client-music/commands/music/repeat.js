module.exports = {
	name: 'repeat', // اسم الامر
description: "get the current queue of the songs",
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

if((connection.songs.length > 0 || connection.now || connection.playing) && !connection.paused){

if(!message.member.permission.has("manageGuild")) return; 

if(connection.repeating === 0) {
connection.repeating = 1
return bot.createMessage(message.channel.id , {
embed:{
  description:`**The current song will be repeated**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})
}else
if(connection.repeating === 1) {
connection.repeating = 2
return bot.createMessage(message.channel.id , {
embed:{
  description:`**The playlist will be repeated completely**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})
}else{
connection.repeating = 0
return bot.createMessage(message.channel.id , {
embed:{
  description:`**Repeating has been stopped**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})
}

}else{
return bot.createMessage(message.channel.id , {
embed: {
  description: "**There is no music running**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})
}

}}