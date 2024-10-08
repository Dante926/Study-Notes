// console.log(global);
/* 
    ①这里不直接显示buffer和process是因为node版本对底层源码做了一些不可枚举的操作
    ②要是想查看所有信息，我们可以对他进行枚举的操作或者切换nodejs版本
*/

// console.log(__filename);// 返回完整路径
// console.log(__dirname);// 返回当前脚本所在目录(不包含当前文件名)

// console.log(this);
// console.log(this == global);
/* 
    ①默认情况下this是空对象，和global并不是一样的
*/

(function(){
    console.log(this == global);
})()
/* 
    ①只是一个很有意思的事，我们不能直接在js脚本中this == global，但在js脚本的括号下却是可以的
    ②这是因为，Nodejs环境下一个模块化的实现有关。
    // 在node平台下，js文件都是一个单独的模块。模块与模块之间都是独立的，独立一个空间的。
    // 我们可以认为当前的这个JS文件所有内容在执行的时候它的最外层都被包了一层这个叫做直调用的函数里
    // 当我们将来再去调用或者执行这个文件的时候，node在执行前会将几个固定的参数传到这个直调用函数里去(如require、__filename、__dirname、module、exports等) 
*/
