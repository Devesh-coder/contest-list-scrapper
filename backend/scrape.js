var cron = require('node-cron')
const data_fetch = require('./data-fetcher/data-fetch')
const contestUpload = require('./routes/contestsDataDB')

cron.schedule('2 * * * * *', async () => {
	try {
		console.log('Running every 2 minutes')

		// Your asynchronous code or function call
		// await data_fetch()

		console.log('data scraped and fetched')

		// await contestUpload()
	} catch (error) {
		console.error(error)
	}
})
