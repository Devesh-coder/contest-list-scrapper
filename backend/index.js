const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

const port = 5000 || process.env.PORT

require('./config/database')
const data = require('./scrape')

app.get('/', (req, res) => {
	res.send(data)
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
