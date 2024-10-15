const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// 引入路由
const user_Router = require('./router/index')

app.use('/users', user_Router)//挂载路由

// 如果都没有匹配的路由
/* app.use((req, res, next) => {
  // 获取请求地址
  const url = req.originalUrl
  console.log(url);
  next()
})

app.use((req, res) => {// 如果没有匹配路由则返回404
  res.status(404).send('404 Not Found')
}) */

// 如果因为服务器处理问题而报错
app.get('/err', (req, res) => {
  console.log(req.method);
  // 故意发生处理错误
  throw new Error('服务器内部错误')
})

app.use((err, req, res, next) => {// 错误处理中间件(必须要有四个参数，才叫做错误处理中间件)
  console.log(err);
  res.status(500).send('服务器发生错误')
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
