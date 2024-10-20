const RPCClient = require('@alicloud/pop-core').RPCClient;
require('dotenv').config();
// 初始化账号Client
const client = new RPCClient({
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
    endpoint: 'https://vod.cn-shanghai.aliyuncs.com', // 替换为你所在区域的 endpoint
    apiVersion: '2017-03-21' // VOD API 版本
});
// 获取上传凭证
async function getUploadVideoCredentials() {
    const action = 'CreateUploadVideo'; // VOD API 操作名称
    const params = {
        Title: '你的音视频标题',
        FileName: '你的文件名.mp4',
        Description: '音视频描述',
        Tags: '标签1,标签2' // 可选
    };

    try {
        return await client.request(action, params);
    } catch (error) {
        console.error('获取凭证失败:', error);
    }
}

const { Video } = require('../model/index');

const videoHandler = {
    credential: async (req, res) => {
        const result = await getUploadVideoCredentials();
        res.send(result);
    },

    createvideo: async (req, res) => {
        var body = req.body
        body.user = req.user.userinfo._id

        const videoModel = new Video(body)
        try {
            const dbback = await videoModel.save()
            res.status(201).json({ dbback })
        } catch (error) {
            res.status(500).json({ err: error })
        }
    }
}

module.exports = videoHandler;