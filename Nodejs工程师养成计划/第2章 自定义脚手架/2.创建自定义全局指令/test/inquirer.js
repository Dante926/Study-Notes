import inquirer from 'inquirer';
inquirer.prompt([
    {
        type: 'input',
        name: 'username',
        message: '请输入你的用户名：',
    },
]).then(answers => {
    console.log(`你输入的用户名是：${answers.username}`);
});