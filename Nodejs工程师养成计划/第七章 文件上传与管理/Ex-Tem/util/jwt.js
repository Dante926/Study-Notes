const jwt = require('jsonwebtoken')
const { secret } = require('../config/confjg.default')// 私钥

module.exports = {
    createToken: async (userinfo) => {
        return await jwt.sign(
            { userinfo },
            secret,
            { expiresIn: '1h' }
        );
    },

    verifyToken: async (req, res, next) => {// 把其当作中间件去处理
        var token = req.headers.authorization;
        token = token ? token.split('Bearer ')[1] : null
        if (!token) {
            return res.status(402).json({ error: '请传入token' });
        }
        try {
            let userinfo = jwt.verify(token, secret)
            req.user = userinfo
            next();
        } catch (err) {
            res.status('402').json({ error: 'token失效' })
        }
    }
}
