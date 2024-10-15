const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
/* 
  日志纪录中间件：
    1.一般使用时在挂载的路由中传递dev表示在开发模式中启用日志记录，在部署模式中不启用日志记录
*/
const app = express()


// 跨域、日志、解析请求格式中间件
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

// 挂载统一路由入口
const router = require('./router')
app.use('/api', router)

app.get('/test', (req, res) => {
  res.send('测试成功');
});


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`)
})
