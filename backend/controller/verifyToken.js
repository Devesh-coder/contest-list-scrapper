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

const verifyToken = async (req, res, next) => {
	const jwtToken = req.cookies.jwtToken
	console.log(jwtToken, '     --- ', jwt.decode(jwtToken))

	if (!jwtToken) {
		console.log('Unauthorized')
		return res.status(401).send('Login first')
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
