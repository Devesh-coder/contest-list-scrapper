import { DateTime, Duration } from 'luxon'
const { parse, format } = require('date-fns')

const dateConfig = (contest) => {
	contest.sort((a, b) => a.contestName.localeCompare(b.contestName))
	console.log('dateConfig ', contest)

	// const val = DateTime.fromFormat(
	// 	'September 03, 2023 07:00 PM IST',
	// 	'MMMM dd, yyyy hh:mm a z',
	// )

	// console.log(val.toISO(), '\n', val.toLocaleString(DateTime.DATETIME_FULL))

	// codechef
	contest[0].contests.map((item) => {
		const dateVal = DateTime.fromFormat(item.startTime, 'dd LLL yyyy\nEEE hh:mm')
		const durationVal = Duration.fromObject({
			hours: '2',
		})

		console.log(
			new Date(dateVal.toString()),
			typeof dateVal.toString(),
			'/////////\\\\\\\\\\',
		)
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

	// codeforces
	contest[1].contests.map((item) => {
		console.log(new Date(item.startTime))

		const dateString = item.startTime
		const formattedDate = dateString.replace('UTC+5.5', '')

		const parsedDate = parse(formattedDate, 'MMM/dd/yyyy HH:mm', new Date())
		const newFormattedString = format(parsedDate, 'MMMM dd, yyyy hh:mm')

		const dateVal = DateTime.fromFormat(newFormattedString, 'MMMM dd, yyyy hh:mm')
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

	// coding ninja
	contest[2].contests.map((contest) => {
		console.log(
			new Date(contest.startTime).toLocaleString(DateTime.DATETIME_FULL),
		)

		let startTime

		if (contest.startTime.startsWith('Starts in')) {
			const daysToAdd = parseInt(contest.startTime.split(' ')[2])
			startTime = DateTime.now().plus({ days: daysToAdd })
		} else {
			startTime = DateTime.now()
		}

		// const durationString = contest.duration.replace('hr', 'hours')
		// const durationVal = DateTime.fromFormat(durationString, "H'hours'").toFormat(
		// 	"H'h' mm'm'",
		// )
		const durationVal = 'Click to know more'
		contest.startTime = startTime

		console.log(
			'Coding Ninja\n',
			durationVal,
			startTime.toISO(),
			startTime.toLocaleString(DateTime.DATETIME_FULL),
		)
	})

	// geeksforgeeks
	contest[3].contests.map((item) => {
		const dateString = item.startTime.toString()
		const date = DateTime.fromFormat(dateString, "MMMM d, yyyy hh:mm a 'IST'")
		console.log(new Date(date).toLocaleString(DateTime.DATETIME_FULL))

		// console.log(item.startTime)
		const dateVal = DateTime.fromFormat(item.startTime, 'MMMM dd, yyyy hh:mm a z')
		const durationVal = Duration.fromObject({
			hours: item.durationHours,
			minutes: item.durationMinutes,
		})
		console.log(
			'geeksforgeeks \n',
			dateVal.toISO(),
			'\n',
			dateVal.toLocaleString(DateTime.DATETIME_FULL),
			'\n',
			durationVal.toISO(),
		)
		item.startTime = dateVal

		// const formattedDate = format(parsedDate, 'MMMM dd, yyyy hh:mm a ZZZZ')

		// console.log('bhadwe   \n', formattedDate) // Output: "September 03, 2023 05:35 PM IST"
	})

	// Leetcode
	contest[4].contests.map((contest) => {
		console.log(new Date(contest.startTime))

		const durationString = contest.duration.replace('hr', 'hours')
		const durationVal = DateTime.fromFormat(durationString, "H'hours'").toFormat(
			"H'h' mm'm'",
		)
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

export default dateConfig
