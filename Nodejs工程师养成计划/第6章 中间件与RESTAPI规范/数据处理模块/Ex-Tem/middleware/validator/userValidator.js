const { body } = require('express-validator')// 表单验证器中间件
const validate = require('./errorBack') // 引入错误验证中间件
const { User } = require('../../model/index')
module.exports.register = validate([
    body('username')
        .notEmpty().withMessage('用户名不能为空').bail() // 这个bail() 是一个中间件，表示如果前面的验证不通过，则不会继续验证后面的验证规则
        .isLength({ min: 3 }).withMessage('用户名长度不能小于3位').bail(),
    body('email')
        .notEmpty().withMessage('邮箱不能为空').bail()
        .isEmail().withMessage('邮箱格式不正确').bail()
        .custom(async (email) => {
            // custom 是自定义验证
            const emailValidate = await User.findOne({ email })
            if (emailValidate) {
                return Promise.reject('邮箱已被注册')
            }
        }).bail(),
    body('phone')
        .notEmpty().withMessage('手机号不能为空').bail()
        .isLength({ min: 11 }).withMessage('手机号格式不正确').bail()
        .custom(async (phone) => {
            // custom 是自定义验证
            const phonelValidate = await User.findOne({ phone })
            if (phonelValidate) {
                return Promise.reject('手机号已被注册')
            }
        }).bail(),
    body('password')
        .notEmpty().withMessage('密码不能为空').bail()
        .isLength({ min: 6 }).withMessage('密码长度不能小于6').bail()
])

module.exports.login = validate([
    body('email')
        .notEmpty().withMessage('邮箱不能为空').bail()
        .isEmail().withMessage('邮箱格式不正确').bail()
        .custom(async (email) => {
            // custom 是自定义验证
            const emailValidate = await User.findOne({ email })
            if (!emailValidate) {
                return Promise.reject('邮箱未注册')
            }
        }).bail(),
    body('password')
        .notEmpty().withMessage('密码不能为空').bail()
]) 