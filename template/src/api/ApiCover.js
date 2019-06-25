/**
 * @author AlanChen
 * @module apiCover 二次封装api接口函数的模块，所有的状态处理都可以在这里完成
 * @param {String} url 请求路径的别名，与apiConfig模块一致
 * @param {Object} data 请求内容参数
 * @returns {Promise} then的参数为一个包含type和data的对象。type为returnCode中的一种
 * 
 * 1. 参数为一个对象，url和data与api模块相同
 * 2. then表示成功，return 一个对象,res包含data(返回数据)和type(自定义状态码描述)
 * 3. catch表示失败，return axios的失败状态对象
 * 4. 可以将所有通用的操作在获取返回状态后扩展,引入Plugin模块来处理所有操作http返回状态码的逻辑。
 * 5. Plugin插件模块必须包含name属性，
 *      success，fail、empty,error、loginFail和unAuthorized可选，回调函数默认一个参数，为请求的url别名
 *      networkFail可选，专门用来处理axios出错，回调函数默认两个个参数，第一个为请求url别名，第二个为axios的error对象
 *      autoExecute可选，布尔值，不传默认为false，true则表示一旦install，则自动执行函数
 */

import { api } from './index'
import Plugin from './ApiPlugin'

import CommonStatusHandle from './Plugins/CommonStatusHandle'
import Log from './Plugins/Log'
Plugin.install([CommonStatusHandle, Log])

//api接口模块(axios)返回的后台转态码，后台约定的code
const returnCode = {
    success: '0000', // 请求成功
    fail: '0001', // 请求失败
    empty: '0002', // 请求成功，但数据为空
    error: '0003', // 请求失败，因为参数出错
    loginFail: '0009', // 登陆超时
    unAuthorized: '0008' // license验证失败，未授权
}

export default ({url, data, dynamicRouterParams}) => {
    const p = new Plugin() //模块加载器实例
    const AutoExecutePlugins = p.data.filter(a => a.autoExecute == true) //自动执行的模块

    return new Promise((resolve, reject) => {
        api({
            url,
            data,
            dynamicRouterParams
        })
        .then(res => {          
            const type = Object.entries(returnCode).find(a => a[1] == res.data.code)
            //自动执行模块对应type的回调函数
            AutoExecutePlugins && AutoExecutePlugins.forEach(a => {
                a[type] && a[type](url)
            })
            
            const thenData  = {data: res.data, type}
            resolve(thenData)
        })
        .catch(err => {
            if (isShow) {
                //自动执行模块对应networkFail的回调函数
                AutoExecutePlugins && AutoExecutePlugins.forEach(a => {
                    a.networkFail && a.networkFail(url, err)
                })
            }
            reject(err)
        })
    })
}
