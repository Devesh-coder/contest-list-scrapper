const mongoose = require('mongoose')

class Connection {
	constructor() {
		const url =
			process.env.MONGODB_URL || `mongodb://localhost:27017/contest-cluster`
		console.log('Establish new connection with url', url)
		mongoose.connect(url)
	}
}

module.exports = new Connection()
