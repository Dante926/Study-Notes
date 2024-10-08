const net = require('net');

const client = net.connect({
    port: 1234,
    host: '127.0.0.1'
});

// 发送消息给服务端
client.on('connect', () => {
    client.write('拉钩教育')
})

client.on('data', (chunk) => {
    console.log(chunk.toString());
})

client.on('error', (err) => {
    console.log(err);
})

client.on('close', () => {
    console.log('客户端关闭连接');
})