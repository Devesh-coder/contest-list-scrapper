const router = require('express').Router()

const createEvent = require('../controller/calendarController')

router.post('/', createEvent)

module.exports = router
