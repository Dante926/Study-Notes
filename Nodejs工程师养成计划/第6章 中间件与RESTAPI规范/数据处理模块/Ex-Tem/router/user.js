// 注册&&登入 用户路由模块
const express = require('express')
const router = express.Router()
const validator = require('../middleware/validator/userValidator')

// 处理模块路由
const userHandler = require('../router_handler/user')

router.post('/register',validator.register,userHandler.register)

module.exports = router