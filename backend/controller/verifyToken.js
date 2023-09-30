const { OAuth2Client } = require('google-auth-library')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const client = new OAuth2Client()

async function verify(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.CLIENT_ID,
	})
	const payload = ticket.getPayload()
	const userid = payload['sub']
	console.log(userid, ' ', payload)
}

// const tokenToSetAsCookie =
// 	'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI5YWM2MDFkMTMxZmQ0ZmZkNTU2ZmYwMzJhYWIxODg4ODBjZGUzYjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4ODU0OTc5MjQyNjMtbjljc2g2NHM0dWRkYTJyZTRlMzdidjlmdms2ajMydmguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4ODU0OTc5MjQyNjMtbjljc2g2NHM0dWRkYTJyZTRlMzdidjlmdms2ajMydmguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDMwODUwODM3ODExMjE0NDI0ODgiLCJlbWFpbCI6ImN1cHBjYWtlMzI2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiWUhVUXFmZWhMNGVmOEg5U2R4eXgyUSIsIm5hbWUiOiJEZXZlc2ggQWdhcndhbCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMcHdDNkpkaDNCOUYxNEpxQ05xTFFuLXlZNm42WUxCSWl2YU1xU3plNnI9czk2LWMiLCJnaXZlbl9uYW1lIjoiRGV2ZXNoIiwiZmFtaWx5X25hbWUiOiJBZ2Fyd2FsIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2OTYxMDM0MTksImV4cCI6MTY5NjEwNzAxOX0.bNFpOqOwkdw9idyjFmbRhir2FY1p-A_1_DtaSyhiDbJ9c1aTuhVArwpt_J7zvR7H7ny-7_41vwXl1eWktkvOLYHsd147hvQluOd8SkgltWJazyBhqUgGQG-5mOXO3k4RYFAAVKplqWqA8htAqfQGr_gjwSK4tlKXU7K1-Nf83TPBckzKx-rDUIGdPN8pdRDfoP7ZzvlmkA5pAg3lHmnsGFl-Ypn8-BVh8HSYYz9YzX8ELam8UVh7ZySP5UPymJXp17HvN-7FDo7u7ZhHDbAWyLQDMlhGN5PpirwTQfKv25KXWUGirI8upR7agGSNKNt2k17U7H_CHOSweUukR38n4g'

const verifyToken = async (req, res, next) => {
	// res.cookie('jwt', tokenToSetAsCookie, { maxAge: 900000, httpOnly: true })
	// res.send('cookie sent')
	const jwtToken = req.cookies.jwt
	console.log(jwt.decode(jwtToken))
	if (!jwtToken) {
		res.send('No token found, Login IN')
		return res.status(401).send('Unauthorized')
	}
	try {
		verify(jwtToken)
		res.send('success')
	} catch (err) {
		console.log(err)
		res.send('Session ended, Login again')
	}
}

module.exports = verifyToken
