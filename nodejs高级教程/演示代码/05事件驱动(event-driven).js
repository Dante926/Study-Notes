const EventEmitter = require('events');
const myEvent = new EventEmitter();
// 订阅事件
myEvent.on('事件1', (data) => {
    console.log('事件1执行了');
});

myEvent.on('事件1', (data) => {
    console.log('事件1被多次监听');
});
// 触发事件
myEvent.emit('事件1');