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
        this.end = options.end;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.readOffset = 0;

        this.open();
        this.on('newListener', (type) => {
            // 监听新事件触发 监听
            // console.log(type);
            if (type === 'data') {
                this.read()
            }
        })
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

    read() {
        // console.log(this.fd);// 如果这么做是拿不到fd的。因为当我们调用data监听时。我们显然时先触发read后才调用的open。但open里的fd是通关原生fs模块打开的是异步操作。所以读取不到。
        // 通过发布订阅解决该问题
        if (typeof this.fd !== 'number') {
            // 这里为什么要用if，是因为如果当我们在主体部分本事调用data这个方法时，data本身是异步操作了。那我们上面直接this.fs又是合理的了。为了解决该问题使用if
            return this.once('open', this.read)
        }
        // console.log(this.fd);
        let buf = Buffer.alloc(this.highWaterMark);
        // 对end使用
        let howMuchToRead;
        howMuchToRead = this.end ? Math.min(this.end - this.readOffset + 1, this.highWaterMark) : this.highWaterMark;

        fs.read(this.fd, buf, 0, howMuchToRead, this.readOffset, (err, readBytes) => {
            if (readBytes) {
                this.readOffset += readBytes
                this.emit('data', buf.slice(0, readBytes))// 触发data事件,将读取到的数据发送出去。silce()以保证返回内容是一个无0的buffer
                this.read()
            } else {
                this.emit('end')
                this.close()
            }
        })

    }

    close() {
        fs.close(this.fd, () => {
            this.emit('close')
        })
    }
}

let rs = new MyFileReadStream('test.txt', {
    highWaterMark: 3,
    // 对end值使用
    end: 7
});
/* rs.on('open', (fd) => {
    console.log('open', fd);
}) */

/* rs.on('error', (err) => {
    console.log('出错了');
}) */

rs.on('data', (chunk) => {
    console.log(chunk);
})

rs.on('end', () => {
    console.log('end');
})

rs.on('close', () => {
    console.log('close');
})