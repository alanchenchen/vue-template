const { WorkFlow, git, shell } = require('@alanchenchen/gittask')

const showBranch = require('@alanchenchen/gittask/src/commands/showBranch')
const addModifiedFile = require('@alanchenchen/gittask/src/commands/addModifiedFile') 
const commit = require('@alanchenchen/gittask/src/commands/commit') 
const push = require('@alanchenchen/gittask/src/commands/push') 

/**
 * @function 找出当前branch名
 * @returns {String} branchName
 */
const findCurrentBranch = async () => {
    const res = await shell(git.showBranch)
    const branchName = res.split('\n').find(a => a.startsWith('*')).slice(2)
    return branchName
}

const task = [showBranch, findCurrentBranch, addModifiedFile, commit, push]
WorkFlow.use(task)