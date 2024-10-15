// 在index中统计所有其他路由
const express = require('express')
const router = express.Router()// 获取路由实例

router.use('/user',require('./user'))
router.use('/video',require('./video'))

module.exports = router