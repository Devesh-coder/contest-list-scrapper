const express = require('express')
const router = express.Router()
const Contest = require('../models/contest')
const fs = require('fs')
const redisClient = require('../config/redis')

router.get('/', async (req, res) => {
	let value = await redisClient.get('contests')
	if (value != null) {
		res.status(200).send(JSON.parse(value))
		console.log('Cache HIT')
	} else {
		try {
			const contests = await Contest.find()
			try {
				await redisClient.setEx('contests', 3600, JSON.stringify(contests))
				console.log('Cache MISS')
			} catch (err) {
				console.log(err)
			}

			res.send(contests)
		} catch (err) {
			res.status(500).send({ message: 'Error in redis', err: err })
		}
	}
})

module.exports = router
