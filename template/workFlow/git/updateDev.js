const { WorkFlow, git, shell } = require('@alanchenchen/gittask')
const ora = require('ora')

const showBranch = require('@alanchenchen/gittask/src/commands/showBranch')
const pullTargetBranch = require('./extension/pullTargetBranch')
const createFeatureBranch = require('./extension/createFeatureBranch')

/**
 * @function 将本地仓库与最新的远程仓库关联更新
 */
const updateToRemote = async () => {
    const spinner = ora('同步本地仓库到最新的远程仓库...')
    spinner.start()
    await shell(['fetch'])
    spinner.succeed()
}

/**
 * @function 不需要用户选择。直接切换到pull扩展传来的branch名称参数。
 * @param {*} branch 
 * @returns {String} branchName
 */
const checkTargetBranch = async (branch) => {
    await shell(git.checkoutBranch, [`${branch}`])
    return branch
}
 
const task = [updateToRemote, pullTargetBranch, showBranch, createFeatureBranch, checkTargetBranch]
WorkFlow.use(task)