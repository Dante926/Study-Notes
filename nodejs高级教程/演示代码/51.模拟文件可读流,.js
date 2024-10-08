const fs = require('fs');

const EventEmiiter = require('events');

class MyFileReadStream extends EventEmiiter {
    // 模拟文件可读流
    constructor(path, options = {}) {// options默认是 {}配置参数
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.mode = options.mode || 438;
        this.autoClose = options.autoClose || true;
        this.start = options.start || 0;
        this.end = options.start;
        this.highWaterMark = options.highWaterMark || 64 * 1024;

        this.open();
    }

    open() {
        // 原生open方法
        console.log('open');

        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                this.emit('error', err);
            }
            this.fd = fd;
            this.emit('open', fd);
        })
    }
}

let rs = new MyFileReadStream('test.txt');
rs.on('open', (fd) => {
    console.log('open', fd);
})