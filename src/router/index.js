/*
 * @Author: your name
 * @Date: 2019-11-06 22:41:40
 * @LastEditTime: 2019-11-25 21:09:27
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
import GoodsList from '@/components/goods/goodslist.vue'
import GoodsAdd from '@/components/goods/goodsadd.vue'
import Cateparams from '@/components/goods/cateparams.vue'
import { Message } from 'element-ui'
Vue.use(Router)

const router = new Router({
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
        },
        { name: 'goodslists',
          path: 'goods',
          component: GoodsList
        },
        { name: 'goodsadd',
          path: 'goodsadd',
          component: GoodsAdd
        },
        { name: 'categories',
          path: 'params',
          component: Cateparams
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // ...
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push({name: 'login'})
      Message.warning('请登录')
      return
    }
    next()
  }
})
export default router
