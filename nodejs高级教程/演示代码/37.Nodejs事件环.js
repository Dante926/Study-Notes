setTimeout(() => {// 定时器是一个宏任务 
    console.log('s1');
});

Promise.resolve().then(()=>{
    console.log('p1');
})

console.log('start');

process.nextTick(()=>{
    console.log('Nodejs平台下的微任务');
})

setImmediate(()=>{
    console.log('setsetImmediateime');
})

console.log('end');
