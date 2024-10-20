const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const videoSchema = new mongoose.Schema({
    title: {// 视频标题
        type: String,
        required: true
    },
    descrption: {// 视频描述
        type: String,
        // required: true
    },
    vodvideoId: {// 视频id
        type: String,
        required: true
    },
    user: {// 视频发布者
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'// 关联用户表
    },
    cover: {// 视频封面
        type: String,
        required: false
    },
    ...baseModel
})

module.exports = videoSchema