const net = require('net');

// 创建服务端实例
const server = net.createServer();

const PORT = 1234;
const HOST = '127.0.0.1';
server.listen(PORT, HOST);

// server.listen 会触发listening事件
server.on('listening', () => {
    console.log(`服务端已经开启在${HOST}:${PORT}`);
})

// 接收消息 回写消息
server.on('connection', (socket) => {
    // socket是netsocket的实例：认为它是一个双工流(可写可读)
    socket.on('data', (chunk) => {
        const msg = chunk.toString();
        console.log(`收到客户端发来的消息：${msg}`);

        // 回复数据
        socket.write(Buffer.from('服务器回复：' + msg));
    })
})

server.on('close', () => {
    console.log('服务端关闭了');
})

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log('端口被占用');
    } else {
        console.log(err);
    }
})