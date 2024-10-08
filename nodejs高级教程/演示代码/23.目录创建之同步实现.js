const fs = require('fs');
const path = require('path');
/* 
    01 将来调用时需要接收类似于 a/b/c 这样的路径,他们之间采用/进行连接  
    02 利用 / 分隔符将路径进行拆分，将每一项放入一个数组中进行管理['a','b','c']
    03 对上述数组进行遍历，我们需要拿到每一项，然后于前一项进行拼接
    04 判断一个当前对拼接之后的路径是否具有可操作的权限，如果有则证明存在，否则就需要进行创建
*/

function makeDirSync(dirPath) {
    let items = dirPath.split(path.sep);
    for (let i = 1; i <= items.length; i++) {
        // 循环遍历每个项目查看是否有权限(存在)
        let dir = items.slice(0, i).join(path.sep);
        try {
            fs.accessSync(dir)// 检测目录是否存在(文件夹)
        } catch (err) {
            fs.mkdirSync(dir);// 如果不存再则创建目录(文件夹)
        }
    }

}
makeDirSync('a\\b\\c')