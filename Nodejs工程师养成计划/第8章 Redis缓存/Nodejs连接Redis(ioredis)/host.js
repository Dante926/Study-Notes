const Redis = require('ioredis');

const redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
    password: '123456',
});

var num = Math.round(Math.random() * 30 + 1)
var str = 'mystrmyvalueabcdefg'
var strtap = Math.round(Math.random() * 11 + 0)

async function test() {
    var data = await redis.zscore('myzset', str[strtap])// 检查键值对是否存在
    if (data) {// 键值对存在
        await redis.zincrby('myzset', 1, str[strtap])// 存在则加1
        console.log(str[strtap] + ' +1');
    } else {// 键值对不存在
        var write = await redis.zadd('myzset', num, str[strtap])// 给str[strtap]键添加num值
        console.log('写入', str[strtap] + ' ' + num);
    }

    var paixu = await redis.zrevrange('myzset', 0, -1, 'WITHSCORES')// 倒序排列
    var obj = {}
    for (let i = 0; i < paixu.length; i++) {
        if (i % 2 == 0) {
            obj[paixu[i]] = paixu[i + 1]
        }
    }
    console.log(obj);

}
test();
