const mongoose = require('mongoose')
let Eris = require('eris')
const fs = require('fs')
let random = require('random-id-generator')
const ms = require('ms')
module.exports = {
	path: '/api/v1/bots/add',
	method: 'post',
	run: async (req , res , db) => {
let { headers, body } = req
if(!headers.authorization) return res.status(401).json({errors: ["Headers Authorization String", "Request Header authorization"], message: "Request header authorization", chat: {msg: "**Failed to Auth**"}})
if(headers.authorization !== '123') return res.status(401).json({errors: ["Headers Authorization String", "Error Header authorization"], message: "Failed Authorization", chat: {msg: "**Failed to Auth**"}})

if(!body) return res.status(403).json({errors: ["Body Object object", "Request Body"], message: "Request Body", chat: {msg: "**Failed To Add Bot**"}})
if(!body.token) return res.status(403).json({errors: ["token", "Body Object object", "Request Body Token"], message: "Request Body Token", chat: {msg: "**Token Request!**"}})

let time = body.time || '30d'
let invite = body.invite || random(16)
let prefix = body.prefix || "#"
let owner = body.owner
let info = body.client

if(!ms(time)) return res.status(403).json({errors: ["time", "mstime"], message: "Time is Defined", chat: {msg: "**Error In Time!**"}})
if(!owner) return res.status(403).json({errors: ["ownerID", "Body Object object", "Request Body owner"], message: "Request Body Owner", chat: {msg: "**ownerID Request!**"}})
if(!info) return res.status(403).json({errors: ["client", "Body Object object", "Request Body Client"], message: "Request Body client", chat: {msg: "**Client For What Request!**"}})

let client = Eris(body.token)

client.on('ready', () =>{
let mongodb = JSON.parse(fs.readFileSync("./mongodb.json", "utf8"))
mongodb.num++
fs.writeFile("./mongodb.json", JSON.stringify(mongodb, null, 5), function(err) {if(err) console.log(err)});

new db({token: body.token, owner: owner, prefix: prefix, invite: invite, time: ms(time) + Date.now(), info: info, id: client.user.id, number: mongodb.num, buyOwner: owner}).save()
res.status(200).json({errors: [], message: "success", data_client: client.user, data: {
token: body.token,
owner:  owner,
prefix: prefix,
invite: invite,
time: ms(time) + Date.now(),
game: '[none]',
status: 'online',
client: info
}})
})

client.on('error', (data) =>{
return res.status(403).json({errors: ["bot"], message: "Failed Login Data: " + data, chat: {msg: data}})
})

client.connect()
   }
}