module.exports = {
	name: 'skip', // اسم الامر
	description: "Go to next play", // شرح الامر
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

if(!message.member.permission.has("manageGuild")) { 

let channel = bot.getChannel(connection.channelID)
let memberCount = Math.round(channel.voiceMembers.filter(d => !d.bot && d.id !== bot.user.id).length)

memberCount = memberCount < 1 ? 1 : memberCount

if(connection.votes.includes(message.author.id)) return bot.createMessage(message.channel.id , {
embed:{
  description:`**You have already voted**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})
connection.votes.push(message.author.id)
if(connection.votes.length >= memberCount) {
connection.skip = true
await connection.stopPlaying();
return bot.createMessage(message.channel.id , {
embed:{
  description:`**Skipped this song , Start playing: ${connection.now.title}**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})
}

return bot.createMessage(message.channel.id , {
embed:{
  description:`**Skipping has been voted : ${connection.votes.length++}/${memberCount}**`,
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})
}else{
connection.skip = true
await connection.stopPlaying();
if(!connection.now) return bot.createMessage(message.channel.id , {
embed: {
  description: "**There is no music running**",
      "color": 3026990,
      "footer": {
        "text": "Powerd by Idea Group | To get invite use #idea"
      }}})
return bot.createMessage(message.channel.id , {
embed:{
  description:`**Skipped this song , Start playing: ${connection.now.title}**`,
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