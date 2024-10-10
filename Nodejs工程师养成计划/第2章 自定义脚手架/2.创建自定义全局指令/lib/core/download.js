const download = require('download-git-repo')
const config = require('../../config')
const downloadFun = function (url, project) {
    download('direct:' + url, project, { clone: true }, (err) => {
        // url 为git地址
        // project 为下载到本地的文件夹名称
        console.log(err);
    })
}

module.exports = downloadFun