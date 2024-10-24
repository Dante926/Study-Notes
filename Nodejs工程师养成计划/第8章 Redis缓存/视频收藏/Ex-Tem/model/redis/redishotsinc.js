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

    topHots: async (num) => {// 获取热度前num的视频
        var sort = await redis.zrevrange('videohots', 0, - 1, 'WITHSCORES')
        var sortArr = sort.slice(0, num * 2)
        var obj = {}
        for (let i = 0; i < sortArr.length; i++) {
            if (i % 2 == 0) {
                obj[sortArr[i]] = sortArr[i + 1]
            }
        }
        return obj;
    }

}

module.exports = redishotsinc