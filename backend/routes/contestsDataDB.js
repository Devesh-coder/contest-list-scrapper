const fs = require('fs')
const Contest = require('../models/contest')

const contestUpload = async (req, res) => {
	const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'))
	try {
		Contest.deleteMany({}).then(async () => {
			console.log('deleted')
			const newContest = await Contest.create(data)
			console.log('contest added', newContest)
		})
	} catch (err) {
		console.log(err)
	}
}

module.exports = contestUpload
