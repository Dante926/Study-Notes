const http = require('http');

const server = http.createServer((req, res) => {
    console.log('存在请求');

    /* res.write('ok')
    res.end(); */
    // res.end('test ok');
    res.statusCode = 302;
    res.setHeader('content-type', 'text/html;charset=utf-8');// 告诉浏览器，返回的数据是utf8格式
    res.end('拉钩教育');
});

server.listen(3000, () => {
    console.log('server starting...');
});