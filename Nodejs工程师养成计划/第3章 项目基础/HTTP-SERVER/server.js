// 1.导入http模块
const http = require('http')

const router = require('./router')

const server = http.createServer()
server.listen(8081, () => {
    console.log('server is running at http://127.0.0.1:8081');
})

server.on('request', (req, res) => {
    // console.log(url.parse(req.url, true).query.id);
    router(req, res)
})