// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import '@/assets/css/reset.css'
import http from '@/plugins/http.js'

Vue.config.productionTip = false
// 使用vue插件
Vue.use(ElementUI)
Vue.use(http)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
