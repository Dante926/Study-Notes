// 1 模块的导入导出
/* const age = 18;
const addFn = (x, y) => {
    return x + y;
}

module.exports = {
    age,
    addFn
}
 */

// 2 module
/* module.exports = 1111;
console.log(module); */

// 3 exports
/* 再次说明
    ① exports和module.exports指向同一个对象，所以修改exports，module.exports也会修改
    ② exports不能直接进行赋值操作
    ③exports是为了简化modules.exports的操作而诞生的
*/
// exports.name = '1'
/* exports = { // 这里可以看出，直接对exports直接赋值是不能在引入该模块的文件中拿到的
    naem:'1',
    age:18
} */

// 4 同步加载
/* let name = '1'
module.exports = name
let Time = new Date();
while(new Date() - Time < 2000){}
console.log('app.js被加载导入了'); */
/* 
    根据上诉程序执行后可以看出，CommonJS规范下的导入导出是同步。这非常不适用于浏览器平台
*/

// 5 require
console.log(require.main == module);

