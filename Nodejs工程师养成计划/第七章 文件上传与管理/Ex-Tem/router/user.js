// 注册&&登入 用户路由模块
const express = require('express')
const router = express.Router()
const validator = require('../middleware/validator/userValidator')

// 处理模块路由
const userHandler = require('../router_handler/user')

// 验证token模块
const { verifyToken } = require('../util/jwt')

router
    .post('/registers', validator.register, userHandler.register)
    .post('/logins', validator.login, userHandler.login)
    .get('/lists', verifyToken, userHandler.list)
    .put('/', verifyToken, validator.update, userHandler.update)


module.exports = router