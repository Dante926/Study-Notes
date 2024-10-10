#! /usr/bin/env node
const { program } = require('commander'); // 引入命令行参数解析模块

program.option('-f --framwork <framwork>', '设置脚手架')
/* 
    2.3 实现一个mycli creat xxx 创建一个项目的功能
*/

program.command('create <project> [other...]')
    .alias('crt')
    .description('创建项目')
    .action((project, args) => {
        // 命令行执行逻辑代码
        console.log(project, args)
    })
/* 
    .command 使用命令行参数解析模块解析命令行参数
    .alias 设置命令的别名
    .description 描述命令的功能
    .action 命令执行后的回调函数
*/

/* 
    2.4 逻辑代码模块化拆分
*/
program.parse(process.argv)
