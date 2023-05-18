const fs = require('fs')
var cron = require('node-cron')
const data_fetch = require('./data-fetcher/data-fetch')

cron.schedule('1 * * * * *', async () => {
	try {
		console.log('Running every minute')

		// Your asynchronous code or function call
		// await data_fetch()

		// const data = fs.readFileSync('data.json', 'utf8')
		console.log('data fetched')
	} catch (error) {
		console.error(error)
	}
})
