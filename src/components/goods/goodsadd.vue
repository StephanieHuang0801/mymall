<!--
 * @Author: your name
 * @Date: 2019-11-23 16:41:12
 * @LastEditTime: 2019-11-23 17:55:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\goods\goodsadd.vue
 -->
<template>
<el-card style="height:600px;">
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
  <!-- 最外层要用form包裹 -->
  <!-- 参数名 参数说明 备注
  goods_name商品名称 不能为空
  goods_cat 以','分割的分类列表不能为空
  goods_price价格 不能为空
  goods_number数量 不能为空
  goods_weight重量 不能为空
  goods_introduce介绍 可以为空
  pics上传的图片临时路径（对象）可以为空
  attrs商品的参数（数组）可以为空 -->
  <el-form ref="form" :model="form" label-width="80px">
    <el-tabs tab-position="left" style="height: 400px;margin-top: 20px;"
    v-model="active">
      <el-tab-pane label="基本信息" name="1">
        <el-form-item label="商品名称">
          <el-input v-model="form.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="form. goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="form.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-input v-model="form.goods_cat"></el-input>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="2">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性" name="3">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片" name="4">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容" name="5">商品内容</el-tab-pane>
    </el-tabs>
  </el-form>
</el-card>
</template>
<script>
export default {
  data () {
    return {
      active: '1',
      //   商品表单数据
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: '',
        attrs: ''
      }
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
