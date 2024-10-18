// 统计所有路由
const express = require('express')
const router = express.Router()

router.use('/user',require('./user'))

module.exports = router