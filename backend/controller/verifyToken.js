const { OAuth2Client } = require('google-auth-library')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { refreshToken } = require('./AuthController')
const { findUserByEmail } = require('./userCredentials')

const client = new OAuth2Client()

async function verify(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.CLIENT_ID,
	})
	const payload = ticket.getPayload()
	const userid = payload['sub']
	console.log(
		'userID : ',
		userid,
		'\n payload: ',
		payload,
		'\n //////////Inside\\\\\\\\\\',
	)
	return payload
}

const verifyToken = async (req, res, next) => {
	const jwtToken = req.cookies.jwtToken
	let email = ''
	console.log(jwt.decode(jwtToken), '\n	', 'verify token middleware')

	if (!jwtToken) {
		console.log('Unauthorized')
		return res.status(401).json({ status: false, message: 'Login First' })
	}

	try {
		const payload = await verify(jwtToken)
		// email = payload.email
		res.json({ status: 'true', message: 'success' })
	} catch (err) {
		console.log(err)
		res.send({ status: 'false', message: 'Session ended, Login again' })
		// try {
		// 	const { refreshToken } = await findUserByEmail(email)
		// 	const cred = await refreshToken(refreshToken)
		// 	console.log(cred)
		// 	res.send({ status: 'true', message: 'access token refreshed' })
		// } catch (err) {
		// 	console.log(err)
		// 	res.send({ status: 'false', message: 'Session ended, Login again' })
		// }
	}
}

module.exports = verifyToken
