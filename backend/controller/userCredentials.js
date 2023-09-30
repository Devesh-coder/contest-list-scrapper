const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/userMode')

const updateUser = async (refreshToken, jwtToken) => {
	const { email, name, picture } = jwt.decode(jwtToken)
	console.log(jwtToken)

	return await User.findOneAndUpdate(
		{ email },
		{ refreshToken, name, picture },
		{ upsert: true, new: true },
	)
}

module.exports = updateUser
