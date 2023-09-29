const router = require('express').Router()
const { callback, refreshToken } = require('../controller/AuthController')

console.log('authRoute')
router.post('/google', callback)
router.post('/google/refresh-token', refreshToken)

module.exports = router
