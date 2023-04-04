const axios = require('axios')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
const cors = require('cors')
const express = require('express')
const port = 5000
const app = express()
app.use(cors())

const LeetCode = []
const Codeforces = []

app.get('/leetcode', (req, res) => {
	console.log('Hello World!')
	scrape()
	res.send(LeetCode)
})

app.get('/codeforces', (req, res) => {
	console.log('Hello World!')
	scrape()
	res.send(Codeforces)
})

async function scrape() {
	//LeetCode -----------------------------------------------------------------------------------
	if (LeetCode.length > 0) LeetCode.clear()

	let url = 'https://leetcode.com'

	let result = await axios.get('https://leetcode.com/contest/')
	let $ = cheerio.load(result.data)
	let item = $('div.swiper div.swiper-wrapper').first()

	$(item)
		.find('div.swiper-slide')
		.each(function (i, elm) {
			const contest = {
				title: $(this).find('span.transition-colors').text(),
				link: url + $(this).find('a').attr('href'),
				time: $(this).find('div.text-label-2').text(),
				duration: '1 hour 30 mins',
			}

			LeetCode.push(contest)
		})

	// -------------------------------------------------------------------------------------

	//Codeforces

	if (Codeforces.length > 0) Codeforces.clear()
	url = 'https://codeforces.com'
	result = await axios.get('https://codeforces.com/contests')
	$ = cheerio.load(result.data)
	item = $('div.datatable').first()

	$(item)
		.find('table tbody tr')
		.each(function (i, elm) {
			const contest = {
				title: '',
				link: '',
				time: '',
				duration: '',
			}
			if (i >= 1) {
				$(this)
					.find('td')
					.each(function (i, e) {
						if (i == 0) contest.title = $(this).text().trim().trim()
						if (i == 2) contest.time = $(this).text().trim()
						if (i == 3) contest.duration = $(this).text().trim()
						if (i == 5) contest.link = url + $(this).find('a').attr('href').trim()
					})
				Codeforces.push(contest)
			}
		})

	console.log(Codeforces)

	// -------------------------------------------------------------------------------------

	//GeeksForGeeks

	// const browser = await puppeteer.launch()
	// const page = await browser.newPage()
	// await page.goto('https://practice.geeksforgeeks.org/events')

	// console.log('start evaluate javascript')

	// var productNames = await page.evaluate(() => {
	// 	var div = document.querySelectorAll('eventsLanding_allEventsContainer__e8bYf')
	// 	console.log(div[0]) // console.log inside evaluate, will show on browser console not on node console

	// 	var productnames = []
	// 	div.forEach((element) => {
	// 		let titleelem = element.querySelector(
	// 			'eventsLanding_upcomingEvents__zjqtF',
	// 		).textContent
	// 		if (titleelem != null) {
	// 			console.log(titleelem)
	// 		} else {
	// 			console.log('Nothing just a racing incident')
	// 		}
	// 	})

	// 	return productnames
	// })

	// console.log(productNames)
	// browser.close()
	// console.log(GeeksForGeeks)

	// -------------------------------------------------------------------------------------

	//CodingNinja

	// -------------------------------------------------------------------------------------

	// Codechef
	// Use python script to scrape codechef contest data

	// -------------------------------------------------------------------------------------

	// console.log(contests)
}

scrape()

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
