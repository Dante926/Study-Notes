const fs = require('fs')
const path = require('path')

// readFile
/* 
    在正常使用过程中，尽可能使用绝对路径
*/
// fs.readFile(path.resolve('data1.txt'), 'utf-8', (err, data) => {
//     // 在Nodejs中，使用回调函数，时参数总是错误优先
//     console.log(err);
//     // console.log(data);
//     if (!null) {
//         console.log(data);
//     }
// })

// writeFile
/* 
    ①调用writeFile方法，会覆盖掉原来的内容
    ②当路径文件不存时，会创建文件并写入内容
*/
// fs.writeFile('data.txt', 'node.js', {
//     // 参数3可以传递一个对象，用来设置写入文件的相关参数。这些参数用键值对表示
//     mode: 0x666,
//     flag: 'r+',// 使用r+是表示从原本内容的第一个字节开始覆盖，并不会覆盖全部内容
//     // flag: 'w+',// 使用w+表示覆盖全部内容(先清空再写入的操作)
//     encoding: 'utf-8'
// }, (err) => {
//     console.log(err);
//     if (!err) {
//         fs.readFile('data.txt', 'utf-8', (err, data) => {
//             console.log(err);
//             console.log(data);
//         })
//     }
// })

// appendFile
// fs.appendFile('data.txt', '追加内容', (err,data) => {
//     console.log(err);
// })

// copyFile
// fs.copyFile('data.txt', 'data2.txt', (err) => {
//     console.log(err);
//     if (!err) {
//         console.log('复制成功');
//     }
// })

// watchFile
fs.watchFile('data.txt',{
    interval: 20// 表示每20毫秒检查一次文件是否被修改
},(curr, prev) => {
    // console.log(curr);
    // console.log(prev);
    if (curr.mtime !== prev.mtime) {
        console.log('文件被修改了');
    }
    fs.unwatchFile('data.txt');// 取消监听
})