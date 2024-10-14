const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// 引入路由
const user_Router = require('./router/index')

app.use('/users', user_Router)//挂载路由


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
