const fs = require('fs');
const path = require('path');

/* 
    ①自定义一个函数，接收一个路径，执行删除操作
    ②判断当前路径是否是文件，直接删除当前文件即可
    ③如果当前传入是目录，则继续读取目录中内容，然后再执行删除操作
    ④将删除行为定义成一个函数，然后通过递归的方式进行复用
    ⑤将当前的名称拼接成在删除时可使用的路径
*/
function myRmdir(dirPath, cb) {
    // 判断当前dirPath的类型
    fs.stat(dirPath, (err, statObj) => {
        if (statObj.isDirectory()) {
            // 目录 -> 继续读取
            fs.readdir(dirPath, (err, files) => {// 去读取层级
                console.log(files);
                // 将路径拼接成有效路径(这样才能删除)
                let dirs = files.map(item => {
                    return path.join(dirPath, item)
                })
                console.log(dirs);
                // 因为是实现递归，所以上面的拼接操作我门直接使用函数来完成
                let index = 0 //信号量：用于比对dirPath下还有无需要拼接的文件
                function next() {
                    if (index == dirs.length) return fs.rmdir(dirPath, cb)// 当所有dirPath下的文件都删除完了，就删除dirPath
                    let currentPath = dirs[index++]
                    myRmdir(currentPath, next)
                }
                next();//定义了所以要调用
            })
        } else {
            // 文件 -> 直接删除
            fs.unlink(dirPath, cb)
        }
    })
}

myRmdir('a', () => {
    console.log('删除完成');
})