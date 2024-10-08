/* 
    需求：
    将'拉钩教育'写入指定的文件
    方法：
    1.一次性写入
    2.分批写入

    对比：

*/
const fs = require('fs');
let ws = fs.createWriteStream('./49test.txt',{
    highWaterMark: 2
})

// 1 一次性写入
// ws.write('拉勾教育')

// 2 分批写入
const source = '拉勾教育'.split('')
console.log(source);

let num = 0;
let flag = true;
function execut() {
    while (num !== 4 && flag) {
        flag = ws.write(source[num]);
        num++;
    }
}
execut();

ws.on('drain',()=>{
    console.log('drain 执行了');
    flag = true;
    execut();
})