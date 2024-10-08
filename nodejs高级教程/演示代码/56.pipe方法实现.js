// 1 语法熟悉
// const fs = require('fs');
// const rs = fs.createReadStream('./test.txt', {// 项目开发中尽量使用绝对路径
//     highWaterMark: 4
// });

// const ws = fs.createWriteStream('./test1.txt', {
//     highWaterMark: 1
// });


// rs.pipe(ws)// 将rs流中的数据输出到ws流中
// /* 
//     pipe底层任然是流实现的，任然是异步操作
// */
// rs.on('data',(chunk)=>{
//     // 虽然我们不能直观的观察到pipe中具体方法的实现，但是我们可以通过订阅数据事件来观察到数据在传输的过程
//     console.log(chunk);
// })


// 2 使用自定义可读流实现pipe方法
const fs = require('fs');
const myReadStream = require('./ReadStream');
const rs = new myReadStream('./test.txt', {// 项目开发中尽量使用绝对路径
    highWaterMark: 4
});
const ws = fs.createWriteStream('./test1.txt');

rs.pipe(ws)