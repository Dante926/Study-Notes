// 1 alloc
/* 
    尽量不要使用allocUnsafe这种不安全的方式
*/
/* const b1 = Buffer.alloc(10) // 这里的10的单位是字节，意味着我们想要创建一个10字节的buffer
console.log(b1)//提示的是十六进制数

const b2 = Buffer.allocUnsafe(10)// 创建一个不安全的buffer(其意义为：只要内存中存在空闲的空间就会被拿过来使用)
console.log(b2) */

// 2 from
/* 
    from参数有两种形式：
    1. 数据类型(包括数组、字符串、Buffer等)
    2. 编码集(在不传递编码集的情况下，默认为utf8)
    3.建议不要往里面放一些非数值的操作。在使用数值的时候使用习惯的十进制
*/
// const b1 = Buffer.from('1')// 这里会输出31是因为我们的1被编码转换成16进制
// const b2 = Buffer.from('中')// 中文占据3个字节
// console.log(b1)
// console.log(b2);
// const b3 = Buffer.from([1,2,3])
// const b4 = Buffer.from([1,2,'中'])// 当我们想在数组中存储字符串的时候，应该先将其转换为对应的十六进制的中文数字
// console.log(b3)
// console.log(b4);
// // 如下
// const b5 = Buffer.from('中')
// console.log(b5)
// console.log(b5.toString())// toString()对应的默认编码集也为utf8
// const b6 = Buffer.from([0xe4, 0xb8, 0xad])
// console.log(b6);
// console.log(b6.toString())

// buffer自己本身当作数据类型生成缓冲区
/* 
    从以下实验得出结论：
    ①我们采用from方式创建buffer的时候，并不是共享空间的而是对老空间长度的一个copy
*/
const b1 = Buffer.alloc(3)
const b2 = Buffer.from(b1)
console.log(b1);
console.log(b2);

b1[0] = 1;
console.log(b1);
console.log(b2);
