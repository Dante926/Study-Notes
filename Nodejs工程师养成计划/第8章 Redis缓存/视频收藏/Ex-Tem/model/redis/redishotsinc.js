// 热度增长机制实现
const redis = require('./index');

const redishotsinc = {
    hotInc: async (videoId, incNum) => {
        // 查看有序列表中是否存在该视频
        var data = await redis.zscore('videohots', videoId)
        if (data) {// 如果有序列表中已经存在该键
            var inc = await redis.zincrby('videohots', incNum, videoId)// 让该键值的值加incNum
        } else {
            var inc = await redis.zadd('videohots', incNum, videoId)// 如果不存在，则添加该键并设置值对
        }
        return inc;
    },

}

module.exports = redishotsinc