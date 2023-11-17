const fs = require('fs')
const Contest = require('../models/contest')
const dateConfig = require('../config/dateConfig')

const contestUpload = async () => {
	const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'))
	try {
		const newData = dateConfig(data.data)
		console.log(JSON.stringify(newData), 'updated data inside of the dateCOnfig')
		await Contest.deleteMany({}).then(async () => {
			console.log('deleted')
			const newContest = await Contest.create(newData)
			console.log('contest added', newContest)
		})
	} catch (err) {
		console.log(err)
	}
}

module.exports = contestUpload
