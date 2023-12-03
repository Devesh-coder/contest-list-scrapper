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
	// console.log(
	// 	'userID : ',
	// 	userid,
	// 	'\n payload: ',
	// 	payload,
	// 	'\n //////////Inside\\\\\\\\\\',
	// )
	return payload
}

const verifyToken = async (req, res, next) => {
	const jwtToken = req.cookies.jwtToken
	console.log('inside verifyToken', jwtToken)
	const uid = req.params.id
	console.log(uid, 'uid')
	console.log(req.cookies, 'cookies', req.params, 'params')

	if (jwtToken == undefined && uid == 'null') {
		console.log('user Unauthorized')
		return res.status(401).json({ status: false, message: 'Login First' })
	}
	if (jwtToken != undefined || uid != 'null') {
		if (jwtToken != undefined) {
			await verify(jwtToken)
			console.log('user verified')
			next()
		} else {
			// silent refresh
			// if (uid === null) {
			// 	console.log(err, '\n', 'user had no uid')
			// 	return res.status(401).json({ status: false, message: 'Login First' })
			// }
			try {
				const token = await refreshToken(req, res)
				req.cookies.jwtToken = token
				console.log('user refreshed')
				next()
			} catch (err) {
				console.log(err)
				console.log('silent refresh failed')
				return res
					.status(401)
					.json({ status: false, message: 'Session Ended login first' })
			}
		}
	}
}

module.exports = verifyToken
