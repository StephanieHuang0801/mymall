<!--
 * @Author: your name
 * @Date: 2019-11-23 16:41:12
 * @LastEditTime: 2019-11-23 17:32:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\goods\goodsadd.vue
 -->
<template>
<el-card>
  <!-- 面包屑 -->
  <my-bread level1="商品管理" level2="商品列表"></my-bread>
  <!-- alert警告 提示 -->
   <el-alert
    title="添加商品信息"
    type="success"
    center
    show-icon
    style="margin-top: 20px">
  </el-alert>
  <!-- 步骤条 样式改变取决于属性active-->
  <el-steps :active="parseInt(active)-1" finish-status="success" simple style="margin-top: 20px">
    <el-step title="基本信息" ></el-step>
    <el-step title="商品参数" ></el-step>
    <el-step title="商品属性" ></el-step>
    <el-step title="商品图片" ></el-step>
    <el-step title="商品内容" ></el-step>
  </el-steps>
  <!-- 纵向tabs标签页 样式改变取决于属性name/activeName-->
    <el-tabs tab-position="left" style="height: 200px;margin-top: 20px;"
    v-model="active">
    <el-tab-pane label="基本信息" name="1">基本信息</el-tab-pane>
    <el-tab-pane label="商品参数" name="2">商品参数</el-tab-pane>
    <el-tab-pane label="商品属性" name="3">商品属性</el-tab-pane>
    <el-tab-pane label="商品图片" name="4">商品图片</el-tab-pane>
    <el-tab-pane label="商品内容" name="5">商品内容</el-tab-pane>
  </el-tabs>
</el-card>
</template>
<script>
export default {
  data () {
    return {
      active: '1'
    }
  },
  methods: {
    // tabs标签页样式改变方法,可以直接给el-tabs v-model="active"绑定active 可省略以下方法
    // handleClick (tab, event) {
    //   console.log(tab, event)
    //   this.active = parseInt(this.activeName)
    // }
  }
}
</script>
<style>
</style>
