import mongoose, { Schema } from 'mongoose'

var Contest = new Schema({
	json: Object,
})

mongoose.model('Contest', Contest)
