const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const url = process.env.MONGO_URL
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const con = mongoose.connection
con.on('open', () => {
	console.log('Connected...')
})
