// ES规范中
/* 
    ①一个文件就是一个模块
    ②模块中的变量是私有的，想要使用，必须通过export导出，再通过import导入
    ②ES中模块扩展名：.mjs
    ③也可以在package.json中配置 "type": "module"
    ④Node是默认不支持ES模块的/Node默认支持的是CommonJS模块
*/

// CommonJS规范
/* 
    ①一个文件就是一个模块
    ②模块中的变量是私有的，想要使用，必须通过export导出，再通过import导入
    ③每个模块中都有一个默认的module对象
*/

// 比如我们这里制作了一个功能
var val = 'ex data'
// export {val as value}
export default val// 默认导出一个内容