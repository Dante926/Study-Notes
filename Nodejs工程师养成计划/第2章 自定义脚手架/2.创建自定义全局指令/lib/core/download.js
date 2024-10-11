const download = require('download-git-repo')
const config = require('../../config')
const ora = require('ora')

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
            spinner.fail('下载失败' + err)
        } else {
            spinner.succeed('Success!')
            console.log('Done! you run:');
            console.log('cd ' + project);
            console.log('npm install');
            console.log('npm run dev');
        }
    })
}

module.exports = downloadFun