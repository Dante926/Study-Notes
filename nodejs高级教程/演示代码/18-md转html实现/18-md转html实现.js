// 文件操作实现md转html
/* 
    NPM相关包：
        ①md->html语法格式包
        ②html展示包
*/
const fs = require('fs');
const path = require('path');
// const marked = require('marked');
const { marked } = require('marked');
const name = require('browser-sync');
const browserSync = require('browser-sync');
/* 
 ①读取 md 和 css 内容
 ②将上述读取内容替换占位符，生成最终展示的html字符串
 ③将html字符串写入到本地html文件
 ④监听md文档的内容变化，然后更新html文件
 ⑤使用browser-sync来实时显示html内容
*/
// console.log(__dirname);// 当前文件所在路径，不包含该文件名
let mdPath = path.join(__dirname, process.argv[2]);// 这个argv会默认有2个参数，第一个是node运行的路径，第二个是执行的文件路径，第三个是执行文件时传递的参数
let cssPath = path.resolve('github.css')
let htmlPath = mdPath.replace(path.extname(mdPath), '.html')
// console.log(mdPath);
// console.log(htmlPath);
fs.readFile(mdPath, 'utf-8', (err, data) => {
    // 将md->html
    let htmlStr = marked(data)
    fs.readFile(cssPath, 'utf-8', (err, data) => {
        let retHTML = temp.replace('{{content}}', htmlStr).replace('{{style}}', data)
        // 将上诉内容写入到指定html文件，用于预览
        fs.writeFile(htmlPath, retHTML, (err) => {
            console.log('写入成功');
        })
    })
})
/* 
    如果想达到浏览器实时更新，需要监听文件内容变化，然后重新写入html文件，再重新加载浏览器
*/

fs.watchFile(mdPath, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
        fs.readFile(mdPath, 'utf-8', (err, data) => {
            // 将md->html
            let htmlStr = marked(data)
            fs.readFile(cssPath, 'utf-8', (err, data) => {
                let retHTML = temp.replace('{{content}}', htmlStr).replace('{{style}}', data)
                // 将上诉内容写入到指定html文件，用于预览
                fs.writeFile(htmlPath, retHTML, (err) => {
                    console.log('写入成功');
                })
            })
        })
    }
})
browserSync.init({
    browser: '',// 使用那个浏览器？ ''表示默认浏览器
    server: __dirname,
    watch: true,// 开启监听
    index: path.basename(htmlPath)
})

const temp =
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        {{style}}
    </style>
</head>
<body>
    {{content}}
</body>
</html>`