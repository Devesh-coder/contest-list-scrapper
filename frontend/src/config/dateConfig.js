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
	contest[2].contests.map((item) => {
		const dateVal = DateTime.fromFormat(item.startTime, 'dd LLL yyyy\nEEE hh:mm')
		const durationVal = Duration.fromObject({
			hours: item.durationHours,
			minutes: item.durationMinutes,
		})
		console.log(
			'coding ninja \n',
			dateVal.toISO(),
			'\n',
			dateVal.toLocaleString(DateTime.DATETIME_FULL),
			'\n',
			durationVal.toISO(),
		)
		item.startTime = dateVal
	})

	// geeksforgeeks
	contest[3].contests.map((item) => {
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
}

export default dateConfig
