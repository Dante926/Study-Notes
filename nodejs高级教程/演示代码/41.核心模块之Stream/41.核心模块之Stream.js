// 41.核心模块之Stream
const fs = require('fs');

let rs = fs.createReadStream('./test.txt');
let ws = fs.createWriteStream('./test1.txt');// 如果不存在，就创建
// 假设我们通过可写流消费可读流操作
rs.pipe(ws)