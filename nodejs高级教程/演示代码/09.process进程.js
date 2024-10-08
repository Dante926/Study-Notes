// // 一、process（ cpu 内存）

// // 1、内存使用情况
// // const fs = require('fs');// 引入模块查看内存使用情况
// // Buffer.alloc(1000) // 声明buffer(缓冲区)内存大小，查看内存使用情况
// // console.log(process.memoryUsage());// 返回内存使用情况
// /* 
//     rss:常驻内存
//     heapTotal:堆内存（刚开始之初申请的内存的大小）
//     heapUsed:堆内存使用情况（实际使用内存的大小）
//     external:扩展内存（该内存是专门存储c\c++核心模块所占据的内存空间大小的）
//     arrayBuffers:ArrayBuffer对象所占据的内存大小，不占据v8所占用的内存
// */


// // 2、cpu使用情况
// // console.log(process.cpuUsage());
// /* 
//     user:用户占用cpu的时间片段
//     system:操作系统占用cpu的时间片段
// */

// // 二、运行环境：（运行目录、node环境、cpu架构、用户环境、系统平台）
// console.log(process.cwd());// 返回当前运行目录（不包含当前脚本文件名）
// console.log(process.version);// 返回node版本
// console.log(process.versions);// 返回node版本(获取更多底层版本信息)
// console.log(process.arch);// 返回cpu架构
// // console.log(process.env);// 返回用户环境变量
// console.log(process.env.NODE_ENV);// 常用系统环境变量 一般返回development 或者 production 等关键字
// console.log(process.env.PATH);// 本机配置的系统环境变量
// // 以下方法可以轻易获得当前操作系统下所对应的管理员目录，如果想往里面存资源，在做路径操作
// console.log(process.env.USERPROFILE)// 计算机用户管理员目录(注意使用windows系统用USERPROFILE | 使用mac系统用HOME)
// console.log(process.platform);// 返回系统平台
// /* 
//     使用env的意义：
//     ①当我们使用webpack或者vue的时候，可能需要区分环境（生产环境or开发环境）的需求
// */

// // 三、运行状态：（启动参数、PID、运行时间）
// console.log(process.argv);
// /* 
//     参数1：node启动程序对应的一个完整路径
//     参数2：当前进程的绝对路径

//     我们在执行文件时传入的参数会变成参数3、参数4、参数N等...(以键值的方式存放，当我们想去使用的时候，直接对argv进行数组操作就行了)
// */
// console.log(process.argv0);// 快速获取argv数组里的参数1。argv0是一个快捷操作，argv1或者argv2都不能获取到argv数组里的值
// console.log(process.pid);// 返回当前进程的进程号 还有一个类似的操作叫做ppid，由于Nodejs业务逻辑暂时用不到所有不多做解释
// console.log(process.uptime());// 返回当前进程的运行时间
// setTimeout(() => {
//     console.log(process.uptime());// 返回当前进程的运行时间
// }, 1000);

// 四、事件
// process.on('exit',(code)=>{// 程序退出时执行回调
//     console.log('exit'+code);// code是退出的状态码，0为正常退出。其余状态码需要自行查阅
//     /* 
//         exit事件回调里面只能写同步代码，不能写异步代码
//         例如以下的定时代码
//     */
//     /* setTimeout(() => {
//         console.log('setTimeout');
//     }, 1000); */
// })

// process.on('beforeExit',(code)=>{ // 退出前的执行回调
//     console.log('beforeExit'+code);
//     /* 
//         beforeExit事件回调里面可以写异步代码,
//         例如以下定时器代码(但由于每当执行完定时器就将会退出程序，退出程序又会执行退出前(beforeExit)事件，就会导致死循环。一直不执行Exit事件)
//     */
//     setTimeout(() => {
//         console.log('setTimeout');
//     }, 1000);
// })
// console.log('代码执行完毕...');
// process.exit()// 手动退出程序(当执行log代码后，就直接退出程序。这不会触发退出前事件)
// console.log('1'); // 主动退出程序后，process.exit()后的代码将不会再被执行


// 五、标准输出 输入 错误
/* 
    主要目的是为了通过这两个操作的代码编写过程去感受流的操作和管道的操作
*/
// ①标准输出 | 输出流
// console.log = function (data) {// log函数重写
//     /* 
//         该log函数可以接收一个参数，将来可以在log里面输出的值
//     */
//     process.stdout.write('+++' + data+'\n')
//     /* 
//         stdout是标准输出，可以理解为输出流. 返回的是一个对象
//         既然是流那么就可以对流进行一些操作
//     */
// };
// console.log(11);
// console.log(22);
// std扩展
// const fs = require('fs');
// fs.createReadStream('09test.txt')// 创建一个可读流
//     .pipe(process.stdout)        // 经过一个管道，流给别人(流向下一个环节)
//                                  // 这个下个环节我们传递给stdout,sidout就会输出到终端面板上

// ②标准输入 | 输入流
process.stdin.pipe(process.stdout)// 使得我们可以在终端面板输入内容，回车后又直接输出到终端面板上
/* 
    stdin是标准输入，可以理解为输入流
    返回的也是一个流对象，流对象就可以使用流操作(.pipe(管道)等)

    一般用于脚手架的交互操作(脚本命令回复操作等...)
*/
// 监听输入流事件(知识扩展)
process.stdin.setEncoding('utf-8'); // 防止输入的数据乱码
process.stdin.on('readable',()=>{// 监听输入流事件
   // 定义一个变量
    let chunk = process.stdin.read();// 从标准输入中读取数据，再放进标准输出中做一个显示
    if(chunk !== null){
        process.stdout.write('data '+chunk)
    }
})

/* 
    总结：写这些并不是为了看stdin和sidout有什么用，而是为了看流操作是怎么样的
    或者说是为了看一下我们这种发布订阅模式的实现
*/