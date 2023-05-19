const fs = require('fs')
var cron = require('node-cron')
const data_fetch = require('./data-fetcher/data-fetch')
const express = require('express')
const app = express()
const contestUpload = require('./routes/contestsDataDB')

cron.schedule('1 * * * * *', async () => {
	try {
		console.log('Running every minute')

		// Your asynchronous code or function call
		// await data_fetch()

		console.log('data scraped and fetched')

		contestUpload()
	} catch (error) {
		console.error(error)
	}
})
