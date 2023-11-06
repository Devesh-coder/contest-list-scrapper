const router = require('express').Router()
const { callback, refreshToken } = require('../controller/AuthController')
const logoutHandler = require('../controller/logoutHandler')
const verifyToken = require('../controller/verifyToken')

console.log('authRoute')
router.post('/google', callback)
router.get('/google/refresh-token/:uid', refreshToken)
router.get('/verify', verifyToken)
router.get('/logout', logoutHandler)

module.exports = router
