const fs = require('fs');
// read ：所谓的读操作就是将数据从磁盘文件中写入到buffer中
let buf = Buffer.alloc(12)// 创建一个12字节的buffer
// fs.open('09test.txt', 'r', (err, rfd) => {
//     console.log(rfd);// 012都已经被占用，打开成功rfd为3
//     fs.read(rfd, buf, 0, 12, 0, (err, readBytes, data) => {
//         /* 
//             参数1：读取某文件（于文件描述符决定）
//             参数2：目标buffer
//             参数3：buffer的起始位置
//             参数4：读取的字节数
//             参数5：从文件中的什么位置开始读取
//             回调函数：参数1：错误信息 参数2：读取的字节数 参数3：读取到的数据
//         */
//         console.log(readBytes);
//         console.log(data);
//         console.log(data.toString());
//     })

// })

// write：将缓冲区里的内容写入磁盘文件中(说写操作也是读操作是因为要先读出里面的内容才写进磁盘文件)
buf = Buffer.from('百色学院')// 创建一个有内容的buffer
fs.open('b.txt', 'w', (err, wfd) => {
    fs.write(wfd, buf, 0, 12, 0, (err, writeBytes, buffer) => {

        /* 
            参数1：写入的文件（于文件描述符决定）
            参数2：要写入的内容
            参数3：buffer的起始位置
            参数4：写入的字节数
            参数5：从文件中的什么位置开始写入（一般不去改不然会导致写不全或者乱码）
            回调函数：参数1：错误信息 参数2：写入的字节数 参数3：写入的内容
        */
        console.log(writeBytes);// 实际写入字节数   
        console.log(buffer);// 写入的内容
        console.log(buffer.toString());
        fs.close(wfd, (err) => {
            console.log('关闭成功');
        })
    })
})