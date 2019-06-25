/**
 * @module versionUpdate
 * @description 版本号log自动化工具。和npm script集成在一起，dev会更新development时间，build会更新production时间，package.json中dependcies发生改变也会更新,最终输出一个json文件到dist的static目录
 * @author AlanChen
 */

const fs = require('fs')
const path = require('path')
const ROOTPATH = process.cwd()
const DateFormat = require('./DateFormat')

const ENV = process.argv[2]
const source = path.join(ROOTPATH, 'package.json')
const target = path.resolve(ROOTPATH, 'static/version.json')

const sourceFile = require(source)
const versionFile = require(target)

let timeUpdate = null
if(ENV.includes('dev')) {
    timeUpdate = {
        development: {
            lastDate: DateFormat('yyyy/MM/dd HH:mm:ss')
        }
    }
}
else if(ENV.includes('prod')) {
    timeUpdate = {
        production: {
            lastDate: DateFormat('yyyy/MM/dd HH:mm:ss')
        }
    }
}

let updateFile = {
    ...versionFile,
    ...timeUpdate,
    dependencies: sourceFile.dependencies
}

fs.writeFile(target, JSON.stringify(updateFile, null, 2), err => {
    if(err) console.log(err)
})