<!--
 * @Author: your name
 * @Date: 2019-11-23 16:41:12
 * @LastEditTime: 2019-11-23 20:52:05
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
          <!-- 这里需要一个级联选择器，版本更新，这是2.12.0版的 -->
          <!-- <el-input v-model="form.goods_cat"></el-input> -->
           <!-- <el-cascader
           v-model="form.value"
           :options="form.options"
           :props="{ expandTrigger: 'hover' }"
          > -->
           <el-cascader
           v-model="form.value"
           :options="form.options"
           :props="{
            expandTrigger: 'hover', label: 'cat_name',
            value: 'cat_id',
            children: 'children'}"
          >
          <!-- 旧版本的写法已经不能用了，remove了 -->
           <!-- <el-cascader
           props.expandTrigger="hover"
           :options="form.selectedOptions"
           v-model="form.value"
           :props="form.defaultProp"
           > -->
           </el-cascader>
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
      // 商品表单数据
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: '',
        attrs: '',
        // 级联选择器使用的数据
        value: [],
        options: []
        // 旧版本有的属性
        // options: [],
        // selectedOptions: [],
        // defaultProp: {
        //   label: 'cat_name',
        //   value: 'cat_id',
        //   children: 'children'
        // }
      }
    }
  },
  methods: {
    // tabs标签页样式改变方法,可以直接给el-tabs v-model="active"绑定active 可省略以下方法
    // handleClick (tab, event) {
    //   console.log(tab, event)
    //   this.active = parseInt(this.activeName)
    // }
    // 获取所有商品分类 categories type [1,2,3] 值：1，2，3 分别表示显示一层二层三层分类列表
    async getCategories () {
      const res = await this.$http.get(`categories?type=3`)
      this.form.options = res.data.data
      // console.log('form.options', this.form.options)
      // 原生js嵌套遍历
      // var myoptions = []
      // const catAll = res.data.data
      // catAll.forEach(item1 => {
      //   var tmpArr = []
      //   var tmpObj = {}
      //   tmpObj.value = item1.cat_id
      //   tmpObj.label = item1.cat_name
      //   if (item1.children) {
      //     item1.children.forEach(item2 => {
      //       var tmpObj2 = {}
      //       var tmpArr2 = []
      //       tmpObj2.value = item2.cat_id
      //       tmpObj2.label = item2.cat_name
      //       if (item2.children) {
      //         item2.children.forEach(item3 => {
      //           var tmpObj3 = {}
      //           tmpObj3.value = item3.cat_id
      //           tmpObj3.label = item3.cat_name
      //           tmpArr2.push(tmpObj3)
      //           // 思路：一直顺着写到最里面的叶子节点，形成了对象，放到数组里
      //         })
      //       }
      //       tmpObj2.children = tmpArr2
      //       // 赋值给父节点的children
      //       tmpArr.push(tmpObj2)
      //       // label，value2个属性早就准备好，现在children也好了，爷爷形成对象，放到数组里
      //     })
      //   }
      //   tmpObj.children = tmpArr
      //   // console.log('每一回遍历得到的', tmpObj)
      //   myoptions.push(tmpObj)
      // })
      // this.form.options = myoptions
    //   console.log('商品分类', res)
    //   console.log('options', this.form.options)
    }
  },
  created () {
    this.getCategories()
    // console.log('生效了吗')
  }
}
</script>
<style>
</style>
