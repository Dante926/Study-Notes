const mongoose = require('mongoose')

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/NoGrowPrpject')
}

connect().then((res) => {
    console.log('连接成功')
}).catch((err) => {
    console.log('连接失败')
})

module.exports = {
    User: mongoose.model('User', require('./userModel'))
}