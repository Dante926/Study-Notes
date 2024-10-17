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
        console.log(req.headers);
        var token = req.headers.authorization;
        console.log(token);
        token = token ? token.split('Bearer ')[1] : null
        if (!token) {
            return res.status(402).json({ error: '请传入token' });
        }
        try {
            let userinfo = jwt.verify(token, secret)
            console.log(userinfo);
            next();
        } catch (err) {
            res.status('402').json({ error: 'token失效' })
        }
    }
}
