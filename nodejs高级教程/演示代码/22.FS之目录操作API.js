const fs = require('fs')
// 1 access 判断文件是否(具有权限)存在
// fs.access('a.txt',(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('有操作权限');
//     }
// })

// 2 stat 获取目录及文件信息
// fs.stat('a.txt', (err, statsobj) => {
//     console.log(statsobj.size);// 文件大小
//     console.log(statsobj.isDirectory());// 判断是否为文件夹
//     console.log(statsobj.isFile());// 判断是否为文件
// })

// 3 mkdir 创建目录
// fs.mkdir('a/b/c', { recursive: true }, (err) => {
//     // 这里只会去创建c文件夹，如果相对路径中不存在__dirname/a/b。则不会创建c文件夹目录
//     // recursive:true 递归创建:如果给mkdir传入了参数2递归创建，则不会出现上面必须要有父级目录的问题。如果不存在父级目录则自动创建
//     if (!err) {
//         console.log('创建成功');
//     } else {
//         console.log(err);
//     }
// })

// 4 rmdir 删除目录
// fs.rmdir('a',{recursive:true}, (err) => {
//     // 这里只会去删除c文件夹，如果相对路径中不存在__dirname/a/b。则不会删除c文件夹目录
//     /* 
//         如果删除的文件夹下存在文件，则会警告不可删除。
//         如果想连同全部路径都删除干净，就使用递归参数
//     */
//     if (!err) {
//         console.log('删除成功');
//     } else {
//         console.log(err);
//     }
// })

// 5 readdir 读取目录
// fs.readdir('a', (err, files) => {
//     console.log(files);
// })

// 6 unlink 删除指定文件
// fs.unlink('a/a.txt',(err)=>{
//     if(!err){
//         console.log('删除成功');
//     }
// })