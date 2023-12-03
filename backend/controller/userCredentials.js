const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/userMode')

const updateUser = async (refreshToken, jwtToken) => {
	const { email, name, picture } = jwt.decode(jwtToken)
	// console.log(jwtToken)

	return await User.findOneAndUpdate(
		{ email },
		{ refreshToken, name, picture },
		{ upsert: true, new: true },
	)
}

const findUser = async (jwtToken) => {
	const { email } = jwt.decode(jwtToken)
	// console.log(email, 'inside userCredentials')

	return findUserByEmail(email)
}

const findUserByEmail = async (email) => {
	return await User.findOne({ email })
}

const findUserById = async (uid) => {
	// const objUid = mongoose.Types.ObjectId(uid)
	const objectId = new mongoose.Types.ObjectId(uid)

	// console.log(objUid, 'inside findUserById')
	return await User.findById(objectId)
	// return await User.findById(objUid)
}

module.exports = { updateUser, findUser, findUserByEmail, findUserById }
