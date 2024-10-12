// 1.导入http模块
const http = require('http')
const fs = require('fs')

// 2.创建服务器
// 这里并不是真的创建了一个服务器，而是获取服务器的实力对象
const server = http.createServer()
server.listen(8081, () => {
    console.log('server is running at http://127.0.0.1:8081');
})

// 3.监听客户端请求
server.on('request', (req, res) => {
    // 1 初步认识http模块运作模式
    /* res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.write('你好') */
    /* res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.write('<h1>你好</h1>')
    res.end(); */
    /* 
        每次使用HTTP访问完毕一次服务器后都需要使用end来结束此次连接，否则服务器就会认为你还有程序没有执行完成(还有任务要执行？)
    */
    // console.log('客户端请求了');

    // 2 使用fs模块和http模块向请求该服务器的客户端返回文件
    if (req.url == '/') {
        // 服务端每次请求我们都需要去判断它请求的资源是什么再返回对应的资源
        fs.readFile('./index.html', 'utf-8', (err, data) => {
            /* 
                就如这里请求了index.html文件，
                index里面有一张图片，如果我们服务端只返回一个index.html的内容是不能够读取到图片内容的
                所以我们下面有了个else的逻辑
            */
            res.write(data)
            res.end()
        })
    } else {
        fs.readFile('./11点26分.jpg', (err, data) => {
            res.end(data)
        })
    }
})