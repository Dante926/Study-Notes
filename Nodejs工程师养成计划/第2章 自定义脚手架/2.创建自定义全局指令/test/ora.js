const ora = require('ora')
const spinner = ora().start()
spinner.text = 'loading...'
setTimeout(() => {
    /*   spinner.succeed('成功')
      spinner.fail('失败')
      spinner.info('结束') */
}, 2000)