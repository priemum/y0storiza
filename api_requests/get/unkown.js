const fs = require('fs')
module.exports = {
	path: '/',
	method: 'get',
	run: async (req , res , con) => {
let { headers } = req
res.sendStatus(200)
    }
}