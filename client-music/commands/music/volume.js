module.exports = {
	name: 'volume', // اسم الامر
description: "change the volume of the player",
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

let vol = args[0]
if(!vol) return bot.createMessage(message.channel.id , {
  embed:{
  description : `${bot.util.vol(connection.volume * 100)} ** The current volume level is : ${connection.volume * 100}**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }  }})
  
vol = Math.floor(vol)
if(!vol || vol === NaN) return bot.createMessage(message.channel.id , {
  embed:{
  description : `**You must enter a vaild number!**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }  }})
if(0 > vol || vol > 150) return bot.createMessage(message.channel.id , {
  embed:{
  description : `**Volume number must be between [0 - 150]**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }  }})

connection.setVolume(vol / 100)

return bot.createMessage(message.channel.id , {
  embed:{
  description : `${bot.util.vol(vol)} **The volume has changed to: ${vol}/150**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }  }})
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