<!--
 * @Author: your name
 * @Date: 2019-11-23 16:41:12
 * @LastEditTime: 2019-11-23 17:05:00
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
    show-icon>
  </el-alert>
  <!-- 步骤条 -->
  <el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
    <el-step title="基本信息" ></el-step>
    <el-step title="商品参数" ></el-step>
    <el-step title="商品属性" ></el-step>
    <el-step title="商品图片" ></el-step>
    <el-step title="商品内容" ></el-step>
  </el-steps>
</el-card>
</template>
<script>
export default {
}
</script>
<style>
</style>
