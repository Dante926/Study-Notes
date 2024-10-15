// 注册&&登入 用户路由模块
const express = require('express')
const router = express.Router()

// 处理模块路由
const userHandler = require('../router_handler/user')

router.get('/getuserlist', userHandler.getuserlist)

module.exports = router