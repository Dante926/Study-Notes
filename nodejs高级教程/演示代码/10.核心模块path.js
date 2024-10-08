const path = require('path')
// 1 获取路径中的基础名称
/* 
    01 返回的就是接收路径当中的最后一部分
    02 第二个参数表示扩展名,如果没有设置第二个参数则返回完整的文件名并且带后缀
    03 第二个参数作为后缀时,如果没有在当前路径中被匹配到,则会忽略
    04 处理目录路径时,如果结尾处存在路径分隔符则忽略
*/
// console.log(path.basename(__filename));
// console.log(path.basename(__filename,'.js'));// 截取文件后缀前的文件名 如果存在该文件名则返回(且不会带上这里的后缀)
// console.log(path.basename(__filename,'.css'));// 因为这里没有css后缀的__filename的文件，所以直接把整个文件名返回
// console.log(path.basename('/a/b/c'));// 不管这个部分是一个文件或目录都会返回一个(基础名称)结果
// console.log(path.basename('/a/b/c/'));// 忽略结尾的分隔符
// console.log(__filename);

// 2 获取路径目录名(路径)
/* 
    01 获取文件所在目录
*/
// console.log(path.dirname(__filename));
// console.log(path.dirname('/a/b/c'));
// console.log(path.dirname('/a/b/c/'));

// 3 获取路径的扩展名
/* 
    01 返回 path 路径中相应文件的后缀名称
    02 如果 path 路径当中存在多个点,它匹配的是最后一个点,到结尾的内容
*/
// console.log(path.extname(__filename));
// console.log(path.extname('/a/b/c'));// 若不存在后缀名文件,则返回空
// console.log(path.extname('/a/b/index.html.js.css'));
// console.log(path.extname('/a/b/index.html.js.css.'));// 拿到最后一个.

// 4 解析路径
/* 
    root 根路径名
    dir  除自己的文件名外的目录路径名
    ext  文件扩展(后缀)名
    base 路径文件名
    01 接收一个路径返回一个对象,包含不同信息

*/
// const obj = path.parse('/a/b/c/index.html')
// const obj = path.parse('/a/b/c')
// const obj = path.parse('./a/b/c')
// const obj = path.parse('./a/b/c/')
// console.log(obj);
// console.log(obj.name);

// 5 序列化路径
// const obj = path.parse("./a/b/c/")
// console.log(path.format(obj));


// 6 判断当前路径是否为绝对路径
// console.log(path.isAbsolute('a'));
// console.log(path.isAbsolute('/a'));
// console.log(path.isAbsolute('//a'));
// console.log(path.isAbsolute('./a'));
// console.log(path.isAbsolute('../a'));
// console.log(path.isAbsolute(''));
// console.log(path.isAbsolute('.'));

// 7 拼接路径
// console.log(path.join('a/b', 'c','index.html'));
// console.log(path.join('/a/b', 'c','index.html',''));
// console.log(path.join('/a/b', 'c','../','index.html'));
// console.log(path.join('/a/b', 'c','./','index.html'));// ../是上级目录 ./是同级目录
// console.log(path.join('/a/b', 'c','','index.html'));
// console.log(path.join(''));// 忽略空 显示 . 表示当前目录

// 8 规范化路径
/* 
    意义：
        通常有些路径是通过我们字符串去拼接或者自动生成的，
        但是可能存在一些不合法的路径，
        通过规范化路径可以解决这个问题
*/
// console.log(path.normalize('a/b/c/'));
// console.log(path.normalize('a///b/c/../d'));
// console.log(path.normalize('a//\\/b/c../d'));
// console.log(path.normalize('a//\b/c../d/'));// 字符\本身代表转义功能，如果说\后门跟着特殊的转义字符则会被转义而被规范化函数忽略
// console.log(path.normalize(''));// 同join拼接字符一样将其转化为.

// 9 返回绝对路径
/* 
    reslove([from],to)
    ①当我们不对参数进行任何处理时，全部参数都为to
    ②当参数中带有绝对路径时(无论顺序先后)，带有 / 的路径会和它之后参数进行拼接，而忽略其他参数

*/
console.log(path.resolve(''));
console.log(path.resolve('a','b'));
console.log(path.resolve('a','/b'));
console.log(path.resolve('/a','/b'));
console.log(path.resolve('/a','b'));
console.log(path.resolve('/a','../b'));