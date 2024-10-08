const net = require('net');

const client = net.connect({
    port: 1234,
    host: '127.0.0.1'
});

// 解决粘包问题
let dataArr = [
    '拉钩教育'
    , '拉钩教育1'
    , '拉钩教育2'
    , '拉钩教育3'
];

// 发送消息给服务端
client.on('connect', () => {
    client.write('拉钩教育')
    for (let i = 0; i < dataArr.length; i++) {
        // 匿名函数
        (function (val, index) {
            // val = dataArr[i]; index = i;
            setTimeout(() => {
                client.write(val)
            }, 100 * (index + 1));
        })(dataArr[i], i)
    }
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