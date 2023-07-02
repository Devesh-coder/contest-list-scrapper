const dotenv = require('dotenv')
dotenv.config()
const { google } = require('googleapis')
const express = require('express')
const router = express.Router()

const oauth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URI,
)

const scopes = [
	'https://www.googleapis.com/auth/calendar',
	'https://www.googleapis.com/auth/userinfo.email',
]

router.get('/', async (req, res) => {
	console.log('inside of the google route')
	const url = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: scopes,
		include_granted_scopes: true,
	})

	console.log(url)

	res.header('Access-Control-Allow-Origin', '*')
	res.redirect(url)
})

router.get('/redirect', async (req, res) => {
	const code = req.query.code
	console.log(code)
	if (code) {
		let { tokens } = await oauth2Client.getToken(code)
		console.log(tokens)
		oauth2Client.setCredentials(tokens)
	}
	console.log('ITs working now :) 	 inside of the redirect route')
	res.header('Access-Control-Allow-Origin', '*')
	res.redirect('/google/event')
})

router.get('/event', async (req, res) => {
	const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

	var event = {
		summary: 'Test',
		description: "A chance to hear more about Google's developer products.",
		start: {
			dateTime: new Date(new Date().getTime() + 12 * 60 * 1000).toISOString(),
			timeZone: 'Asia/Kolkata',
		},
		end: {
			dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
			timeZone: 'Asia/Kolkata',
		},
	}

	calendar.events.insert(
		{
			calendarId: 'primary',
			resource: event,
		},
		function (err, event) {
			if (err) {
				console.log('There was an error contacting the Calendar service: ' + err)
				return
			}
			console.log('Event created: %s', event.htmlLink)
		},
	)
	res.send('Event created')
	// res.write('Event created')
	// res.redirect('http://localhost:3000/')
})

router.get('/test', (req, res) => {
	res.send(new Date().toISOString())
	console.log(new Date().toISOString(), 'this is current time')
	console.log(
		'this is after 2 mins ',
		new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
	)
})

// app.listen(port, () => {
// 	console.log(`Server is listening on port ${port}`)
// })

module.exports = router
