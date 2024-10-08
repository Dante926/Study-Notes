const net = require('net');

// 创建服务端
const server = net.createServer();
server.listen(1234, () => {
    console.log('服务端启动了');
});

server.on('connection', (socket) => {
    socket.on('data', (data) => {
        console.log(data.toString());
    })
    socket.end('test http request')
})