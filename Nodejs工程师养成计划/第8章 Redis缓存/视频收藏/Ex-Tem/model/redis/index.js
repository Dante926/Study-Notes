const Redis = require('ioredis');
const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});
redis.on('error', (err) => {// 连接出现错误
    if (err) {
        console.log('redis连接失败', err)
        redis.quit();// 断开连接
    }
})

redis.on('ready', () => {// 连接成功
    console.log('redis连接成功')
})

module.exports = redis;