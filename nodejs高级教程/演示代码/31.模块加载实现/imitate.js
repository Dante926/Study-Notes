const fs = require('fs');
const { Module } = require('module');
const path = require('path');
const vm = require('vm');

// 将模拟require中的所有操作都拆分成单独的函数
/* 
    myRequire中只负责调用即可
*/
function myModule(id) {
    this.id = id // 模块标识
    this.exports = {} // (将来导出的数据放在exports中)默认空对象,这也是为什么在一个文件中使用this.exports可以获取到模块中的内容(一般也默认为是一个空对象)
    console.log(111);
}

// Module函数的静态方法（获取绝对路径）
myModule._resolveFilename = function (filename) {
    // 利用Nodejs核心模块将filename转化为绝对路径
    let absPath = path.resolve(__dirname, filename)
    // 判断当前路径对应的内容是否存在(因为不确定他是一个文件或者是一个目录) 
    if (fs.existsSync(absPath)) {
        // 对应内容存在
        return absPath
    } else {
        // 文件定位
        /*  
            ①如果文件不存在,补足后缀名,继续查找(做一个主流程(文件获取)的内容)
        */
        const suffix = Object.keys(myModule._extensions)// 用于获取后缀名用来补全文件后缀名
        for (var i = 0; i < suffix.length; i++) {
            let newPath = absPath + suffix[i]
            if (fs.existsSync(newPath)) return newPath;
        }
        throw new Error(`${filename} is not exists`)// 如果上面的程序没有返回，就抛出异常(我们这里只设计处理两个后缀的存储函数.其他暂且不处理);
    }
}

// 存储后缀名函数
myModule._extensions = {
    '.js'(module) {
        // 要想将JS文件中的代码在当前模块中使用，则有以下步骤
        // 1 读取文件
        let content = fs.readFileSync(module.id, 'utf-8')
        // 2 (包装)因为我们Nodejs任意一个模块中都存在一些默认可以使用的全局变量或属性，如__dirname, __filename,module. 所以我们在这里读取到内容后再进行一层包装
        content = myModule.wrapper[0] + content + myModule.wrapper[1]
        // 3 VM 将其是现成可以使用的JS代码
        let compileFn = vm.runInThisContext(content)

        // 4 准备参数值
        let exports = module.exports // 这里的exports是空对象，这也是为什么直接再Nodejs任一模块下打印this是个空对象
        let dirname = path.dirname(module.id)
        let filename = module.id

        // 调用
        compileFn.call(exports, exports, myRequire, module, filename, dirname)
        // console.log(compileFn.toString());
    },
    '.json'(module) {
        let content = JSON.parse(fs.readFileSync(module.id,'utf-8'))
        module.exports = content
    },
}

// 包装内容函数
myModule.wrapper = [
    "(function(expotrs,require,module,__filename,__dirname){",
    "})"
]

// 缓存容器
myModule._cache = {

}

// 实现编译执行函数
myModule.prototype.load = function () {
    let extname = path.extname(this.id)
    myModule._extensions[extname](this)// 根据后缀名执行对应的键函数
}

// 模拟require
function myRequire(filename) {
    // 1 对路径进行处理 获取绝对路径
    let mPath = myModule._resolveFilename(filename)

    // 2 实现缓存优先
    let cacheModule = myModule._cache[mPath]
    if (cacheModule) return cacheModule.exports

    // 3 若不存在缓存，创建空对象加载目标模块
    let module = new myModule(mPath)

    // 4 缓存已加载的模块
    myModule._cache[mPath] = module

    // 5 编译执行
    module.load()

    // 返回数据
    return module.exports
}

let obj = myRequire('./test.json')
let obj2 = myRequire('./test.json')// 查看是否触发缓存优先
console.log(obj.age);
