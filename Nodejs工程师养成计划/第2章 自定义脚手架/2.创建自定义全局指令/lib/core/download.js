const download = require('download-git-repo')
const config = require('../../config')
const ora = require('ora')
const chalk = require('chalk')

const downloadFun = function (url, project) {
    const spinner = ora().start()
    spinner.text = '下载中...'
    download('direct:' + url, project, { clone: true }, (err) => {
        /* 
            url 为git地址
            project 为下载到本地的文件夹名称
            console.log(err); 
        */
        if (err) {
            spinner.fail('下载失败 ' + err)
        } else {
            spinner.succeed('Success!')
            console.log(chalk.blue.bold('Done!'), chalk.bold('you run:'));
            console.log(chalk.red.bold('cd ') + project);
            console.log(chalk.green.bold('npm') + ' install');
            console.log(chalk.green.bold('npm') + ' run dev');
        }
    })
}

module.exports = downloadFun