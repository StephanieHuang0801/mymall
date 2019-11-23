<!--
 * @Author: your name
 * @Date: 2019-11-09 21:15:55
 * @LastEditTime: 2019-11-23 16:45:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\home\home.vue
 -->
 <template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img src="@/assets/logo.png" alt="logo无法显示" width="200px" height="60px" />
        </el-col>
        <el-col :span="18">
          <h2 class="logo">后台管理系统</h2>
        </el-col>
        <el-col :span="2">
          <el-button type="info" @click="signout">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 将侧边菜单栏改为动态的 -->
      <el-aside class="aside" width="200px">
        <el-col :span="24">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="teal"
            text-color="#fff"
            active-text-color="#ffff33"
            :unique-opened= true
            :router= true
          >
          <!-- 用户管理 -->
            <!-- <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="users">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </el-menu-item>
            </el-submenu> -->
           <el-submenu :index="item1.order.toString()" v-for="item1 in menus" :key="item1.id">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>{{item1.authName}}</span>
              </template>
              <el-menu-item :index="item2.path" v-for="item2 in item1.children" :key="item2.id">
                <i class="el-icon-menu"></i>
                <span>{{item2.authName}}</span>
              </el-menu-item>
            </el-submenu>
            <!-- <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-cooperation"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="role">
                <i class="el-icon-menu"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-menu-item index="right">
                <i class="el-icon-menu"></i>
                <span>权限列表</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="3-1">
                <i class="el-icon-menu"></i>
                <span>商品列表</span>
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-menu"></i>
                <span>分类参数</span>
              </el-menu-item>
              <el-menu-item index="3-3">
                <i class="el-icon-menu"></i>
                <span>商品分类</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="4-1">
                <i class="el-icon-menu"></i>
                <span>订单列表</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="-1">
                <i class="el-icon-menu"></i>
                <span>数据报表</span>
              </el-menu-item>
            </el-submenu> -->
          </el-menu>
        </el-col>
      </el-aside>
      <el-main class="main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      menus: []
    }
  },
  beforeCreate () {
    // const token = localStorage.getItem('token')
    // if (!token) {
    //   this.$router.push({name: 'login'})
    // }
  },
  created () {
    this.getMenus()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    signout () {
      localStorage.clear()
      this.$message.success('退出系统')
      this.$router.push({name: 'login'})
    },
    async getMenus () {
      // 左侧菜单权限 menus
      const res = await this.$http.get(`menus`)
      this.menus = res.data.data
      // console.log('menus', this.menus)
    }
  }
}
</script>
<style>
.container {
  height: 100%;
}
.header {
  background-color: #ffff33;
}
.aside {
  background-color: teal;
}
.main {
  background-color: #ef6653;
  height: 100%;
}
.logo {
  text-align: center;
}
.logout {
  line-height: 60px;
  text-decoration: none;
}
.el-menu {
    border-right: none;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
}
</style>
