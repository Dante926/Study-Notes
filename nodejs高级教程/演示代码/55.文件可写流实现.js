const fs = require('fs');
const EventEmiiter = require('events');
const Queue = require('./linkedlist');

class MyWriteStream extends EventEmiiter {
    // 实现文件可写流
    constructor(path, options = {}) {
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.mode = options.mode || 438;
        this.autoClose = options.autoClose || true;
        this.start = options.start || 0;
        this.encoding = options.encoding || 'utf8';
        this.highWaterMark = options.highWaterMark || 16 * 1024;

        this.open();
        this.writeoffset = this.start;
        this.writing = false;// 是否正在写入操作
        this.writLen = 0//累计写入量
        this.needDrain = false;// 是否需要触发drain事件
        this.cache = new Queue();// 用我们之前创建好的链表来存储未写入的数据
    }

    open() {
        console.log('open');
        // 通过原生fs模块实现可写流
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                this.emit('error', err);
            }
            // 正常打开文件
            this.fd = fd;
            this.emit('open', fd);
        })
    }

    write(chunk, encoding, cb) {
        /* 细节处理
            多次调用write偏移量处理，drain处理
        */
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);

        // 累加写入量
        this.writLen += chunk.length;
        // console.log('writLen', this.writLen);
        let flag = this.writLen < this.highWaterMark;
        this.needDrain = !flag;
        if (this.writing) {
            // 当前正在写入,将数据存储到缓存中
            this.cache.enQueue({ chunk, encoding, cb });
            /* 
                当我们在执行多个write时，我们就先把第一个write的限制性，把第二个或多个write存储到缓冲中
            */

        } else {// 当前没写入
            this.writing = true;// 更新写入状态
            this._write(chunk, encoding, () => {
                cb();// 切片思想，相当于触发了两个回调在一个方法中
                // 清空排队内容
                this._clearBuffer();
            });// 执行写入操作 
        }
        return flag;
    }

    _write(chunk, encoding, cb) {
        // 处理异步问题获取this.fd
        if (typeof this.fd !== 'number') {
            return this.once('open', () => {
                return this._write(chunk, encoding, cb);
            })
        }
        fs.write(this.fd, chunk, this.start, chunk.length, this.writeoffset, (err, written) => {
            this.writeoffset += written;
            this.writLen -= written;
            cb && cb();
        })
    }

    _clearBuffer() {
        let data = this.cache.deQueue();
        // console.log(data);
        if (data) {
            // 缓冲中任然有内容
            this._write(data.element.chunk, data.element.encoding, () => {// 将缓冲中的内容写入
                data.element.cb && data.element.cb();
                this._clearBuffer();// 继续清空缓冲区
            })
        } else {
            if (this.needDrain && this.writLen < this.highWaterMark) {
                this.needDrain = false;
                this.emit('drain');
            }
        }
    }
}

const ws = new MyWriteStream('./test.txt', {
    highWaterMark: 1
});

/* ws.on('open', (fd) => {
    console.log('open', fd);
})
 */



let flag = ws.write('1', 'utf8', () => {
    console.log('1');
})
console.log(flag);


flag = ws.write('02', 'utf8', () => {
    console.log('02');

})

flag = ws.write('百色学院', 'utf8', () => {
    console.log('百色学院');
})

console.log(flag);

ws.on('drain', () => {
    console.log('drain');
})
