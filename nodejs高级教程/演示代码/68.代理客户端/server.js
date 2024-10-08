const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    console.log('存在请求');
    let { pathname, query } = url.parse(req.url, true);
    console.log(pathname, query);

    // 处理请求
    let arr = [];
    req.on('data', (data) => {
        arr.push(data);
    });
    req.on('end', () => {
        let obj = Buffer.concat(arr).toString();
        // 根据请求头发送过来的数据类型分别处理
        console.log(req.headers['content-type']);
        if (req.headers['content-type'] === 'application/json') {
            let a = JSON.parse(obj);
            a.add = '互联网人的大学'
            console.log(a);
            res.end(JSON.stringify(a));
        } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            let ret = querystring.parse(obj);
            res.end(JSON.stringify(ret))
        }

    });
});

server.listen(3000, () => {
    console.log('server starting...');
});