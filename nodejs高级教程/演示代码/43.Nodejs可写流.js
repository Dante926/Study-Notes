// 自定义可写流
const {Writable} = require('stream')

class MyWriteable extends Writable {
    constructor() {
        super()
    }
    // 重写函数
    _write(chunk, en, done) {
        /* 
            chunk 执行写入的数据块
            en 执行编码
            done 执行回调函数
        */
        // 标准输出
        process.stdout._write(chunk.toString()+'<--')
        // 执行回调(我们的回调一定要在执行wirte方法后才执行,所以放进一个队列中)
        process.nextTick(done)
    }
}
let myWriteable = new MyWriteable()
myWriteable._write('拉钩教育','utf-8',()=>{
    console.log('写入完成');
})