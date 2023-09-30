const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

const port = 5000 || process.env.PORT

require('./config/database')
require('./scrape')

const contestsRoute = require('./routes/contestData')
const calendarRoute = require('./config/google-calender/calendar')
const testRoute = require('./routes/testRoute')
const verifyToken = require('./controller/verifyToken')

app.use('/contests', contestsRoute)
app.use('/google', calendarRoute)
app.use('/auth', authRoute)

app.use('/test', testRoute)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
