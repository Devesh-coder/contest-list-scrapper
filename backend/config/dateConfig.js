const { parse, format } = require('date-fns')
const { DateTime, Duration } = require('luxon')

const dateConfig = (contest) => {
	// contest.sort((a, b) => a.contestName.localeCompare(b.contestName))
	// console.log('dateConfig ', json.stringify(contest))

	for (let i = 0; i < contest.length; i++) {
		if (contest[i].contestName == 'Codechef') {
			contest[i].contests.map((item) => {
				const dateVal = DateTime.fromFormat(
					item.startTime,
					'dd LLL yyyy\nEEE hh:mm',
				)
				const durationVal = Duration.fromObject({
					hours: '2',
				})
				console.log(
					'codechef \n',
					dateVal.toISO(),
					'\n',
					dateVal.toLocaleString(DateTime.DATETIME_FULL),
					'\n',
					durationVal.toISO(),
					'\n',
					durationVal.toFormat('hh:mm'),
				)
				item.startTime = dateVal
			})
		} else if (contest[i].contestName == 'Codeforces') {
			contest[i].contests.map((item) => {
				const dateString = item.startTime
				const formattedDate = dateString.replace('UTC', '')

				const parsedDate = parse(formattedDate, 'MMM/dd/yyyy HH:mm', new Date())
				const newFormattedString = format(parsedDate, 'MMMM dd, yyyy hh:mm')

				const dateVal = DateTime.fromFormat(
					newFormattedString,
					'MMMM dd, yyyy hh:mm',
					{ zone: 'Asia/Kolkata' },
				)
				const durationVal = Duration.fromObject({
					hours: item.durationHours,
					minutes: item.durationMinutes,
				})
				console.log(
					'codeforces \n',
					dateVal.toISO(),
					'\n',
					dateVal.toLocaleString(DateTime.DATETIME_FULL),
					'\n',
					durationVal.toISO(),
				)
				item.startTime = dateVal
			})
		} else if (contest[i].contestName == 'CodingNinja') {
			// coding ninja
			contest[2].contests.map((contest) => {
				let startTime

				if (contest.startTime.startsWith('Starts in')) {
					const daysToAdd = parseInt(contest.startTime.split(' ')[2])
					startTime = DateTime.now().plus({ days: daysToAdd })
				}

				// const durationString = contest.duration.replace('hr', 'hours')
				// const durationVal = DateTime.fromFormat(durationString, "H'hours'").toFormat(
				// 	"H'h' mm'm'",
				// )
				// const durationVal = 'Click to know more'
				contest.startTime = startTime

				// console.log(
				// 	'Coding Ninja\n',
				// 	durationVal,
				// 	startTime.toISO(),
				// 	startTime.toLocaleString(DateTime.DATETIME_FULL),
				// )
			})
		} else if (contest[i].contestName == 'GeeksForGeeks') {
			contest[3].contests.map((item) => {
				console.log('GeeksForGeeks')
				const dateString = item.startTime
				const dateVal = DateTime.fromFormat(
					dateString,
					"MMMM d, yyyy hh:mm a 'IST'",
				)
				console.log(
					dateVal.toISO(),
					'\n',
					dateVal.toLocaleString(DateTime.DATETIME_FULL),
					'\n',
					new Date(dateVal.toString()),
					'\n',
					new Date(dateVal).toLocaleString(DateTime.DATETIME_FULL),
					'\n',
					dateVal.toString(),
				)
				item.startTime = dateVal
			})
		} else if (contest[i].contestName == 'Leetcode') {
			contest[4].contests.map((contest) => {
				const durationString = contest.duration.replace('hr', 'hours')
				const durationVal = DateTime.fromFormat(
					durationString,
					"H'hours'",
				).toFormat("H'h' mm'm'")
				const dateVal = DateTime.fromFormat(contest.startTime, "EEEE h:mm a 'GMT'Z")

				console.log(
					'leetcode \n',
					dateVal.toISO(),
					'\n',
					dateVal.toLocaleString(DateTime.DATETIME_FULL),
					'\n',
					durationVal,
					'\n',
					// durationVal.toISO(),
				)
				contest.startTime = dateVal
			})
		}
		console.log('\n')
	}

	// codechef
	// contest[0].contests.map((item) => {
	// 	const dateVal = DateTime.fromFormat(item.startTime, 'dd LLL yyyy\nEEE hh:mm')
	// 	const durationVal = Duration.fromObject({
	// 		hours: '2',
	// 	})
	// 	console.log(
	// 		'codechef \n',
	// 		dateVal.toISO(),
	// 		'\n',
	// 		dateVal.toLocaleString(DateTime.DATETIME_FULL),
	// 		'\n',
	// 		durationVal.toISO(),
	// 		'\n',
	// 		durationVal.toFormat('hh:mm'),
	// 	)
	// 	item.startTime = dateVal
	// })

	// codeforces
	// contest[1].contests.map((item) => {
	// 	const dateString = item.startTime
	// 	const formattedDate = dateString.replace('UTC+5.5', '')

	// 	const parsedDate = parse(formattedDate, 'MMM/dd/yyyy HH:mm', new Date())
	// 	const newFormattedString = format(parsedDate, 'MMMM dd, yyyy hh:mm')

	// 	const dateVal = DateTime.fromFormat(newFormattedString, 'MMMM dd, yyyy hh:mm')
	// 	const durationVal = Duration.fromObject({
	// 		hours: item.durationHours,
	// 		minutes: item.durationMinutes,
	// 	})
	// 	console.log(
	// 		'codeforces \n',
	// 		dateVal.toISO(),
	// 		'\n',
	// 		dateVal.toLocaleString(DateTime.DATETIME_FULL),
	// 		'\n',
	// 		durationVal.toISO(),
	// 	)
	// 	item.startTime = dateVal
	// })

	// coding ninja
	// contest[2].contests.map((contest) => {
	// 	let startTime

	// 	if (contest.startTime.startsWith('Starts in')) {
	// 		const daysToAdd = parseInt(contest.startTime.split(' ')[2])
	// 		startTime = DateTime.now().plus({ days: daysToAdd })
	// 	} else {
	// 		startTime = DateTime.now()
	// 	}

	// 	// const durationString = contest.duration.replace('hr', 'hours')
	// 	// const durationVal = DateTime.fromFormat(durationString, "H'hours'").toFormat(
	// 	// 	"H'h' mm'm'",
	// 	// )
	// 	const durationVal = 'Click to know more'
	// 	contest.startTime = startTime

	// 	console.log(
	// 		'Coding Ninja\n',
	// 		durationVal,
	// 		startTime.toISO(),
	// 		startTime.toLocaleString(DateTime.DATETIME_FULL),
	// 	)
	// })

	// geeksforgeeks
	// contest[3].contests.map((item) => {
	// 	console.log('GeeksForGeeks')
	// 	const dateString = item.startTime
	// 	const date = DateTime.fromFormat(dateString, "MMMM d, yyyy hh:mm a 'IST'")
	// 	console.log(date.toISO(), '\n', date.toLocaleString(DateTime.DATETIME_FULL))
	// })

	// Leetcode
	// contest[4].contests.map((contest) => {
	// 	const durationString = contest.duration.replace('hr', 'hours')
	// 	const durationVal = DateTime.fromFormat(durationString, "H'hours'").toFormat(
	// 		"H'h' mm'm'",
	// 	)
	// 	const dateVal = DateTime.fromFormat(contest.startTime, "EEEE h:mm a 'GMT'Z")

	// 	console.log(
	// 		'leetcode \n',
	// 		dateVal.toISO(),
	// 		'\n',
	// 		dateVal.toLocaleString(DateTime.DATETIME_FULL),
	// 		'\n',
	// 		durationVal,
	// 		'\n',
	// 		// durationVal.toISO(),
	// 	)
	// 	contest.startTime = dateVal
	// })

	return contest
}

module.exports = dateConfig
