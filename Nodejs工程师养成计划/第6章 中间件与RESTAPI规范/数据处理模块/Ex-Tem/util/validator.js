const { User } = require('../model/index')
const Validator = {
    // 已被注册
    already: async (field, value, error) => {
        const query = {};
        query[field] = value;  // 动态设置查询字段
        const selectValidate = await User.findOne(query);
        if (selectValidate) {// 找得到
            return Promise.reject(`${error}`)
        }
    },

    // 未被注册
    notyet: async (field, value, error) => {
        const query = {};
        query[field] = value;  // 动态设置查询字段
        const selectValidate = await User.findOne(query);
        if (!selectValidate) {// 找不到
            return Promise.reject(`${error}`)
        }
    }
};

module.exports = Validator;
