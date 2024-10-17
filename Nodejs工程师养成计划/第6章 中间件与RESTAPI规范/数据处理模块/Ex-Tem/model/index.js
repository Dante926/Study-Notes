const mongoose = require('mongoose')

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/NoGrowProject')
}

connect().then((res) => {
    console.log('MongoDB连接成功')
}).catch((err) => {
    console.log('MongoDB连接失败:' + err)
})

module.exports = {
    User: mongoose.model('User', require('./userModel'))
}