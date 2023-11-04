const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const cookieParser = require('cookie-parser')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const frontend_url = process.env.FRONTEND_URL

console.log(frontend_url)
app.use(
	cors({
		// origin: frontend_url != '' ? frontend_url : 'http://localhost:3000', // Adjust this to match your frontend URL
		origin: '*', // Allow from anywhere
		credentials: true,
	}),
)
app.use(express.json())
app.use(cookieParser())

const port = 5000 || process.env.PORT

require('./config/database')
require('./scrape')

const contestsRoute = require('./routes/contestData')
const calendarRoute = require('./routes/calendarRoute')
const testRoute = require('./routes/testRoute')
const verifyToken = require('./controller/verifyToken')

app.use('/contests', contestsRoute)
app.use('/create-event', calendarRoute)
app.use('/auth', authRoute)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
