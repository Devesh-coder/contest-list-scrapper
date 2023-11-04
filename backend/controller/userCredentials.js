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

const findUser = async (jwtToken) => {
	const { email } = jwt.decode(jwtToken)
	console.log(email, 'inside userCredentials')

	return await User.findOne({ email })
}

module.exports = { updateUser, findUser }
