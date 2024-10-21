// 个人信息更新处理函数
const { User, Subscribe } = require('../model/index')
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
    },

    subscribe: async (req, res) => {
        // 1.传入要关注的Id(不能关注自己)
        const userId = req.user.userinfo._id // 当前用户Id
        const channelId = req.params.userId // 要关注的id

        if (userId == channelId) {
            return res.status(403).json({ err: '不能关注自己' })
        }

        const record = await Subscribe.findOne({
            user: userId,
            channel: channelId
        })
        if (!record) {
            await new Subscribe({
                user: userId,
                channel: channelId
            }).save()

            const user = await User.findById(channelId)
            user.subscribeCount++
            await user.save()
            return res.status(200).json({ msg: '关注成功' })

        } else {
            res.status(401).json({ err: '已经订阅了此频道' })
        }
    },

    unsubscribe: async (req, res) => {
        try {
            const userId = req.user.userinfo._id;
            const channelId = req.params.userId;

            if (userId == channelId) {
                return res.status(403).json({ err: '不能取消关注自己' });
            }

            const record = await Subscribe.findOne({ user: userId, channel: channelId });

            if (record) {
                // 使用 deleteOne 方法删除记录
                await Subscribe.deleteOne({ user: userId, channel: channelId });

                const user = await User.findById(channelId);
                user.subscribeCount--;
                await user.save();

                return res.status(200).json({ msg: '取消关注' });
            } else {
                return res.status(403).json({ err: '没有订阅此频道' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ err: '操作失败,内部服务器错误' });
        }
    }
}

module.exports = userHandler 