let {Duplex} = require('stream')
class MyDuplex extends Duplex{
    constructor(source){
        super()
        this.source = source
    }

    _read(){
        let data = this.source.shift() || null
        this.push(data)
    }

    _write(chunk,en,next){
        // console.log(chunk.toString())
        process.stdout.write(chunk)
        next()
    }
}

let source = ['a','b','c']
let myDuplex = new MyDuplex(source)

/* // 查看是否具有可读流功能
myDuplex.on('data',(data)=>{
    console.log(data.toString())
})
// 查看是否具有可写流功能
myDuplex.write('拉钩教育',()=>{
    console.log('写入完成');
}) */


// 转换流
let {Transform} = require('stream')

class MyTransform extends Transform{
    constructor(){
        super()
    }

    _transform(chunk,en,cb){// transform中的chunk是写入实例对象的数据
        this.push(chunk.toString().toUpperCase())// 将传入的数据转换为大写
        // 数据处理完毕后执行回调
        // cb(err,chunk)// 错误优先,并将原始数据传递给下一个流
        cb(null)
    }
}
let t = new MyTransform()
t.write('a')
t.on('data',(chunk)=>{
    console.log(chunk.toString())
})