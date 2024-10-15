// 个人信息更新处理函数
const { User } = require('../model/index')

const userHandler = {
    register: async (req, res) => {
        console.log(req.body);
        const userModel = new User(req.body)
        const cb = await userModel.save()
        res.status(201).json(cb)
    },
}

module.exports = userHandler 