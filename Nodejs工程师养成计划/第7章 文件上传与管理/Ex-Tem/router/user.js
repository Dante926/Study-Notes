// 注册&&登入 用户路由模块
const express = require('express')
const router = express.Router()
const validator = require('../middleware/validator/userValidator')
// 处理模块路由
const userHandler = require('../router_handler/user')
// 验证token模块
const { verifyToken } = require('../util/jwt')
// 文件上传模块
const multer = require('multer')
const upload = multer({ dest: 'public/headimgs' })

router
    .post('/registers', validator.register, userHandler.register)
    .post('/logins', validator.login, userHandler.login)
    .get('/lists', verifyToken(), userHandler.list)
    .put('/', verifyToken(), validator.update, userHandler.update)
    .post('/headimgs', verifyToken(), upload.single('headimg'), userHandler.headimg)

module.exports = router