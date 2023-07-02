var cron = require('node-cron')
const data_fetch = require('./data-fetcher/data-fetch')
const contestUpload = require('./routes/contestsDataDB')

cron.schedule('* * * * *', async () => {
	try {
		console.log('Running every week on wednesday at 00:00')

		// Your asynchronous code or function call
		await data_fetch()

		console.log('data scraped and fetched')

		await contestUpload()
	} catch (error) {
		console.error(error)
	}
})
