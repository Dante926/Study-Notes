const fs = require('fs')

module.exports = {
    index(res) {
        fs.readFile('./index.html', 'utf-8', (err, data) => {
            /* 
                就如这里请求了index.html文件，
                index里面有一张图片，如果我们服务端只返回一个index.html的内容是不能够读取到图片内容的
                所以我们下面有了个else的逻辑
            */
            res.write(data)
            res.end()
        })
    },

    user(postData, res) {
        console.log(postData);
    }
}