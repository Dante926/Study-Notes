#! /usr/bin/env node
const { program } = require('commander'); // 引入命令行参数解析模块

program.option('-f --framwork <framwork>', '设置脚手架')
program
.command('create <project> [other...]')
.alias('crt')
.description('创建项目')
.action((project, args) => {
    // 命令行执行逻辑代码
    console.log(project, args)
})
program.parse(process.argv)
