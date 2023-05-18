const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
app.use(cors())

const port = 5000 || process.env.PORT

require('./config/database')
require('./scrape')

app.get('/', (req, res) => {
	const data = fs.readFileSync('data.json', 'utf8')
	res.send(data)
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
