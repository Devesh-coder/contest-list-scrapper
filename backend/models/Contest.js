const mongoose = require('mongoose')

const contestSchema = new mongoose.Schema({
	contestName: String,
	contests: [
		{
			name: String,
			link: String,
			startTime: String,
			duration: String,
		},
	],
})

module.exports = mongoose.model('Contest', contestSchema)
