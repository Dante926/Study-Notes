// 个人信息更新处理函数
const { User } = require('../model/index')

const userHandler = {
    register: async (req, res) => {
        console.log(req.body);
        const userModel = new User(req.body)
        const cb = (await userModel.save()).toJSON()
        delete cb.password
        res.status(201).json({
            cb
        })
    },

    login: async (req, res) => {
        const dbBack = await User.findOne(req.body)
        res.status(200).json(dbBack)
    },

    list: async (req, res) => {
        console.log('list');
        res.send({
            msg:'list'
        })
    },
}

module.exports = userHandler 