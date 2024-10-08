// 48.writr执行流程
const fs = require('fs');

let ws = fs.createWriteStream('test1.txt',{
    highWaterMark: 3
});

/* 
    探究writr执行流程目的：将来使用对应事件的时候，它会触发机制里有一句话：‘当前缓存区可以再次执行写入时，drain事件就会被触发’所以跟写入有关的就跟write有关。
    去探究write流程我们就可以更清楚的理解数据从上游生产者传递到下游消费者的过程是如何发生的。这样就可以做到限流和控制速度。
*/
let flag = ws.write('1')
console.log(flag);
flag = ws.write('2')
console.log(flag);
flag = ws.write('3')
console.log(flag);// 如果flag为false并不意味当前的数据不能被执行写入
/* 
    false说明具体看md文档
    总结：highWaterMark是警戒线的意思
    ①当生产者速度过快，缓冲区超出了highWaterMark，
    此时write返回false，
    此时生产者可以暂停生产，
    等待缓冲区数据消费完毕，再继续生产。
    ②缓冲区可以继续写入数据生产者是如何知道的？ drain事件来通知<---
*/
ws.on('drain',()=>{
    console.log('11');
})