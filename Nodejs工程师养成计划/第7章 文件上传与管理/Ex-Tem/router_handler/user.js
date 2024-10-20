// 个人信息更新处理函数
const { User } = require('../model/index')
const { createToken } = require('../util/jwt')
const fs = require('fs')

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
        res.send({
            msg: 'list'
        })
    },

    update: async (req, res) => {
        const { userinfo } = req.user
        const updateData = await User.findByIdAndUpdate(userinfo._id, req.body, { new: true })// {new:true}返回的是新数据
        res.status(202).json({ user: updateData })
    },

    headimg: async (req, res) => {
        try {
            const fileArr = req.file.originalname.split('.');
            const filetype = fileArr[fileArr.length - 1];

            // req.file.filename是上传之后自动生成的哈希值，用这个哈希值来做文件名
            await fs.rename(
                './public/headimgs/' + req.file.filename,
                './public/headimgs/' + req.file.filename + '.' + filetype,
                (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send({ msg: 'File rename failed' });
                    }
                    res.send({ filepath: req.file.filename + '.' + filetype });
                }
            );
        } catch (error) {
            res.status(500).send({ msg: 'An error occurred' });
        }
    }

}

module.exports = userHandler 