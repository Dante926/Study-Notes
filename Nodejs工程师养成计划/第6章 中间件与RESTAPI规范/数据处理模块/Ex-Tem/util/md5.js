const crypto = require('crypto')

/* 
    md5加密：
    加密后的明文对应的密文都是一样的。
    不过我们可以在需要加密的数据前加上一个随机字符串
    ，这样加密后的密文被破解难度就大了。
*/
module.exports = str => {
    return crypto.createHash('md5')
        .update('Dante'+str)
        .digest('hex')
}