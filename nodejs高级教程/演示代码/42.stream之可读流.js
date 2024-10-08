const { Readable } = require('stream')
// 模拟底层数据
let source = ['lg', 'zce', 'syy']

// 自定义类传承Readable
class MyReadable extends Readable {
    // 重申:构造方法是初始化对象的特殊方法.在实例化一个对象时自动调用
    constructor() {
        super()
        this.source = source
    }
    _read() {
        let data = this.source.shift() || null
        /* 
            // shift() 删除数组的第一个元素并返回(取出一个元素并复制给data)
            如果不存在数据了就返回null
        */
        this.push(data)
    }
}

// 实例化
let myReadable = new MyReadable(source)

// 监听readable事件 暂停模式
/* myReadable.on('readable', () => {
    // readable相当于暂停模式
    // console.log(1)

    let data = null;
    while ((data = myReadable.read()) !== null) {
        console.log(data.toString());// 第一个元素和第二个元素连着一起输出是因为readable在触发时机上的原因.在被触发那个时间点上已经存在了第一个元素内容,再去读取数据的时候,就会将第二个元素一起放进第一个元素内容的缓冲区.所以被一起输出了出来
    }
}) */

// 监听data事件 流动模式
myReadable.on('data', (chunk) => {
    console.log(chunk.toString());
    // 这里不会连着输出是因为,一旦取出数据就会将数据交给data.就直接被输出了
})