const MyTransform  = require('./myTransform');

let ts = new MyTransform();
let str1 = '拉钩教育'

// console.log(Buffer.from(str1));

// console.log(ts.encode(str1,1));

let encodeBuf = ts.encode(str1,1);

// let a = ts.decode(encodeBuf);

// console.log(a);

let len = ts.gtePackageLen(encodeBuf);
console.log(len);
