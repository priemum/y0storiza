let fs = require('fs')
let express = require('express')
let app = express()
const bodyParser = require('body-parser');
const fetch = require('node-fetch')
const Eris = require('eris')
app.use(bodyParser.json())
let mongoose = require('mongoose')
mongoose.connect("mongodb+srv://yousuf:41371755aa@cluster0.8dy7d.mongodb.net/data" , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    });

const collection = mongoose.model("bots",  new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "token": { type: String } ,
            "prefix": { type: String, default: "#" },
            "time": {type: Number},
            "guild": {type: String, default: "none" },
            "owner": {type: String, default: "none" },
            "invite": {type: String },
            "status": {type: String, default: "online" },
            "game": {type: String, default: "[none]" },
            "info": {type: String },
            "id": {type: String },
            "dns": {type: Array, default: [] },
            "errs": {type: Array, default: [] },
            "roles": {type: Array, default: [] },
            "number": {type: Number},
            "buyOwner": {type: String, default: "none"},
            "probot": {type: String, default: "282859044593598464"},
            "protiection": {type: Object, default: {prune: false, ban: {max: 0, status: false}, channels: {max: 0, status: false}, roles: {max: 0, status: false}, members: [], logs: []}},
            "ticket": {type: Object, default: {panel: [], support: [], max: 0, members: []}},

}));
let client_Bc = require('./client-bc/index.js')
let client_Roles = require('./client-roles/index.js')
let client_Musics = require('./client-music/index.js')

var dns = []
setInterval(async () => {

let bc = await collection.find({info: "bc"})
for(const data of bc){
if(!dns.includes(data.token)) client_Bc(data.token, collection)
if(!dns.includes(data.token)) dns.unshift(data.token)
}
let roles = await collection.find({info: "roles"})
for(const data of roles){
if(!dns.includes(data.token)) client_Roles(data.token, collection)
if(!dns.includes(data.token)) dns.unshift(data.token)
}
let musics = await collection.find({info: "music"})
for(const data of musics){
if(!dns.includes(data.token)) client_Musics(data.token, collection)
if(!dns.includes(data.token)) dns.unshift(data.token)
}
}, 6000)

        const requests = fs.readdirSync(`./api_requests/`).filter(file => file.endsWith(".js"));


    fs.readdirSync("./api_requests/").forEach(dir => {
        const requests = fs.readdirSync(`./api_requests/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of requests) {
            let request = require(`./api_requests/${dir}/${file}`);
if(request.method && request.path){
app[request.method](request.path , (req , res) =>{ request.run(req , res, collection)})
}}
    })



app.listen(3000)

let client1 = new Eris('ODQ3NzkwMjQ2NjM2NTUyMjEz.YLDMMQ.opp90uFCR6urOiul-zvkC_OcK1o', {restMode: true})

client1.on('ready', async () =>{
let usernames = []
client1.editStatus("online")
console.log(client1.user.id)
})
client1.on('messageCreate', async (msg) =>{
let message = msg
console.log('y')

	let args = message.content.slice("$".length).trim().split(/ +/);
if(!message.content.startsWith("$")) return;

	let commandName = args.shift().toLowerCase();
let roles = ['851909542995427388',
'844210027342200882',
'838944090573373470',
'833107177724051466',
'819550355003146270',
'819547802664435742']
if(commandName === "عميل"){

var haveRole = false


for(const d of roles){
if(msg.member.roles.includes(d)) haveRole = true
}
if(!haveRole) return;
let mention = msg.mentions[0] || msg.channel.guild.members.get(args[0])
if(!mention) return client1.createMessage(msg.channel.id, `**:x: حدث خطأ : يرجى منشن العميل **`)

let member = msg.channel.guild.members.get(mention.id)
member.addRole('819549757189914645')
}
if(commandName === "tax"){
if(!args[0]) return client1.createMessage(msg.channel.id, `**:x: حدث خطأ : يرجى كتابة أعداد لحساب ضريبتها **`)
let bot = client1
var nobalance = {description: "**‏:x: Only Number’s.**", color: "16318464"}
let ar = message.content.split(" ")
if(!ar)  return bot.createMessage(msg.channel.id, nobalance.description).catch(err =>{})
let a = 0
    for(var i = 0; i < 10; i++){
if(message.content.split(" ")[i] && message.content.split(" ")[i].length > 0) {
a++
args[a] = message.content.split(" ")[i]
} 
    }

if(args[2] === false || !args[2] || isNaN(args[2])) return bot.createMessage(msg.channel.id, {embed:nobalance})
args[2] = Math.floor(args[2])
if(args[2] < 1) bot.createMessage(msg.channel.id, nobalance.description).catch(err =>{})
args[2] = Math.round(args[2])
var mbl5plusdr = Math.floor(((args[2] * 20) / 19) + 1)
var wadr = Math.floor(((mbl5plusdr * 20) / 19) + 1) 
var done = {
"description": `> **The Final Price : ${mbl5plusdr}**`,
 color: "8780032",
"title": "**حساب ضريبة بروبوت**",
thumbnail: {
        url: message.author.avatarURL,
    }}
bot.createMessage(msg.channel.id, {embed:done})

}
})

client1.connect()