import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes.config'
import vm from '@/main'
// import checkLoginAccess from '@/utils/CheckLoginAccess'
import Storage from '@/utils/Storage'

Vue.use(Router)

const router = new Router({
  routes
})

/* 拦截全局路由resolve钩子，强制用户登陆 */
router.beforeResolve((to, from, next) => {
  const toPath = to.path
  const loginPath = '/'
  const hasLogin = Boolean(Storage.get('userName'))
  
  if(hasLogin || toPath == loginPath) {
    next()
  }
  else {
    console.warn('请先登录')
    next(loginPath)
  }
})

export default router

/*
*@comment 一般会让后端从接口来判断登录时效验证
*   
*/
//全局监测每次路由离开,进行登录时效验证
// router.beforeEach((to, from, next) => {
//   const toPath = to.path
//   const fromPath = from.path
//   const trigger = (toPath!='/' && fromPath!='/')
  
//   if(trigger){ //只有在home的子路由跳转才检测
//     //设置登陆时效，过期就跳转login重新登陆
//     const activeDate = new Date(Storage.get('activeDate')) //上次活跃时间
//     const interval = 1000*60*30
//     //如果在interval有效期内未操作路由，则清空userInfo重新登录，否则重置活跃时间为当前时间对象
//     checkLoginAccess(activeDate,interval)
//         //未超时
//         .then( now => {
//           Storage.set('activeDate',now) //重置storage中的activeDate
//           console.warn(`活跃时间是：${activeDate.toLocaleTimeString()}，当前时间是：${now.toLocaleTimeString()}`)
//           //顺利跳转路由
//           next()
//         })
//         //超时
//         .catch( now => {
//             Storage.clear() //清除storage
//             vm.$Notice.info({
//                 title: '账号提示',
//                 desc: '您登陆已超时，请重新登陆'
//             })
//             //失败跳转到登录路由
//             next('/')
//             console.error(`活跃时间是：${activeDate.toLocaleTimeString()}，当前时间是：${now.toLocaleTimeString()},有效时间为:${interval/60000}分钟`)
//         })
//   }
//   else {
//     next()
//   }
// })