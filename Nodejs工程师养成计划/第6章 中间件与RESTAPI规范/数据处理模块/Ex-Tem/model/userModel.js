const mongoose = require('mongoose')
const md5 = require('../util/md5')
const baseModel = require('./baseModel')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: val => md5(val),// set可以设置一个函数，最后函数返回的结果就是当前对应字段为数据库存储的值
        select: false // select: false表示在查询的时候，该字段不会被返回
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    image: {//用户头像
        type: String,
    },
    cover: {// 频道封面
        type: String,
        default: null
    },
    channeldes: {// 频道描述
        type: String,
        default: null
    },
    ...baseModel
})

module.exports = userSchema