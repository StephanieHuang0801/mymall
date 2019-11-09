<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-11-07 20:41:27
 * @LastEditTime: 2019-11-09 22:19:02
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="login-wrap">
    <el-form label-position="top" label-width="80px" :model="formdata" class="login-form">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-row>
        <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      const res = await this.$http.post('login', this.formdata)
      const {
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        this.$router.push({ name: 'home' })
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>
<style>
.login-wrap {
  height: 100%;
  background-color: teal;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  background-color: #fff;
  border-radius: 5px;
  width: 400px;
  padding: 30px;
}
.login-wrap .login-btn {
  width: 100%;
}
</style>
