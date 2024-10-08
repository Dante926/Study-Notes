// 35(p40).EventEmitter模拟实现
function MyEvent() {
    this._events = Object.create(null) // 准备一个数据结构用于缓存订阅者信息
}

MyEvent.prototype.on = function (type, callback) {
    // 判断当前次的事件是否已经存在
    if (this._events[type]) {
        // 如果存在则往_events[]中添加该事件的回调
        this._events[type].push(callback)
    } else {
        this._events[type] = [callback]
    }
}

MyEvent.prototype.emit = function (type, ...args) {
    if (this._events && this._events[type].length) {
        this._events[type].forEach((callback) => {
            callback.call(this, ...args)// 使用call触发回调
        })
    }
}

MyEvent.prototype.off = function (type, callback) {
    // 判断当前type事件监听是否存在，如果存在则取消指定的监听 
    if (this._events && this._events[type]) {
        // 数组过滤操作
        this._events[type] = this._events[type].filter((item) => {// 过滤方法，若不符合以下条件则返回false
            return item !== callback && item.link !== callback// 返回true当前元素被保留在新的数组中
        })
    }
}

MyEvent.prototype.once = function (type, callback) {
    /*
        如果程序是这么写，那么还没等触发回调函数，订阅就被解除了 
        this.on(type,callback)
        this.off(type,callback) 
    */
    let foo = function (...args) {
        callback.call(this, ...args)
        this.off(type, foo)
    }
    foo.link = callback// foo和callback简历联系(这里的link是我们自定义的属性)
    this.on(type, foo)
}

const ev = new MyEvent()

// 1 发布订阅
/* function cb(...data) {
    console.log('触发了事件1', data)
}

ev.on('事件1', cb)
ev.on('事件1',()=>{
    console.log('事件1-2执行了');
})

ev.emit('事件1', 1, 2) */

// 2 off操作
/* function cb(...data) {
    console.log('触发了事件1', data)
}

ev.on('事件1',cb)
ev.emit('事件1','前')
ev.off('事件1',cb)
ev.emit('事件1','后') */

// 3 once订阅
const cb = function (...data) {
    console.log(data);
}
ev.once('事件1', cb)
ev.off('事件1', cb)
/* 
    这里应该off后就触发不了emit了的。这是因为我们的once函数中的
    foo函数和callback函数没有起到一个联系的作用
*/
ev.emit('事件1', 1, 2, 3)