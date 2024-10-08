// buffer静态方法(concat isBuffer)
let b1 = Buffer.from('拉钩')
let b2 = Buffer.from('教育')

// 1 concat 
/* 
    ①concat将两个buffer类型拼接成一个buffer
    ② 参数1:使用[]数组的形式囊括需要拼接的buffer 参数2:限制拼接后buffer的长度
*/
let b3 = Buffer.concat([b1, b2],9)
console.log(b3);
console.log(b3.toString())

// 2 isBuffer
b1 = '123'
console.log(Buffer.isBuffer(b1));