const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.all('/xx', (req, res) => {// 可以接受所有格式请求的访问
  res.send('hello')
})

app.get('/us?er', (req, res) => {
  res.send(`${req.method}---${req.url}`)
  /* 
    us?er 表示只要有er后缀的url都可以访问
    us+er 表示可以写多个s任然匹配路径
    us*er 表示可以任意个字符匹配路径
  */
})

app.get('/user/:id/video/:ID', (req, res) => {// 获取动态参数
  console.log(req.params)
  res.send(`${req.method}---${req.url}`)
})

// 链式调用
app
  .get('/ls', (req, res) => {
    console.log(req.method);
    res.download()// 将需要下载的文件放回给客户端
    res.json()// 将数据数组以json格式返回
    res.redirect()// 重定向
    res.render()// 渲染模板
    res.status()// 设置状态码 加上.json()可以将数据一起返回给客户端
  })
  .post('/ls', (req, res) => {
    console.log(req.method);
  })

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
