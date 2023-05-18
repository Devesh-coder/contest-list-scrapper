const fs = require('fs')
var cron = require('node-cron')
const data_fetch = require('./data-fetcher/data-fetch')

const data = cron.schedule('1 * * * * *', async () => {
	try {
		console.log('Running every minute from 1 to 5')

		// Your asynchronous code or function call
		// await data_fetch()

		const data = fs.readFileSync('data.json', 'utf8')
		console.log('data fetched')
		return JSON.parse(data)
	} catch (error) {
		console.error(error)
	}
})
