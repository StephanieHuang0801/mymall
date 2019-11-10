<!--
 * @Author: your name
 * @Date: 2019-11-10 16:14:10
 * @LastEditTime: 2019-11-10 18:32:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\users\users.vue
 -->
<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
        <el-button type="success">添加用户</el-button>
    </div>
      <el-table
    :data="tableData"
    height="250"
    border
    style="width: 100%;margin-top: 15px">
    <el-table-column
      type="index"
      label="序号"
      width="50">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
        <el-table-column
      prop="telphone"
      label="电话">
    </el-table-column>
        <el-table-column
      prop="ctime"
      label="创建日期">
    </el-table-column>
        <el-table-column
      prop="status"
      label="用户状态">
    </el-table-column>
        <el-table-column
      prop="operation"
      label="操作">
    </el-table-column>
  </el-table>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 10,
      tableData: [{
        name: '',
        email: '',
        telephone: '',
        ctime: '',
        status: '',
        operation: ''
      }]
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log(res)
    }
  }
}
</script>
<style>
.el-input {
  width: 400px;
}
</style>
