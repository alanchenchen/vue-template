import vm from '@/main' //vue实例，可以调用所有vue实例和原型上的方法和属性
import Storage from '@/utils/Storage'

//处理所有接口公共状态逻辑的模块
export default {
    name: 'commonStatusHandle',
    autoExecute: true,
    //登陆超时
    loginFail(url) {
        console.log({
            title: '账号提示',
            desc: '您登陆已超时，请重新登陆'
        })
        Storage.clear() //清除storage
        vm.$router.push('/')
    },
    //授权过期
    unAuthorized(url) {
        console.log({
            title: '授权提示',
            desc: '您的许可证已过期，请重新授权认证'
        })
        Storage.clear() //清除storage
        vm.$router.push('/')
    }
}