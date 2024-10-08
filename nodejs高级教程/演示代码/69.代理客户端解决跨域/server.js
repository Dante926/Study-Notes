const http = require('http');

const server = http.createServer((req, res) => {
    let arr = [];
    req.on('data', (data) => {
        arr.push(data);
    })
    req.on('end', () => {
        console.log(Buffer.concat(arr).toString());
        res.end('客户端回复:' + Buffer.concat(arr).toString())
    })
});

server.listen(3000, () => {
    console.log('公网服务端启动了...');
});