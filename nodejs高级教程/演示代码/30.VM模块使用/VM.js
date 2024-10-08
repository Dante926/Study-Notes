/* 
    目标:考虑怎么样去把读出来的字符串让它像JS一样运行起来
    require('text.txt')
*/
const { log } = require('console');
const fs = require('fs');
const path = require('path');
const vm = require('vm');// 内置核心模块

const context = fs.readFileSync('text.txt','utf-8')
console.log(context);
// 怎么能够使得context像JS代码一样运行起来呢?


// 1 eval
/* eval(context)
const age = 20;//但是当当前模块中也定义了一个和eval中变量名相同的变量.这个时候就不符合CommonJS规范加载.这时两个变量就会冲突
console.log(age); */

// 2 new Function
/* 
    虽然使用new Function()可以解决冲突的问题,但是我们还要考虑吧如何去处理这个函数.及其不便
    单个参数还方便解决,参数一多就会变得冗余
*/
/* const age = 20;
console.log(age);
let fn = new Function('age','return age+1')
console.log(fn(age)); */

// VM
/* 
    VM内置模块有3个API
    1. runInThisContext
    2. runInNewContext
    3. runInContext
*/
// const age = 20;
age = 30;
// vm.runInThisContext(context)// 在runInThisContext中定义的变量是不影响当前模块的变量的(内外部环境隔离).
vm.runInThisContext('age += 10')
/* 
    默认情况下,不能使用外部模块的变量.但如果存在全局变量,则可以使用.
 */
console.log(age);
