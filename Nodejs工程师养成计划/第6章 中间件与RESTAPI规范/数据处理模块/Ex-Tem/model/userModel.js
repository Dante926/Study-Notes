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
        set: val => md5(val)// set可以设置一个函数，最后函数返回的结果就是当前对应字段为数据库存储的值
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
    Image: {
        type: String,
    },
    ...baseModel
})

module.exports = userSchema