const mongoose = require('mongoose')
const { mongopath } = require('../config/confjg.default')

async function connect() {
    await mongoose.connect(mongopath)
}

connect()
    .then((res) => {
        console.log('MongoDB连接成功')
    })
    .catch((err) => {
        console.log('MongoDB连接失败:' + err)
    })

module.exports = {
    User: mongoose.model('User', require('./userModel')),
    Video: mongoose.model('Video', require('./videoModel')),
    Subscribe: mongoose.model('Subscribe', require('./subscribeModel'))

}