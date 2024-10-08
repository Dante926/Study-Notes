const obj = require('module')
const obj1 = require('./m')// 打断点后可以进入到require模块中查看源码执行过程
/* 
    使用require可以传入
        ①路径
        ②非路径(如果是非路径。则会把他当作核心或者第三方包)
*/
console.log(obj);
