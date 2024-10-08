// 文件的打开与关闭
const fs = require('fs');
const path = require('path');

// 1 open
fs.open(path.resolve('09test.txt'), 'r', (err, fd) => {
    console.log(fd);
    // 2 close
    fs.close(fd, (err) => {
        console.log('关闭成功');
    })
})

