// 读取文件
const fs = require('fs');
/* fs.readFile('test.txt', function (err, data) {
    console.log(err);
    console.log(data.toString());
}); */

// 写入文件
/* fs.writeFile('test.txt', 'hello node', function (err) {
    console.log(err);
});
 */
// 追加文件
fs.appendFile('test.txt', '慕课网', function (err) {
    console.log(err);
});
