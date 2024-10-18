// 个人信息更新处理函数
const { User } = require('../model/index')
const { createToken } = require('../util/jwt')

const userHandler = {
    register: async (req, res) => {
        console.log(req.body);
        const userModel = new User(req.body)
        const user = (await userModel.save()).toJSON()
        delete user.password // 因为model里只能剔除select的字段，这里使用的是save。所以不受model里规则的影响
        res.status(201).json({
            user
        })
    },

    login: async (req, res) => {
        try {
            const dbBack = await User.findOne(req.body);
            if (!dbBack) {
                return res.status(402).json({ error: '邮箱或密码错误' });
            }
            // 生成 token
            dbBack.token = await createToken(dbBack.toJSON());
            // 返回包含 token 的用户信息
            return res.status(200).json({ ...dbBack.toJSON(), token: dbBack.token });
        } catch (error) {
            // 处理潜在的错误
            return res.status(500).json({ error: '服务器错误' });
        }
    },

    list: async (req, res) => {
        const { userinfo } = req.user
        console.log(userinfo);
        res.send({
            msg: 'list'
        })
    },
}

module.exports = userHandler 