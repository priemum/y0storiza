module.exports = {
	name: 'remove', // اسم الامر
description: "remove a song from the queue",
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
      }
}})
}

if((connection.songs.length > 0 || connection.now || connection.playing) && !connection.paused){
if(!message.member.permission.has("manageGuild")) return; 
if(!args[0]) return bot.createMessage(message.channel.id , {
embed:{
  description:"**You must enter the number of the song or (all)**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
}})

if(args[0].toLowerCase() === "all"){
connection.songs = []
return bot.createMessage(message.channel.id , {
  embed:"**All songs in the list have been removed**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
})
}else{
let n = Math.floor(args[0])
if(!n || n === NaN) return bot.createMessage(message.channel.id , {
  embed: {
    description:"**You must enter a correct format**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
         }
})
if(!connection.songs[n - 1]) return bot.createMessage(message.channel.id , {
  embed:{
    description:"**I didn't find this song**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
  }
})
let song = connection.songs[n - 1]

connection.songs.splice(n - 1 ,1); 

return bot.createMessage(message.channel.id ,  {
  embed:{
    description:`**${song.title} Has been removed from the list**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }  }
  
})
}

}else{
return bot.createMessage(message.channel.id , {
embed:{
  description:`**There is no music Running**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }
}})
}

}}
