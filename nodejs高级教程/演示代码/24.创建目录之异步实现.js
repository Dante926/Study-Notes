const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// function mkDir(dirPath, cb) {// 这里的cb是回调函数，用于触发我们自定义的回调
//     let parts = dirPath.split('/');// 一般路径分隔符用path.sep代替，这里为了操作方便我们写死它
//     let index = 1;
//     function next() {
//         if (index > parts.length) return cb && cb();
//         let current = parts.slice(0, index++).join('/');
//         fs.access(current, err => {
//             if (err) {// 如果不存在操作权限(≈文件夹不存在)
//                 fs.mkdir(current, next);// 递归创建
//             } else {
//                 next();// 继续
//             }
//         })
//     }
//     next();
// }

// mkDir('a/b/c', () => {
//     console.log('创建完毕');
// })

/* 如果将上述内容变成异步的形式 */
/* 
    ①首先需要用到utils包，
    ②使用原生的异步方法去包装函数
*/
// 将access与mkdir处理成 async await 风格
const access = promisify(fs.access);
const mkdir = promisify(fs.mkdir);

async function myMkdir(dirPath, cb) {
    let parts = dirPath.split('/');
    for (let index = 1; index<= parts.length; index++){
        let current = parts.slice(0, index).join('/')
        try{
            await access(current)
        }catch(err){
            await mkdir(current)
        }
    }
    cb && cb();
}

myMkdir('a/b/c', () => {
    console.log('创建完毕');
})