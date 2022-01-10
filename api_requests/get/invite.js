
module.exports = {
	path: '/api/invite',
	method: 'get',
	run: async (req, res, db) => {

let { headers, params, query } = req
const fs = require('fs')

let data = await db.find({invite: query.state})

if(data.length < 1) return res.status(403).json({errors: ['data'], message: "Invite Code is defined"})
 await db.updateOne({id: data[0].id}, {"guild": query.guild_id})

res.redirect('https://discord.com/oauth2/authorized')
//res.status(200).json({errors: [], message: 'Done Set Bot To Guild!'})

 }
}