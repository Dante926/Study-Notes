// 1 常见问题之 0 延时代码
// setTimeout(()=>{
//     console.log('timeout');
// })// 在我们不设置任何时间延迟的情况下,会默认延迟为0
// /* 
//     但是这个0往往会因为一些因素,会产生延迟
//     所以当产生延时的时候.在同步代码中就会先去执行往下的同步代码再回来执行延时代码
// */

// setImmediate(()=>{
//     console.log('immediate');
// })

// 2 
const fs = require('fs')
fs.readFile('09test.txt',(err,data)=>{
    console.log(data.toString()); 
    setTimeout(()=>{
        console.log('timeout');
    })
    setImmediate(()=>{
        console.log('immediate');
    })
})
/* 
    为什么以上代码固定了先执行imme再执行timeout呢?
    *这是因为settimeout放入的事件队列是timers队列,setimmediate放入的事件队列是check队列
     readFile放入的是poll队列.当我们根据同步代码的顺序执行时,将readFile放入的poll队列后就会开始执行程序.
     首先去看微任务(没有任何微任务),那就根据事件环顺序从poll队列中往下走,正好check队列在poll队列下面.所以就先执行了check队列
*/
