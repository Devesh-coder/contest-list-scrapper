const express = require('express')
const router = express.Router()
const Contest = require('../models/contest')
const fs = require('fs')

router.get('/', async (req, res) => {
	try {
		const contests = await Contest.find()
		res.send(contests)
	} catch (err) {
		res.status(500).send({ message: err })
	}
})

module.exports = router
