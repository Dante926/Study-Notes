const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const collectModel = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    video: {
        type: mongoose.ObjectId,
        ref: 'Video'
    },
    ...baseModel
})

module.exports = collectModel