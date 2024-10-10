#! /usr/bin/env node
// 项目入口文件
const { program } = require('commander'); // 引入命令行参数解析模块

// 引入help模块
const myhelp = require('../lib/core/help')
myhelp(program)// 注册模块

// 引入命令模块
const mycommander = require('../lib/core/mycommander')
mycommander(program)

program.parse(process.argv)
