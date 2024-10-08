const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    /* console.log('请求进来了');

    // 请求路径
    let { pathname, query } = url.parse(req.url, true);
    console.log(pathname, query);

    // 请求方式
    console.log(req.method);

    // 版本号获取
    console.log(req.httpVersion);

    // 请求头
    console.log(req.headers); */

    // 请求体获取(可以在终端cmd中发送数据模拟请求)
    let arr = [];
    req.on('data', chunk => {
        arr.push(chunk);
    });
    req.on('end', () => {
        let data = Buffer.concat(arr);
        console.log(data.toString());
    }); 
});

server.listen(3000, () => {
    console.log('server starting...');
});