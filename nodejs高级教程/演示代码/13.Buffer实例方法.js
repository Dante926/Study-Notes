// 1 fill
/* 
    含义：
        ①fill就是把我们当前给定的数据全都放进buffer里去，如果所给定的数据不能够填满当前buffer的长度则反复填充，填满为止
        ②如果fill长度超过buffer字节，则至多写满buffer长度的字节
*/
// const buf = Buffer.alloc(6)
// buf.fill('123')
// console.log(buf);
// console.log(buf.toString());

// const buf2 = Buffer.alloc(6)
// buf2.fill('123456789')
// console.log(buf2);
// console.log(buf2.toString());

// /* 
//    参数2：从buffer[参数2]下标开始填充
//    参数3：从buffer[参数3]下标开始不填充
//    这个切片原则遵循左闭右开的规则
// */
// const buf3 = Buffer.alloc(6)
// buf3.fill('123',1,3)
// console.log(buf3);
// console.log(buf3.toString());

// const buf4 = Buffer.alloc(6)
// buf4.fill(123)
// console.log(buf4);
// console.log(buf4.toString());

// 2 write
/* 
    write基本和fill一致，不同的是write不会因为写入数据不及buffer长度时重复填充
*/
// const buf5 = Buffer.alloc(6)
// buf5.write('123')
// console.log(buf5);
// console.log(buf5.toString());

// 3 toString
/* 
    toString(参数1：编码方式，参数2：开始下标，参数3：结束下标)
    这里的参数2和参数3是只显示参数2到参数3区间的内容
*/
// const buf6 = Buffer.from('hello world')
// console.log(buf6.toString('utf-8',1,5));// 默认utf-8

// 4 slice
// const buf7 = Buffer.from('hello world')
// console.log(buf7.slice(1,5));
// console.log(buf7.slice(1,5).toString());
// console.log(buf7.slice(-3));
// console.log(buf7.slice(-3).toString());

// 5 indexOf
// const buf8 = Buffer.from('lx爱前端，爱后端，爱教育，爱所有')
// console.log(buf8);
// console.log(buf8.indexOf('爱'));
// // 当我们知道第一个爱字是第几个字节后，我们可以给indexOf传递参数2，让它从第几个字节开始向后搜索（比如我们已经知道上一行代码返回的是2，则第一个'爱字在第3个字节'）
// console.log(buf8.indexOf('爱',3));// utf-8编码中一个汉字占3个字，一个英文占1个字节，一个中文符号占2个字节
// console.log(buf8.indexOf('爱jp'));// 如果内容不存在则返回-1

// 6 copy
const buf9 = Buffer.from('hello world')
const buf10 = Buffer.alloc(6)
// buf9.copy(buf10)// buf9是被拷贝的(拷贝源)，buf10是拷贝(拷贝容器)的
// console.log(buf9.toString());
// console.log(buf10.toString());
 
buf9.copy(buf10,1,3,7)// 参数1：从容器第几个位置开始写入 参数2:表示从拷贝源的第几个位置开始读取 参数3：表示从拷贝源的第几个位置结束读取
console.log(buf9.toString());
console.log(buf10.toString());
console.log(buf10);
