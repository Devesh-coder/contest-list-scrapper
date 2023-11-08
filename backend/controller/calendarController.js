const dotenv = require('dotenv')
const { google } = require('googleapis')
const { findUser } = require('./userCredentials')
const { luxon } = require('luxon')
dotenv.config()

const oauth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URI,
)

const createEvent = async (req, res) => {
	console.log(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
	try {
		const { name, link, startTime, duration } = req.body.contest
		const token = req.cookies.jwtToken
		// console.log(token, 'token')

		console.log(typeof startTime, startTime, 'start time')
		token === undefined &&
			res.status(401).send({ status: 'error', message: 'Please login first' })
		const date = new Date(startTime)
		console.log(date, 'date')
		const { refreshToken } = await findUser(token)
		console.log(refreshToken, 'refresh tokens')

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
					dateTime: new Date(
						new Date(startTime).getTime() + 2 * 60 * 60 * 1000,
					).toISOString(),
					timeZone: 'Asia/Kolkata',
				},
				// start: {
				// 	dateTime: new Date(new Date().getTime() + 12 * 60 * 1000).toISOString(),
				// 	timeZone: 'Asia/Kolkata',
				// },
				// end: {
				// 	dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
				// 	timeZone: 'Asia/Kolkata',
				// },
				summary: name,
			},
		})
		res.send(response)
	} catch (error) {
		res.json({ error: error.message })
	}
}

module.exports = createEvent
