// 自定义创建一个buffer的split方法
Buffer.prototype.split = function (sep) {
    let len = Buffer.from(sep).length;// 获取分割符的长度
    let ret = [];// 存放最终放回结果
    let start = 0;// 截取的起始位置
    let offset = 0;// 截取的结束位置
    while ((offset = this.indexOf(sep, start)) !== -1) {
        // offset = ... 意义为下一次的搜索的起始位置
        ret.push(this.slice(start, offset))// 截取后存储到ret中
        start = offset + len;// 移动到下一次搜索的位置
    }
    ret.push(this.slice(start))
    return ret;
}

let buf = Buffer.from('sjp吃馒头，吃面条，我吃所有');
let bufArr = buf.split('吃');
console.log(bufArr.toString());