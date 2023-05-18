import mongoose, { Schema } from 'mongoose'

var Contest = new Schema({
	constestName: String,
	contests: [
		{
			name: String,
			link: String,
			startTime: String,
			duration: String,
		},
	],
})

mongoose.model('Contest', Contest)
