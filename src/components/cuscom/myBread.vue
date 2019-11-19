<!--
 * @Author: your name
 * @Date: 2019-11-15 22:24:03
 * @LastEditTime: 2019-11-15 22:33:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\cuscom\myBread.vue
 -->
<template>
  <el-card>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
    </el-breadcrumb>
  </el-card>
</template>
<script>
export default {
  props: ['level1', 'level2'],
  name: 'my-bread'
}
</script>
<style>
</style>
