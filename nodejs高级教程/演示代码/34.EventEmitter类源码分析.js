// EventEmitter类源码分析
const EventEmitter = require('events')

const ev = new EventEmitter()// 打断点,看它是如何实例化的
/* 
    new一个空对象,是完全的空对象.这是为了提高代码程序的性能
*/

ev.on('事件1',()=>{// 打断点.看它是如何订阅事件的
    console.log('事件1执行了');
})

ev.emit('事件1')// 打断点.看它是如何发布事件的
