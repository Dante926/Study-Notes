const Redis = require('ioredis');

const redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
    password: '123456',
});

redis.on('error', (err) => {
    console.error('Redis错误:', err);
});

redis.set('mykeysa', 'myvalue')
