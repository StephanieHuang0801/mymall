<!--
 * @Author: your name
 * @Date: 2019-11-10 16:14:10
 * @LastEditTime: 2019-11-10 21:58:07
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
    :data="userlist"
    height="250"
    border
    style="width: 100%;margin-top: 15px">
    <el-table-column
      type="index"
      prop="id"
      label="序号"
      width="50">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="80">
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="角色">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
        <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
        <el-table-column
      prop="userlist"
      label="创建日期">
        <template slot-scope="userlist">
            {{userlist.row.create_time | fmtdate}}
        </template>
    </el-table-column>
        <el-table-column
      prop="userlist"
      label="用户状态">
            <template slot-scope="userlist">
<el-switch
  v-model="userlist.row.mg_state"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
</template>
    </el-table-column>
        <el-table-column
      prop="operation"
      label="操作">
      <template>
        <el-button type="primary" icon="el-icon-edit" size="small" circle></el-button>
        <el-button type="success" icon="el-icon-setting" size="small" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" size="small" circle></el-button>
      </template>
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
      userlist: [],
      total: -1,
      value: true
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
      const {data: {total, users}, meta: {msg, status}} = res.data
      if (status === 200) {
        this.userlist = users
        this.total = total
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>
<style>
.el-input {
  width: 400px;
}
</style>
