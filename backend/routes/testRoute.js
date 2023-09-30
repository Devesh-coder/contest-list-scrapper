const verifyToken = require('../controller/verifyToken')

const router = require('express').Router()

router.post('/', verifyToken)

module.exports = router
