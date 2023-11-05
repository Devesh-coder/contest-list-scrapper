const { OAuth2Client } = require('google-auth-library')
const asyncHandler = require('express-async-handler')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { updateUser } = require('./userCredentials')

const oAuth2Client = new OAuth2Client(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	'postmessage',
)
const frontend_url = 'localhost'
console.log(process.env.CLIENT_ID, process.env.CLIENT_SECRET)

const callback = asyncHandler(async (req, res) => {
	const { tokens } = await oAuth2Client.getToken(req.body.code) // exchange code for tokens
	await updateUser(tokens.refresh_token, tokens.id_token)

	// const maxAge = 6 * 30 * 24 * 60 * 60 * 1000
	const maxAge = 60 * 60 * 1000 // 1 hour
	// Ideally cookies should have the same expiry time as the jwt tokens
	// res.cookie('refreshToken', 'actual token in cookie')

	res.cookie('jwtToken', tokens.id_token, {
		maxAge,
		httpOnly: true,
		path: '/',
		// domain: frontend_url,
		secure: true,
		sameSite: 'None',
	})

	res.json({ message: 'success', token: tokens.id_token })
})

const refreshToken = asyncHandler(async (req, res) => {
	const user = new UserRefreshClient(
		clientId,
		clientSecret,
		req.body.refreshToken,
	)
	const { credentials } = await user.refreshAccessToken() // optain new tokens
	res.json({ status: true, message: credentials })
})

// const refreshToken = async (refreshToken) => {
// 	const user = new UserRefreshClient(clientId, clientSecret, refreshToken)
// 	const { credentials } = await user.refreshAccessToken() // optain new tokens
// 	console.log(credentials, '////////cred\\\\\\\\')
// 	return credentials
// 	// res.json(credentials)
// }

module.exports = { callback, refreshToken }
