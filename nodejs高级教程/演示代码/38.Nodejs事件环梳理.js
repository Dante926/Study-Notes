setTimeout(() => {
    console.log('s1');
    Promise.resolve().then(()=>{
        console.log('p1');
    })
    process.nextTick(()=>{
        console.log('t1');
    })
});

Promise.resolve().then(()=>{
    console.log('p2');
})

console.log('start');

setTimeout(() => {
    console.log('s2');
    Promise.resolve().then(()=>{
        console.log('p3');
    })
    process.nextTick(()=>{
        console.log('t2');
    })
});

console.log('end');
