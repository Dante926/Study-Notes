const mongoose = require('mongoose')

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/mytest')
}

connect().then((res) => {
    console.log('连接成功')
}).catch((err) => {
    console.log('连接失败')
})

// 建立操作mongoDB模型
const user = new mongoose.Schema({
    username: {
        type: String,// naem的类型
        required: true// 是否为必填
    },
    age: {
        type: Number,
        required: true
    }
})

// 使用模型
const UserModel = mongoose.model('User', user)// 集合名 对应模型名

// 调用模型
const u = new UserModel({
    username: 'Dante',
    age: 21
})
u.save().then(res => {
    console.log(res)
})