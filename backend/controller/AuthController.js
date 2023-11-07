const { OAuth2Client, UserRefreshClient } = require('google-auth-library')
// const UserRefreshClient = require('./UserRefreshClient')
const asyncHandler = require('express-async-handler')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { updateUser, findUserById } = require('./userCredentials')

const oAuth2Client = new OAuth2Client(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	'postmessage',
)

const frontend_url = 'localhost'
console.log(process.env.CLIENT_ID, process.env.CLIENT_SECRET)

// const cookieMaxAge = 1 * 60 * 1000 // 1 minute

const callback = asyncHandler(async (req, res) => {
	const { tokens } = await oAuth2Client.getToken(req.body.code) // exchange code for tokens
	const userCred = await updateUser(tokens.refresh_token, tokens.id_token)
	console.log(userCred, 'userCred')

	// const maxAge = 6 * 30 * 24 * 60 * 60 * 1000 // 6 months
	const maxAge = 60 * 60 * 1000 // 1 hour
	// Ideally cookies should have the same expiry time as the jwt tokens
	// res.cookie('refreshToken', 'actual token in cookie')

	res.cookie('jwtToken', tokens.id_token, {
		maxAge,
		httpOnly: true,
		path: '/',
		secure: true,
		sameSite: 'None',
	})

	res.json({
		message: 'Login Successful',
		token: tokens.id_token,
		uid: userCred._id,
		userPicture: userCred.picture,
	})
})

const refreshToken = asyncHandler(async (req, res) => {
	const uid = req.params.uid
	console.log(uid, 'uid')

	const { refreshToken } = await findUserById(uid)
	console.log(refreshToken, 'refreshToken')
	const user = new UserRefreshClient(
		process.env.CLIENT_ID,
		process.env.CLIENT_SECRET,
		refreshToken,
	)
	const { credentials } = await user.refreshAccessToken() // optain new tokens
	console.log(credentials, 'credentials')
	const maxAge = 60 * 60 * 1000 // 1 hour
	res.cookie('jwtToken', credentials.id_token, {
		maxAge,
		httpOnly: true,
		path: '/',
		secure: true,
		sameSite: 'None',
	})

	res.json({ status: true, message: 'Session Extended' })
})

module.exports = { callback, refreshToken }
