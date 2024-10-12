// 1.导入http模块
const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer()
server.listen(8081, () => {
    console.log('server is running at http://127.0.0.1:8081');
})

server.on('request', (req, res) => {
    // console.log(url.parse(req.url, true).query.id);
    if (req.method == 'GET') {
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
    } else if (req.method == 'POST') {     
        var data = ''
        req.on('data', (d) => {
            // 因为是流，所以当文件过大时不能一次性传递完成所以我们使用笨方法拼接
            // console.log(data);
            data += d;
            // console.log(data);
        })
        req.on('end', function () {
            // end data事件结束
            console.log(require('querystring').parse(data));
            // require('querystring')是一个模块，用来解析url里面的参数
            res.end()
        })
    }

})