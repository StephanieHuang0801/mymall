<!--
 * @Author: your name
 * @Date: 2019-11-15 21:53:30
 * @LastEditTime: 2019-11-19 20:13:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\rights\right.vue
 -->
<template>
  <el-card>
    <!-- 面包屑 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb> -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <!-- 将表格绑定的data关联我的数据rightList -->
  <el-table
    :data="rightList"
    border
      height="500"
    style="width: 100%">
    <el-table-column
      type="index"
      prop="id"
      label="序号"
      width="80">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="280">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径">
    </el-table-column>
        <el-table-column
      prop="level"
      label="权限等级">
      <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-if="scope.row.level === '1'">二级</span>
          <span v-if="scope.row.level === '2'">三级</span>
      </template>
    </el-table-column>
  </el-table>
  </el-card>
</template>
<script>
export default {
  created () {
    this.getRightsList()
  },
  data () {
    return {
      rightList: [],
      level: -1
    }
  },
  methods: {
    // rights/:type
    async getRightsList () {
      // const AUTH_TOKEN = localStorage.getItem('token')
      // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`rights/list`)
      // const res = await this.$http.get(`users/500`)
      console.log(res)
      this.rightList = res.data.data
      this.rightList.level = res.data.data.level
    }
  }
//   filters: {
//     'format': (level) => {
//       return level + '级别'
//     }
//   }
}
</script>
<style>
.el-table {
    margin-top: 15px;
    height: 500px;
}
</style>
