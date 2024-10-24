const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const subscribeModel= new mongoose.Schema({
    user: { // 关注的用户
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'
    },
    channel: { // 被关注的用户
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'// 会去查询User集合
    },
    ...baseModel
})

module.exports = subscribeModel