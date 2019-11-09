<!--
 * @Author: your name
 * @Date: 2019-11-09 21:15:55
 * @LastEditTime: 2019-11-09 23:00:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\home\home.vue
 -->
 <template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img src="@/assets/logo.jpg" alt="logo无法显示" width="150px" height="60px">
        </el-col>
        <el-col :span="18">
          <h2 class="logo">后台管理系统</h2>
        </el-col>
        <el-col :span="2">
          <a href="#" class="logout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {}
</script>
<style>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}
.logo {
    text-align: center
}
.logout {
    line-height: 60px;
    text-decoration: none;
}
</style>
