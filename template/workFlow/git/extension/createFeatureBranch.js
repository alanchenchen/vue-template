const chalk = require('chalk')
const inquirer = require('inquirer')
const newBranch = require('@alanchenchen/gittask/src/commands/newBranch') 
const deleteBranch = require('@alanchenchen/gittask/src/commands/deleteBranch') 

module.exports = async () => {
    const { answer } = await inquirer.prompt([
        {
            type: 'list',
            name: 'answer',
            message: chalk.yellow('需要先删除本地已有分支再创建新分支吗？'),
            choices: [
                {name: '需要', short: '先删除旧分支', value: true},
                {name: '不需要', short: '直接新建分支', value: false}
            ]
        }
    ])
    
    if(answer) {
        await deleteBranch()
    }
    const branchName = await newBranch()
    return branchName
}