const { resolve } = require('path')
module.exports = {
    // 模板初始前询问是否使用vuex和@alanchenchen/gittask
    async beforeInit({
        print,
        fs,
        prompt,
        configs
    }) {
        const question = [
            {
                type: 'confirm',
                name: 'useStore',
                message: 'whether use vuex or not?',
                default: true,
                validate(confirm) {
                    if(confirm === undefined) {
                        return 'can not be null'
                    } 
                    else {
                        return true
                    }
                }
            },
            {
                type: 'confirm',
                name: 'useGittask',
                message: 'whether use git task workflow or not?',
                default: true,
                validate(confirm) {
                    if(confirm === undefined) {
                        return 'can not be null'
                    } 
                    else {
                        return true
                    }
                }
            }
        ]

        try {
            const STORE_FOLDER_PATH = resolve(configs.resourcePath, './template/src/store')
            const GIT_FOLDER_PATH = resolve(configs.resourcePath, './template/workFlow/git')
            const CMD_FOLDER_PATH = resolve(configs.resourcePath, './template/workFlow/cmd')
            const PACKGEJSON_PATH = resolve(configs.resourcePath, './template/package.json')
            let clone = require(PACKGEJSON_PATH)

            const { useStore, useGittask } = await prompt(question)
            if(useStore === false) {
                // 如果不使用vuex,则先删除src源码中store目录，然后删除package.json中vuex的依赖信息
                await fs.remove(STORE_FOLDER_PATH)
                delete clone.dependencies['vuex']
            }
            if(useGittask === false) {
                // 如果不使用gittask,则先删除src源码中workFlow/git和workFlow/cmd目录，然后删除package.json中@alanchenchen/gittask的依赖信息
                await fs.remove(GIT_FOLDER_PATH)
                await fs.remove(CMD_FOLDER_PATH)
                delete clone.dependencies['@alanchenchen/gittask']
            }

            await fs.outputFile(PACKGEJSON_PATH, JSON.stringify(clone, null, 2), 'utf-8')
        } catch (error) {
            print.error(error)
        }
    },
    afterInit({print}) {
        print.warn(
        `
        npm install or yarn 安装依赖
        npm start 启动开发环境并更新版本信息
        npm run build 打包代码并更新版本信息
        `
        )
    }
}