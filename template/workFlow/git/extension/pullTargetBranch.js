const chalk = require('chalk')
const inquirer = require('inquirer')
const { git, shell } = require('@alanchenchen/gittask')

module.exports = async () => {
    const res = await shell(git.showBranch)
    const branchList = res.split('\n').filter(a => a.includes('remotes/origin')).map(b => b.split('/')[2])

    const { nBranch } = await inquirer.prompt([
        {
            type: 'list',
            name: 'nBranch',
            message: chalk.yellow('选择需要拉取到本地更新的远程分支名：'),
            choices: branchList
        }
    ])
    
    if(Boolean(nBranch)) {
        await shell(git.checkoutBranch, [`${nBranch}`])
        await shell(['pull'])
        return nBranch
    }
    else {
        process.exit(1)
    }
    
}