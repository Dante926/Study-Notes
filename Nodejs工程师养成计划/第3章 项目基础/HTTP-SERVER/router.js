// 根据不同请求转发不同方法
const fs = require('fs')
const url = require('url')
const router_controller = require('./router-controller')

module.exports = (req, res) => {
    if (req.method == 'GET') {
        if (req.url == '/') {
            router_controller.index(res);
        } else {
            fs.readFile('./11点26分.jpg', (err, data) => {
                res.end(data)
            })
        }
    } else if (req.method == 'POST') {
        var data = ''
        req.on('data', (d) => {
            data += d;
        })
        req.on('end', function () {
            router_controller.user(require('querystring').parse(data), res)
            res.end()
        })
    }
}