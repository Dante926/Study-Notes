// 虽然fs模块已经给出了copy文件的api，但是这对于大文件还是需要使用自己的实现
/* 
    步骤：
        ①打开b文件，利用read将数据保存到buffer中暂存起来
        ②打开a文件，利用write将buffer中的数据写入到b文件中
*/
const fs = require('fs');
let buf = Buffer.alloc(12);

// 1打开指定文件
// fs.open('b.txt', 'r', (err, rfd) => {
//     // 2从打开的文件中读取数据
//     fs.read(rfd, buf, 0, 12, 0, (err, readBytes, buffer) => {
//         // 3打开a文件，用于执行数据的写入操作
//         fs.open('a.txt', 'w', (err, wfd) => {
//             // 4将数据写入a文件中
//             fs.write(wfd, buf, 0, 12, 0, (err, written) => {
//                 console.log('写入成功');
//             })
//         })
//     })
// })

// 02 数据的完全拷贝 (更改结构)
// fs.open('b.txt', 'r', (err, rfd) => {
//     fs.open('a.txt', 'a+', (err, wfd) => {
//         fs.read(rfd, buf, 0, 12, 0, (err, readBytes, buffer) => {
//             fs.write(wfd, buf, 0, 12, 0, (err, written) => {
//                 fs.read(rfd, buf, 0, 9, 12, (err, readBytes, buffer) => {
//                     fs.write(wfd, buf, 0, 9, 12, (err, written) => {
//                         console.log('写入成功');
//                     })
//                 })
//             })
//         })
//     })
// })

// 03 使用封装的方法，多次调用函数解决回调地狱问题
/* 
    设计思路：
    ①首先我们的buffer大小是设定好的，所以我们想再调用函数中使用动态数据，就必须获取该buffer的长度
    ②当上一次读取完后，我们肯定要指定读取下一次的起始位置，所以要有偏移量
*/
// ①声明变量获取buffer的长度
const BUFFER_SIZE = buf.length
let READ_OFFSET = 0;

fs.open('b.txt', 'r', (err, rfd) => {  // 2从打开的文件中读取数据
    fs.open('a.txt', 'w', (err, wfd) => {
       function next (){
        fs.read(rfd,buf,0,BUFFER_SIZE,READ_OFFSET,(err,readBytes)=>{
            if(!readBytes){
                // 如果已经多不到内容则退出
                fs.close(rfd,()=>{})
                fs.close(wfd,()=>{})
                console.log('拷贝完成');
                console.log(READ_OFFSET);
                return;
            }
            READ_OFFSET += readBytes
            fs.write(wfd,buf,0,readBytes,(err,written)=>{
                next()
            })
        })
       }
       next()
    })
})