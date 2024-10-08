const http = require('http');

/* http.get({
    host: '127.0.0.1',
    port: 3000,
    path: '/?a=1'
}, (res) => {

})
 */

let options = {
    host: '127.0.0.1',
    port: 3000,
    path: '/?a=1',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', // 告诉服务器，客户端发送的数据格式
        'Content-Type': 'application/x-www-form-urlencoded' // form表单
    }
}

// 使用客户端发送数据
let req = http.request(options, (res) => {
    let arr = [];
    res.on('data', (data) => {
        arr.push(data);
    })
    res.on('end', () => {
        console.log(Buffer.concat(arr).toString());
    })
})

// req.end('拉钩教育')
// req.end('{"name":"sjp"}')

// 发送请求体数据并结束请求
// req.end('{"name":"sjp"}');
req.end('a=1&b=2');