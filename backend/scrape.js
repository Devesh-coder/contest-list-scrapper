const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')
const express = require('express')
const { spawn } = require('child_process')
const fs = require('fs')
var cron = require('node-cron')
const data_fetch = require('./data-fetcher/data-fetch')
const port = 5000 || process.env.PORT
const app = express()
app.use(cors())

const LeetCode = []
const Codeforces = []

app.get('/', async (req, res) => {
	// try {
	// 	const callingPythonScript = async () => {
	// 		// Set the path to the Python script
	// 		const pythonScriptPath = 'scrape.py'

	// 		// Create a new child process using spawn()
	// 		const pythonProcess = spawn('python', [pythonScriptPath])

	// 		// Handle standard output from the script
	// 		pythonProcess.stdout.on('data', (data) => {
	// 			console.log(`stdout: ${data}`)
	// 		})

	// 		// Handle errors from the script
	// 		pythonProcess.stderr.on('data', (data) => {
	// 			console.error(`stderr: ${data}`)
	// 		})

	// 		// Handle the process exit event
	// 		return new Promise((resolve, reject) => {
	// 			pythonProcess.on('exit', (code) => {
	// 				console.log(`Child process exited with code ${code}`)
	// 				resolve()
	// 			})
	// 		})
	// 	}

	// 	await callingPythonScript()

	// 	const data = fs.readFileSync('data.json', 'utf8')
	// 	console.log(typeof JSON.parse(data))
	// 	res.send(JSON.parse(data)[0])
	// } catch (error) {
	// 	console.error(error)
	// 	res.status(500).send('An error occurred')
	// }

	console.log('Hello World!')
})

cron.schedule('1 * * * * *', async () => {
	try {
		console.log('Running every minute from 1 to 5')

		// Your asynchronous code or function call
		await data_fetch()

		const data = fs.readFileSync('data.json', 'utf8')
		console.log(typeof JSON.parse(data))
		console.log(JSON.parse(data)[0])
	} catch (error) {
		console.error(error)
	}
})

// app.get('/leetcode', (req, res) => {
// 	console.log('Hello World!')
// 	scrape()
// 	res.send(LeetCode)
// })

// app.get('/codeforces', (req, res) => {
// 	console.log('Hello World!')
// 	scrape()
// 	res.send(Codeforces)
// })

// async function scrape() {
// 	//LeetCode -----------------------------------------------------------------------------------
// 	if (LeetCode.length > 0) LeetCode.clear()

// 	let url = 'https://leetcode.com'

// 	let result = await axios.get('https://leetcode.com/contest/')
// 	let $ = cheerio.load(result.data)
// 	let item = $('div.swiper div.swiper-wrapper').first()

// 	$(item)
// 		.find('div.swiper-slide')
// 		.each(function (i, elm) {
// 			const contest = {
// 				title: $(this).find('span.transition-colors').text(),
// 				link: url + $(this).find('a').attr('href'),
// 				time: $(this).find('div.text-label-2').text(),
// 				duration: '1 hour 30 mins',
// 			}

// 			LeetCode.push(contest)
// 		})

// 	// -------------------------------------------------------------------------------------

// 	//Codeforces

// 	if (Codeforces.length > 0) Codeforces.clear()
// 	url = 'https://codeforces.com'
// 	result = await axios.get('https://codeforces.com/contests')
// 	$ = cheerio.load(result.data)
// 	item = $('div.datatable').first()

// 	$(item)
// 		.find('table tbody tr')
// 		.each(function (i, elm) {
// 			const contest = {
// 				title: '',
// 				link: '',
// 				time: '',
// 				duration: '',
// 			}
// 			if (i >= 1) {
// 				$(this)
// 					.find('td')
// 					.each(function (i, e) {
// 						if (i == 0) contest.title = $(this).text().trim().trim()
// 						if (i == 2) contest.time = $(this).text().trim()
// 						if (i == 3) contest.duration = $(this).text().trim()
// 						if (i == 5) contest.link = url + $(this).find('a').attr('href').trim()
// 					})
// 				Codeforces.push(contest)
// 			}
// 		})

// 	console.log(Codeforces)
// }

scrape()

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
