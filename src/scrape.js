const axios = require('axios')
const cheerio = require('cheerio')

async function scrape() {
	const contests = {
		leetcode: [],
		codechef: [],
		codeforces: [],
		codingNinja: [],
		geeksforgeeks: [],
	}

	//LeetCode
	let result = await axios.get('https://leetcode.com/contest/')
	let $ = cheerio.load(result.data)
	let item = $('div.swiper div.swiper-wrapper').first()

	$(item)
		.find('div.swiper-slide')
		.each(function (i, elm) {
			title = $(this).find('span.transition-colors').text()
			link = $(this).find('a').attr('href')
			time = $(this).find('div.text-label-2').text()
			duration = '1 hour 30 mins'

			let contest = {
				title,
				link,
				time,
				duration,
			}

			contests.leetcode.push(contest)
		})
	// Codechef
	// Use python script to scrape codechef contest data

	//Codeforces

	let url = 'https://codeforces.com'
	result = await axios.get('https://codeforces.com/contests')
	$ = cheerio.load(result.data)
	item = $('div.datatable').first()

	console.log($('tbody tr td.dark').first().text())

	$(item)
		.find('table tbody tr')
		.each(function (i, elm) {
			if (i >= 1) {
				$(this)
					.find('td')
					.each(function (i, e) {
						// console.log($(this).text().trim())
						if (i == 0) {
							title = $(this).text().trim()
						} else if (i == 2) {
							time = $(this).text().trim()
						} else if (i == 3) {
							duration = $(this).text().trim()
						} else if (i == 5) {
							link = url + $(this).find('a').attr('href')
						}
					})
				console.log(title, link, time, duration)
				let contest = {
					title,
					link,
					time,
					duration,
				}

				contests.codeforces.push(contest)
			}
		})

	//CodingNinja

	console.log(contests)
}

scrape()
