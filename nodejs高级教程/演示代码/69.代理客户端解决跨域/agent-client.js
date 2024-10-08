const http = require('http');

let options = {
    hostname: 'localhost',
    port: 3000,// 目标服务器端口
    path: '/',
    method: 'POST'
};

/* let req = http.request(options, (res) => {
    let arr = [];
    res.on('data', (data) => {
        arr.push(data);
    })
    res.on('end', () => {
        console.log(Buffer.concat(arr).toString());
    })


})

req.end('拉钩教育'); */
// 想要成为一个代理客户端很简单
/* 
    ①对于客户端，我们是服务端
    ②对于客户端请求的服务端，我们是请求客户端

    所以我们的代理端：
    -即是服务端
    -又是客户端
    -所以要有客户端和服务端两个功能
*/

let server = http.createServer((request, response) => {
    let req = http.request(options, (res) => {
        let arr = [];
        res.on('data', (data) => {
            arr.push(data);
        })
        res.on('end', () => {
            let ret = Buffer.concat(arr).toString();
            response.setHeader('content-type', 'text/html;charset=utf-8')
            response.end(ret);
        })
    })
    req.end('拉钩教育');
});

server.listen(3001, () => {
    console.log('本地代理服务端启动了...');
});