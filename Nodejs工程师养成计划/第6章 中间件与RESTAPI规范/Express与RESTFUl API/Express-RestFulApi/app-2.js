const express = require('express')

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express()

const PORT = process.env.PORT || 3000

// 日记中间件
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next();
})

// 限定请求方法中间件
/* app.get('/user', (req, res, next) => {
  next();// 其实就是多了个next(),用来处理完成请求后可以继续下面的程序
}) */

// 限制只处理访问user请求中间件
app.get('/user', (req, res, next) => {
  next();// 这个next只限于user的请求
}, function (req, res, next) {
  console.log('user请求处理完成');
  next()// 这里还能继续往下处理数据
}, function (req, res) {
  console.log('二次处理');
  res.send('Hello World!')// 响应请求后就不能next()了
})


// 挂载路由
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 挂载统一处理服务端错误中间件
// app.use(errorHandler())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
