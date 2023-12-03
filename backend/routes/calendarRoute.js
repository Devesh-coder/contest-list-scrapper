const router = require('express').Router()

const createEvent = require('../controller/calendarController')
const verifyToken = require('../controller/verifyToken')

router.post('/:id', verifyToken, createEvent)

module.exports = router
