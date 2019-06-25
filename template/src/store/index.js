import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutation'

// 自动导入module中store模块(通过webpack的require.context)，只会匹配module模块下首字母大写并以.js结尾的文件
const ctx = require.context('./module', true, /[A-Z][a-z]+\.js$/)

const modules = ctx.keys().map(path => {
    const fixedPath = path.substr(2)
    const key = fixedPath.split('.js')[0]
    const val = require('./module/' + fixedPath).default
    return {key, val}
}).reduce((total, item) => {
    return {...total, [item.key]: item.val}
}, {})

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    modules,
})