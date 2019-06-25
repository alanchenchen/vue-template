const chalk = require('chalk')
const ora = require('ora')
const inquirer = require('inquirer')
const { WorkFlow, shell, git } = require('@alanchenchen/gittask')

/**
 * @function 去除掉master,develop和origin/master远程分支选择，只让用户选择feature远程分支。
 */
const deleteOrigin = async () => {
    const filterBranch = ['master', 'develop', 'HEAD -> origin/master']
    const res = await shell(git.showBranch)
    const branchList = res.split('\n')
        .filter(a => {
           return  a.includes('remotes/origin')
        })
        .map(b => b.split('remotes/origin/')[1])
        .filter(c => {
            return !filterBranch.includes(c)
        })
    
        
    if(branchList.length > 0) {
        const { rmBranch } = await inquirer.prompt([
            {
                type: 'list',
                name: 'rmBranch',
                message: chalk.yellow('选择需要删除的远程仓库分支名：'),
                choices: branchList
            }
        ])

        const spinner = ora('删除远程仓库...')
        spinner.start()
        await shell(git.deleteOrigin, [`${rmBranch}`]) 
        spinner.succeed()
    }
    else {
        console.log(chalk.yellow('没有可以删除的远程分支, 4s后自动关闭当前命令窗口...'))
        setTimeout(() => process.exit(0), 4000)
    }
}

const task = [deleteOrigin]
WorkFlow.use(task)