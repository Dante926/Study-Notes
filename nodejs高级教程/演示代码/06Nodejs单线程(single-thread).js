const http = require('http');

function sleepTime(time) {
    const sleep = Date.now() + time * 1000;
    while (Date.now() < sleep) { }
    return
}

// 模拟CPU密集型任务
sleepTime(4)

const server = http.createServer((req, res) => {
    res.end('server starting...');
});

server.listen(3000, () => {
    console.log('服务启动了...');
});