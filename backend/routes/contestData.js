const express = require('express')
const router = express.Router()
const Contest = require('../models/contest')
const fs = require('fs')
const Redis = require('redis')
const { createClient } = require('redis')

const REDIS_PORT = process.env.PORT || 6379

const redisClient = Redis.createClient(REDIS_PORT) // this creates a new client

redisClient.connect()
try {
	redisClient.on('connect', (err) => {
		console.log('Connected to Redis')
	})
} catch (err) {
	console.log(err)
}

// redisClient.on('error', (err) => console.log('Redis Client Error', err))

// redisClient.connect()

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
			res.status(500).send({ message: 'error aaya bhadwe', err: err })
		}
	}
})

module.exports = router
