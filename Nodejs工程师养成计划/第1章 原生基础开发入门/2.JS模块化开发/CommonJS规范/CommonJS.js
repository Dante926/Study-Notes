console.log(module);
/* 
    module中有一个exports空对象。就是用来赋值且暴露模块的
*/

// const val = 'this is commonjs'
// module.exports = val

/* const val = 'this is commonjs'
module.exports.val = val
const foo = 'foo'
module.exports.foo = foo */
// 上述的导出模式 = 
const val = 'this is commonjs'
const foo = 'foo'
exports.val = val
exports.foo = foo

/* 
    CS的导出方式：
    1. exports.xxx = xxx
    2. module.exports = xxx
*/