const inquirer = require('inquirer')
const config = require('../../config')
// const download = require('download-git-repo')
const downloadFun = require('./download')
// 用于封装command回调函数中的逻辑
const myAction = async (project, args) => {
    // 命令行执行逻辑代码
    // console.log(project, args)
    const anwser = await inquirer.prompt([
        {
            type: 'list',
            name: 'framwork',
            choices: config.framwork,
            message: '请选择你使用的框架'
        }
    ])
    // 下载代码模块
   downloadFun(config.framworkUrl[anwser.framwork], project)
}

module.exports = myAction