// 1 导入演示
/* let obj = require('./app')
console.log(obj);
console.log(obj.addFn(1,2)); */

// 2 module
/* let obj = require('./app') */

// 3 exports
/* let obj = require('./app')
console.log(obj); */

// 4 同步加载
/* let obj = require('./app')
console.log('common.js代码执行了');
console.log(obj); */

// 5 require
console.log(require.main == module);// 这里的module永远指向当前自己这个文件
/* 
    根据module这个特性：所以当我们使用导入的方式console.log(require.main == module);时,module是被导入的那个模块文件。但require.main是当前文件。
*/
require('./app')