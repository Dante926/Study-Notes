const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));// 只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(bodyParser.json());

// 注册挂载路由

// const indexRouter = require('./router/index');
// app.use('/api', indexRouter);

const userRouter = require('./router/user');
app.use('/api/user', userRouter);


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`)
})