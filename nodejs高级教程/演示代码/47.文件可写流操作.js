const fs = require('fs')
const ws = fs.createWriteStream('test.txt',{
    flags:'w',
    mode:438,
    encoding:'utf-8',
    start:0,
    highWaterMark:3// 默认16k，因为存在中文汉字。我们特意设置成3
})

/* 
    注意：
    ②我们可写流写入的数据类型是不受限制的，writeable里也有不同的模式。如果当前的模式是object那么它可以写入任何形式的数据。如果是字符串那么只能写入字符串或buffer
    ①我们使用write写入的数据可以是 字符串 or buffer，前提是继承自fs模块下的readable
    ③我们这里看的是一个文件的可写流，文件的可写流是对readable重新实现和继承。所以要求我们再传入数据的时候传入字符串或buffer
*/
/* ws.write('拉钩教育',()=>{
    console.log('写入完成');
})  */

ws.on('open',(fd)=>{
    console.log(fd);// 同可读流，并不是消费数据才会打开文件
})

ws.write('1')

// close是在数据写入操作全部完成之后才触发
ws.on('close',()=>{
    console.log('关闭了');
})

// end执行之后，意味数据写入操作完成
ws.end('百色学院')// 传递的参数会作为最后写入的数据

// ws.write('2')

ws.on('error',(err)=>{
    console.log(err+'出错了');
})