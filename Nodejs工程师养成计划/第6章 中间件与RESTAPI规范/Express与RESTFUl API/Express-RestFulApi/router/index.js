const express = require('express')
const router = express.Router()// 获取路由实例

router.get('/user',(req,res)=>{
    res.send('访问:user')
})

module.exports = router