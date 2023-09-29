const { OAuth2Client } = require('google-auth-library')
const asyncHandler = require('express-async-handler')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const oAuth2Client = new OAuth2Client(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	'postmessage',
)

const callback = asyncHandler(async (req, res) => {
	console.log(req.body.code, 'horiya hai')
	const { tokens } = await oAuth2Client.getToken(req.body.code) // exchange code for tokens
	console.log(jwt.decode(tokens.id_token))

	res.json(tokens)
})

const refreshToken = asyncHandler(async (req, res) => {
	const user = new UserRefreshClient(
		clientId,
		clientSecret,
		req.body.refreshToken,
	)
	const { credentials } = await user.refreshAccessToken() // optain new tokens
	res.json(credentials)
})

module.exports = { callback, refreshToken }
