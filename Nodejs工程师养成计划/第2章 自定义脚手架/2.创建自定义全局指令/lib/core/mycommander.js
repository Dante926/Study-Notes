const myAction = require('./action')
const mycommander = function (program) {
    program
        .command('create <project> [other...]')
        .alias('crt')
        .description('创建项目')
        .action(myAction)
}
module.exports = mycommander