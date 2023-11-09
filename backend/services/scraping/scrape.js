var cron = require('node-cron')
const data_fetch = require('../data-fetcher/data-fetch')
const contestUpload = require('../../routes/contestsDataDB')

// const redisClient = require('../../config/redis')

cron.schedule('0 3 * * 3', async () => {
	// 0 3 * * 3 to scrape every wednesday at 3:00 am
	try {
		console.log('Running every week on wednesday at 00:00')

		// Your asynchronous code or function call
		await data_fetch()

		console.log('data scraped and fetched')

		await contestUpload()
		// await redisClient.flushAll(function (err, succeeded) {
		// 	console.log(succeeded, 'cache cleared') // will be true if successfull
		// })
	} catch (error) {
		console.error(error)
	}
})
