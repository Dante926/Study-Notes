let fs = require('fs');

let rs = fs.createReadStream('./test.txt', {
    highWaterMark: 4 // 一次读最多4字节
});

let ws = fs.createWriteStream('./test1.txt', {
    highWaterMark: 1 // 一次写最多1字节
});

let flag = true;
rs.on('data',(chunk)=>{
    flag = ws.write(chunk,()=>{
        console.log('写完了');
    })
    console.log(flag);
    if(!flag){
        rs.pause();
    }
})

ws.on('drain',()=>{
    // drain事件被触发说明缓冲区已经空了，可以继续写入数据了
    rs.resume();
})