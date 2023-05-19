const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
app.use(cors())
app.use(express.json())

const port = 5000 || process.env.PORT

require('./config/database')
require('./scrape')

const contestsRoute = require('./routes/contestData')
const contestsDataUpload = require('./routes/contestsDataDB')

app.use('/contests', contestsRoute)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
