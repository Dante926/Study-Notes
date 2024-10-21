const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const subscribeSchema = new mongoose.Schema({
    user: { // 关注的用户
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'
    },
    channel: { // 被关注的用户
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'
    },
    ...baseModel
})

module.exports = subscribeSchema