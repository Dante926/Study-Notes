// 36.浏览器中的Eventloop
/* 
    浏览器中的Eventloop机制
    ①根据程序从上至下将宏任务放入宏任务队列中
    ②执行宏任务前，会将宏任务对应的微任务放入微任务队列中
    ③执行宏任务，并将宏任务的微任务全部执行完毕
*/
// setTimeout(() => {// 虽然这里没有指定延时时间，但并不意味着会马上执行。setTimeout会将回调函数排入'宏任务队列'中
//     console.log('s1');
//     Promise.resolve().then(() => {
//         /* 
//             Promise.resolve()这里会创建一个已经解决的Promise(这里意味着触发微任务的条件已经满足)，
//             并将 .then() 的回调放入微任务队列。
//         */
//         console.log('p1');
//     })
//     Promise.resolve().then(() => {
//         console.log('p2');
//     })
// });

// setTimeout(() => {
//     console.log('s2');
//     Promise.resolve().then(() => {
//         console.log('p3');
//     })
//     Promise.resolve().then(() => {
//         console.log('p4');
//     })
// });


// 2
/* 
    可以看出：在执行程序时，根据同步代码的顺序，将宏任务和微任务都放入对应的队列中。
    在执行宏任务之前。都先将已有的微任务队列清空
*/
setTimeout(() => {
    console.log('s1');
    Promise.resolve().then(() => {
        console.log('p2');
    })
    Promise.resolve().then(() => {
        console.log('p3');
    })
});

Promise.resolve().then(() => {
    console.log('p1');
    setTimeout(() => {
        console.log('s2');
    });
    setTimeout(() => {
        console.log('s3');
    });
})