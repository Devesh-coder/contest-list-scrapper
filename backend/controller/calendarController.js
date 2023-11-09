const dotenv = require('dotenv')
const { google } = require('googleapis')
const { findUser } = require('./userCredentials')
const { luxon } = require('luxon')
dotenv.config()

// ------------------------Duration------------------------

const moment = require('moment')

function parseDuration(durationString) {
	const regex = /(\d+(\.\d+)?)\s*(hr|hour|hrs|hours|day|days)?/i
	const timeRegex = /^(\d{1,2}):(\d{2})$/

	const match = durationString.match(regex)
	const timeMatch = durationString.match(timeRegex)

	if (timeMatch) {
		let hours = parseInt(timeMatch[1], 10)
		let minutes = parseInt(timeMatch[2], 10)

		return hours * 60 * 60 * 1000 + minutes * 60 * 1000 // Convert hours and minutes to milliseconds
	}

	if (match) {
		let value = parseFloat(match[1])
		let unit = match[3] ? match[3].toLowerCase() : 'hr' // Default to 'hr' if no unit provided

		if (unit === 'hr' || unit === 'hour' || unit === 'hrs' || unit === 'hours') {
			return value * 60 * 60 * 1000 // Convert hours to milliseconds
		} else if (unit === 'day' || unit === 'days') {
			return value * 24 * 60 * 60 * 1000 // Convert days to milliseconds
		}
	}

	return null // Invalid input
}

// ------------------------Duration------------------------

const oauth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URI,
)

const createEvent = async (req, res) => {
	// console.log(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
	try {
		const { name, link, startTime, duration } = req.body.contest
		const token = req.cookies.jwtToken
		console.log(req.body.contest, 'body')
		let milis = parseDuration(duration)
		console.log(milis, 'milis')

		console.log(typeof startTime, startTime, 'start time')
		token === undefined &&
			res.status(401).send({ status: 'error', message: 'Please login first' })
		const date = new Date(startTime)
		// console.log(date, 'date')
		const { refreshToken } = await findUser(token)
		// console.log(refreshToken, 'refresh tokens')

		oauth2Client.setCredentials({ refresh_token: refreshToken })
		const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
		const response = await calendar.events.insert({
			auth: oauth2Client,
			calendarId: 'primary',
			requestBody: {
				colorId: 1,
				description: link,
				start: {
					dateTime: new Date(startTime).toISOString(),
					timeZone: 'Asia/Kolkata',
				},
				end: {
					dateTime: new Date(new Date(startTime).getTime() + milis).toISOString(),
					timeZone: 'Asia/Kolkata',
				},
				summary: name,
			},
		})
		res.send(response)
	} catch (error) {
		res.json({ error: error.message })
	}
}

module.exports = createEvent
