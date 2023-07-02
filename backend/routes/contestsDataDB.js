const fs = require('fs')
const Contest = require('../models/contest')
const Redis = require('redis')
const REDIS_PORT = process.env.PORT || 6379

const redisClient = Redis.createClient(REDIS_PORT) // this creates a new client

const contestUpload = async () => {
	const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'))
	try {
		await Contest.deleteMany({}).then(async () => {
			console.log('deleted')
			const newContest = await Contest.create(data)
			console.log('contest added', newContest)
		})
		// await redisClient.flushAll(function (err, succeeded) {
		// 	console.log(succeeded, 'delete kar diya') // will be true if successfull
		// })
	} catch (err) {
		console.log(err)
	}
}

module.exports = contestUpload
