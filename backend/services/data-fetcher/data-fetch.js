const { spawn } = require('child_process')
const fs = require('fs')
const axios = require('axios')
const DateTime = require('luxon').DateTime

// dns.setDefaultResultOrder('ipv4first')
// require('http').get(
// 	'http://scrapping-script-env.eba-g2hnav4p.ap-south-1.elasticbeanstalk.com/',
// 	(res) => console.log(res.statusCode),
// )
// const data_fetch = async () => {
// 	const callingPythonScript = async () => {
// 		// Set the path to the Python script
// 		const pythonScriptPath = './services/scraping/scrape.py'

// 		// Create a new child process using spawn()
// 		const pythonProcess = spawn('/usr/bin/python3', [pythonScriptPath])

// 		return new Promise((resolve, reject) => {
// 			// Handle standard output from the script
// 			pythonProcess.stdout.on('data', (data) => {
// 				console.log(`stdout: ${data}`)
// 			})

// 			// Handle errors from the script
// 			pythonProcess.stderr.on('data', (data) => {
// 				console.error(`stderr: ${data}`)
// 			})

// 			// Handle the process exit event
// 			pythonProcess.on('exit', (code) => {
// 				console.log(`Child process exited with code ${code}`)
// 				resolve()
// 			})
// 		})
// 	}

// 	try {
// 		await callingPythonScript()

// 		console.log('inside data-fetcher')
// 	} catch (error) {
// 		console.error(error)
// 		// res.status(500).send('An error occurred')
// 	}
// }

const data_fetch = async () => {
	try {
		const response = await axios.get(
			'http://scrapping-script-env.eba-g2hnav4p.ap-south-1.elasticbeanstalk.com/',
			{ timeout: 80000 },
		)

		console.log(JSON.stringify(response.data))
		const comment = {
			_comment:
				'data last scraped on ' +
				DateTime.now().toLocaleString(DateTime.DATETIME_FULL),
		}
		const newData = { ...comment, data: response.data }

		fs.writeFileSync('./data.json', JSON.stringify(newData, null, 2))
		console.log(
			'new data added to the data.json file, and have successfully scrapped data',
		)
	} catch (error) {
		console.error(error)
	}
}

module.exports = data_fetch
