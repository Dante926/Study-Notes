const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const videocommentModel = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    video: {
        type: mongoose.ObjectId,
        ref: 'Video',
        required: true
    },
    ...baseModel
})

module.exports = videocommentModel