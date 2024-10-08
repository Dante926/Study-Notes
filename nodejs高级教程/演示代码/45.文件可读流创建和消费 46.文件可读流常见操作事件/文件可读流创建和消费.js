const fs = require('fs');

let rs = fs.createReadStream('./test.txt',{
    flages:'r',
    encoding:null,// 默认是buffer
    fd:null,// 默认是3
    mode:438,
    start:0,
    // end:3,
    highWaterMark:2// 每次读取数据(进入缓冲区)的默认大小
});

// 取出数据的两种方法
// 1 data
/* rs.on('data',(chunk)=>{
    console.log(chunk.toString());
    // 将流动模式转换成暂停模式的方法
    rs.pause();
    // 将暂停模式转换为流动模式的方法
    setTimeout(()=>{
        rs.resume()
    },1000) 
}) */

// 2 readable
/* rs.on('readable',()=>{
    // 使用readable的时候,想要读取数据,就必须使用read方法
    // let data = rs.read();
    // console.log(data);
    let data;
    while((data = rs.read(4)) !==null){// read()可以传入一次性读取字节的大小(从缓冲区中)
        console.log(data.toString())
        console.log(rs._readableState.length);// 查看每次缓冲区中的字节长度
    }
}) */

rs.on('open',(fd)=>{
    /* 
        这里要说明：
            并不是数据被消费了才会执行open操作，只要创建了可读流就会执行open操作
    */
    console.log(fd+'文件打开了');
})

rs.on('close',()=>{
    /* 
        文件不会自动关闭，只有当我们消费数据之后才会触发
    */
    console.log('文件关闭了');
})

rs.on('data',(chunk)=>{
    // 说明：这里读取的数据并不是连续的，所以我们想处理完整数据，需要使用end事件
    // console.log(chunk);
    // 将数据推入我们创建的容器中
    bufferArr.push(chunk);
})

const bufferArr=[];
rs.on('end',()=>{
    // 想要使用end事件处理数据，首先我们需要有一个存储数据的容器
    console.log('数据被清空完毕');
    // 我们可以使用Buffer.concat()方法将数据合并成一个buffer
    let buffer = Buffer.concat(bufferArr);
    console.log(buffer.toString());
})

rs.on('error',(err)=>{
    console.log('出错了');
})