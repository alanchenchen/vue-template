// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//Vue的全局配置
Vue.config.productionTip = false

/* eslint-disable no-new */
//导出vue实例，然后在js模块里调用vue实例的方法和属性
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

