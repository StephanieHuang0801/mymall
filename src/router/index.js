/*
 * @Author: your name
 * @Date: 2019-11-06 22:41:40
 * @LastEditTime: 2019-11-22 20:48:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Right from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'
Vue.use(Router)

export default new Router({
  routes: [
    { name: 'login',
      path: '/login',
      component: Login
    },
    { name: 'home',
      path: '/',
      component: Home,
      children: [
        {name: 'users',
          path: 'users',
          component: Users},
        { name: 'right',
          path: 'rights',
          component: Right
        },
        { name: 'role',
          path: 'roles',
          component: Role
        }
      ]
    }
  ]
})
