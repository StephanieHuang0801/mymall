/*
 * @Author: your name
 * @Date: 2019-11-06 22:41:40
 * @LastEditTime: 2019-11-09 21:59:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    { name: 'login',
      path: '/login',
      component: Login
    },
    { name: 'home',
      path: '/',
      component: Home
    }
  ]
})
