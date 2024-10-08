// 核心模块之Event
const EventEmitter = require('events')
// 有两种操作
// 1.相对event内容进行扩展的情况下
// class extends EventEmitter //可以定义一个类,然后去继承这个Event类

// 2.通过实例化 
const ev = new EventEmitter()

// on 订阅事件
/* ev.on('事件1', () => {
    console.log('事件1被触发');// 发布订阅时就会触发这个订阅事件的回调函数
})

ev.on('事件1', () => {
    console.log('多次订阅的事件1被执行了');
})
// emit
ev.emit('事件1')// 发布 事件1 订阅
ev.emit('事件1')// 可以多次订阅 */

// once 订阅事件
/* ev.once('事件1',()=>{
    console.log('事件1once执行了');
})

ev.once('事件1',()=>{
    console.log('事件1once多次执行了');
})

ev.emit('事件1')
ev.emit('事件1')// 使用once注册(订阅的事件不能被多次发布)的事件 */

// off 
/* let cbFn=()=>{
    console.log('事件1执行了');
}
ev.on('事件1',cbFn)
ev.emit('事件1')
ev.off('事件1',cbFn)
ev.emit('事件1') */
// let cbFn=(a,b,c,d)=>{// 当我们想传递参数是,直接往发布事件传递参数即可
//     console.log(a);
//     console.log(b);
//     console.log(c);
//     console.log(d);
// }
/* let cbFn = (...args) => {// args就是我们使用该cbFn函数时调用的那个事件的参数
    console.log(args);
}
// 但是以上这种方法不适用于多个参数传递的实现
ev.on('事件1', cbFn)
ev.emit('事件1', 1, 2, 3, 4) */

/// 实验
/* ev.on('事件1',()=>{
    console.log(this);// 这里的this其实跟上下文是没太大关系的(跟它当前这个大括号没关系)
}) */
/* ev.on('事件1', function () {
    console.log(this);// 不使用箭头函数,作用域不一样.所以能指向on事件里的EventEmitter对象
})
ev.on('事件1', function () {
    console.log('this');// 当我们订阅多个事件.那么this对象里的_events(缓存队列)键值里的函数就会变成数组不再是单独一个匿名的回调函数
})
ev.emit('事件1') */

/// 实验
/* 
    ①那么通过刚刚的实验我们可以知道.on里存在一个类叫做EventEmitter类.
    ②那么我们又知道很多核心模块又都继承这个类.那当我们使用其他模块的时候就不用在导入EventEmitter.
    ③许多核心模块可以自然而然的调用on等这些行为
    演示:
*/
const fs = require('fs')
const crt = fs.createReadStream('example.txt', { encoding: 'utf8' })
crt.on('data', (chunk) => {
    /* 
        具体来说，
        当创建了一个可读流之后，
        Node.js 会异步地从源头（例如文件）读取数据，
        并且每当有一部分数据准备好可以处理时，
        它就会触发 'data' 事件。
        你可以通过监听这个事件来获取这些数据块并进行相应的处理。
    */
    console.log(`Received ${chunk.length} bytes of data.`);
    console.log(chunk);
})
/* 
    从以上实验我们就可以得知,
    Nodejs怎么在合适的时间拿到我们这个异步操作返回的数据.
    通过上述的API演示,
    它会在这个事件触发后,
    自动的执行回调函数操作,
    那么它里面的数据就被返回了
*/

