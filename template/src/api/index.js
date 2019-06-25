/**
 * 1. 所有接口方法的模块，导出api方法和二次封装的apCover方法，所有方法都是return一个promise对象
 * 2. 预先配置baseURL，方便统一更改接口前缀
 * 3. 预先配置对应的接口别名和接口地址、接口方法、超时处理timeout和接口content-type
 * 4. method不传默认是post，timeout不传默认是30000ms,content-type不传默认是application/json
 * 5. 在组件中只需要调用api函数，传入两个参数，接口别名和data对象即可。方便维护接口地址改动，不需要更改每个组件
 * 6. 此处是返回axios静态方法，也可以预先全局配置baseURL和timeout，返回axios实例
 */

import { ApiModule } from 'api-module' 
import apiConfig from './config'
import globalConfig from './globalConfig'
import apiCover from './ApiCover'

/**
 * @function api 封装axios的方法
 * @param {String} type 接口别名，与apiConfig中一致
 * @param {Object} data 请求内容参数
 * @returns {Object} 返回数据，与原生axios一致
 */
const api = new ApiModule(globalConfig).createApi(apiConfig)
 
export {
    api,
    apiCover
}