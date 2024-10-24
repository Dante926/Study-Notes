const express = require('express')
const router = express.Router()
const videoHandler = require('../router_handler/video')
const { verifyToken } = require('../util/jwt')
const { videoValidator } = require('../middleware/validator/videoValidator')


router
    .get('/credentials', verifyToken(), videoHandler.credential)
    .post('/createvideos', verifyToken(), videoValidator, videoHandler.createvideo)
    .get('/videolists', verifyToken(), videoHandler.videolist)
    .get('/videos/:videoId', verifyToken(false), videoHandler.video)// 半登录态：我们希望它有两种状态，一种是登录状态一种是未登录状态。登录状态能获取到当前用户对该视频的评论、点赞、收藏等信息状态，未登录状态只能获取到视频的播放量、时长等状态。
    .get('/comments/:videoId', verifyToken(), videoHandler.comment)
    .get('/likevideos/:videoId', verifyToken(), videoHandler.likevideo)
    .get('/dislikevideos/:videoId', verifyToken(), videoHandler.dislikevideo)
    .get('/likelists', verifyToken(), videoHandler.likelist)
    .get('/collects/:videoId', verifyToken(), videoHandler.collect)

module.exports = router