//打印log的模块 
export default {
    name: 'Log',
    autoExecute: true,
    success(url) {
        console.warn(url+'接口请求成功！')
    },
    empty(url) {
        console.warn(url+'接口请求成功, 返回数据为空')
    },
    fail(url) {
        console.warn(url+'接口请求失败！')
    },
    networkFail(url, err) {
        // console.warn(err.response)
        console.warn(url + '接口出错，原因是'+err.message)
        // console.warn(err.config)
    }
}