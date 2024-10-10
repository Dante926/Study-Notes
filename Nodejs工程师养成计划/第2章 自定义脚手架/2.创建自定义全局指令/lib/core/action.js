const inquirer = require('inquirer')
const config = require('../../config')
// 用于封装command回调函数中的逻辑
const myAction = (project, args) => {
    // 命令行执行逻辑代码
    // console.log(project, args)
    inquirer.prompt([
        {
            type: 'list',
            name: 'framework',
            choices: config.framwork,
            message: '请选择你使用的框架'
        }
    ]).then(amwser => {
        console.log(amwser);
    })
}

module.exports = myAction