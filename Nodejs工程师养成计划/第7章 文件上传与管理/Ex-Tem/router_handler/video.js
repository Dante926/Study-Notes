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

const { Video, Videocomment, Videolike, Subscribe } = require('../model/index');

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
    },

    videolist: async (req, res) => {
        let { pageNum = 1, pageSize = 10 } = req.body
        const videolist = await Video.find()
            .skip((pageNum - 1) * pageSize)
            .limit(pageSize)
            .sort({ createTime: -1 })
            .populate('user', '_id username cover')
        const videoCount = await Video.countDocuments()
        res.status(200).json({ videolist, videoCount })
    },

    video: async (req, res) => {// 获取视频详情信息
        const { videoId } = req.params
        console.log(typeof (videoId), ':', videoId);

        var videoinfo = await Video
            .findById(videoId)
            .populate('user', '_id username cover')

        videoinfo = videoinfo.toJSON()
        videoinfo.islike = false
        videoinfo.isdislike = false
        videoinfo.isSubscribe = false

        if (req.user.userinfo) {
            const userId = req.user.userinfo._id
            console.log(userId);
            if (await Videolike.findOne({ user: userId, video: videoId, like: 1 })) {
                videoinfo.islike = true
            }
            if (await Videolike.findOne({ user: userId, video: videoId, like: -1 })) {
                videoinfo.isdislike = true
            }
            if (await Subscribe.findOne({ user: userId, channel: videoinfo.user._id })) {
                videoinfo.isSubscribe = true
            }
        }
        res.status(200).json(videoinfo)
    },

    comment: async (req, res) => {
        const { videoId } = req.params
        const videoInfo = await Video.findById(videoId)
        if (!videoInfo) {
            return res.status(404).json({ err: '视频不存在' })
        }
        const content = await new Videocomment({
            video: videoId,
            content: req.body.content,
            user: req.user.userinfo._id
        }).save()
        videoInfo.commentCount++
        await videoInfo.save()
        res.status(201).json(content)
    },

    likevideo: async (req, res) => {
        let islike = true;
        const userId = req.user.userinfo._id;
        const videoId = req.params.videoId;

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ err: '视频不存在' });
        }

        let doc = await Videolike.findOne({ user: userId, video: videoId });
        if (doc && doc.like === 1) { // User has already liked
            islike = false;
            await doc.deleteOne(); // Use deleteOne instead of remove
        } else if (doc && doc.like === -1) {
            doc.like = 1;
            await doc.save();
        } else {
            await new Videolike({ user: userId, video: videoId, like: 1 }).save();
        }

        video.likeCount = await Videolike.countDocuments({ video: videoId, like: 1 });
        video.dislikeCount = await Videolike.countDocuments({ video: videoId, like: -1 });
        await video.save();

        res.status(200).json({
            ...video.toJSON(),
            islike,
        });
    },

    dislikevideo: async (req, res) => {
        let isdislike = true;
        const userId = req.user.userinfo._id;
        const videoId = req.params.videoId;

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ err: '视频不存在' });
        }

        let doc = await Videolike.findOne({ user: userId, video: videoId });
        if (doc && doc.like === -1) {
            await doc.deleteOne();
            isdislike = false;
        } else if (doc && doc.like === 1) {
            doc.like = -1;
            await doc.save();
        } else {
            await new Videolike({ user: userId, video: videoId, like: -1 }).save();
        }

        video.likeCount = await Videolike.countDocuments({ video: videoId, like: 1 });
        video.dislikeCount = await Videolike.countDocuments({ video: videoId, like: -1 });
        await video.save();

        res.status(200).json({
            ...video.toJSON(),
            isdislike,
        });
    },

    likelist: async (req, res) => {
        const { pageNum = 1, pageSize = 10 } = req.params
        var likelist = await Videolike
            .find({ user: req.user.userinfo._id, like: 1 })
            .skip((pageNum - 1) * pageSize)
            .limit(pageSize)
            .populate('video', '_id title vodvideoId user')
        res.status(200).json(likelist)
    },
}

module.exports = videoHandler;