const fs = require('fs')
module.exports = {
	path: '/api/v1/bots/:id',
	method: 'get',
	run: async (req , res , db) => {
let { headers, params } = req
if(!params.id) return res.status(403).json({errors: ['client ID', 'Request Params id'], message: "Request Params ID Client", chat: {msg: "**Request ID Client**"}})
let bot = await db.find({id: params.id})
if(bot.length < 1) return res.status(403).json({errors: ['data', 'client'], message: "Client is not add in data"})
delete bot[0]._id
delete bot[0].__v 
delete bot[0].token
bot[0] = {
        "prefix": bot[0].prefix,
        "guild": bot[0].guild,
        "owner": bot[0].owner,
        "status": bot[0].status,
        "game": bot[0].game,
        "invite": bot[0].invite,
        "time": bot[0].time,
        "info": bot[0].info,
        "id": bot[0].id,
}
res.status(200).json({errors: [], message: "success", data: bot[0]})
    }
}