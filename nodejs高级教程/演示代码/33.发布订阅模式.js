// 发布订阅模式
class PubSub {
    constructor() {// 构造方法
        this._events = {}// 给其添加Event做存储的属性
    }

    // 订阅者能注册监听的注册操作
    subscribe(event, callback) {
        if (this._events[event]) {
            // 如果当前event存在,所以我们只需要往后添加当前次监听操作
            this._events[event].push(callback)
        } else {
            // 之前没有订阅该事件
            this._events[event] = [callback]
        }
    }

    // 发布消息操作
    publish(event, ...args) {
        const items = this._events[event]// this._events[event]本身就是一个回调函数了或者是一个回调函数的数组了
        if (items && items.length) {
            items.forEach(function (callback) {// 遍历每个回调函数.
                callback.call(this, ...args)// 将这这些参数遍历的传入进各个回调函数中
            })
        }
    }
}

let ps = new PubSub()
ps.subscribe('事件1',()=>{
    console.log('事件1执行了');
})
ps.subscribe('事件1',()=>{
    console.log('事件1-2执行了');
})

ps.publish('事件1')
ps.publish('事件1')