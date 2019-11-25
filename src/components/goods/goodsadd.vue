<!--
 * @Author: your name
 * @Date: 2019-11-23 16:41:12
 * @LastEditTime: 2019-11-25 20:51:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\goods\goodsadd.vue
 -->
<template>
<el-card style="height:620px; overflow: scroll;">
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
    <el-tabs tab-position="left" style="height:500px;margin-top: 20px;margin-bottom: 30px; overflow: scroll;"
    v-model="active" @tab-click="handleClick" >
      <el-tab-pane label="基本信息" name="1">
        <el-form-item label="商品名称">
          <el-input v-model="form.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="form.goods_weight"></el-input>
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
          <!-- value是选择分类三个id组成的数组 -->
           <el-cascader
           clearable
           v-model="value"
           :options="options"
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
      <el-tab-pane label="商品参数" name="2">
        <!-- 商品参数 显示动态信息 checkbox多选框组 checkbox-group元素能把多个 checkbox 管理为一组，只需要在 Group 中使用v-model绑定Array类型的变量即可。-->
        <el-form-item v-for="item in dynamicAttrs" :label="item.attr_name" :key="item.attr_id" label-width="auto">
          <br>
          <el-checkbox-group v-model="item.attr_vals">
            <el-checkbox border v-for="(item1,index) in item.attr_vals" :key="index" :label="item1"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-tab-pane>
      <!-- 商品属性 获取静态参数 -->
      <el-tab-pane label="商品属性" name="3">
        <el-form-item v-for="item in staticAttrs" :label="item.attr_name" :key="item.attr_id" label-width="auto">
          <el-input v-model="item.attr_vals"></el-input>
        </el-form-item>
      </el-tab-pane>
      <!-- 上传图片 upload组件 -->
      <el-tab-pane label="商品图片" name="4">
        <el-form-item label-width="auto">
          <el-upload
            action="http://localhost:8888/api/private/v1/upload"
            :headers="header"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="5">
        <el-form-item label-width="auto">
          <el-button type="primary" size="small" @click="addGoods">添加商品</el-button>
          <!-- 富文本编辑器 vue-quill-editor -->
          <quill-editor v-model="form.goods_introduce"></quill-editor>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</el-card>
</template>
<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      active: '1',
      // 商品表单数据
      form: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        // 以 , 分割的字符串
        goods_cat: '',
        // 富文本编辑器绑定内容
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      // 级联选择器使用的数据
      value: [],
      // 三级分类选中时，value的形式是3个id组成的数组[70, 115, 131]
      options: [],
      // 旧版本有的属性
      // options: [],
      // selectedOptions: [],
      // defaultProp: {
      //   label: 'cat_name',
      //   value: 'cat_id',
      //   children: 'children'
      // }
      // 动态参数、静态参数
      dynamicAttrs: [],
      staticAttrs: [],
      // 上传图片前要设置头部（除了登录请求其他所有请求都要设置）
      header: {
        Authorization: localStorage.getItem('token')
      },
      fileList: []
    }
  },
  methods: {
    // 添加商品 post goods
    async addGoods () {
      this.form.goods_cat = this.value.join(',')
      let arr1 = this.dynamicAttrs.map((item) => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        }
      })
      let arr2 = this.staticAttrs.map((item) => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        }
      })
      this.form.attrs = arr1.concat(arr2)
      const res = await this.$http.post(`goods`, this.form)
      if (res.data.meta.status === 201) {
        this.$message.success(res.data.meta.msg)
        this.form = {}
      } else {
        this.$message.warning(res.data.meta.msg)
      }
      console.log('添加商品', res)
    },
    // 上传图片相关方法
    handlePreview (file) {},
    handleRemove (file) {
      console.log('删除图片的file', file)
      // file.response.data.tmp_path
      const index = this.form.pics.findIndex((item) => {
        return item.pic === file.response.data.tmp_path
      })
      this.form.pics.splice(index, 1)
      console.log('this.form.pics', this.form.pics)
    },
    handleSuccess (file) {
      // file.data.tmp_path是路径
      this.form.pics.push({
        pic: file.data.tmp_path
      })
      console.log('上传图片的file', file)
    },
    // 点击纵向标签页,点的是第二个tab同时三级分类要有值
    async handleClick () {
      if (this.active !== '1') {
        if (this.value.length !== 3) {
          this.$message.warning('请先选择三级分类')
        }
        // const dynamicArr = []
        // const staticArr = []
        if (this.active === '2') {
        // 参数列表:id分类 ID categories/:id/attributes sel[only,many]不能为空,通过 only或many来获取分类静态参数还是动态参数
          const res = await this.$http.get(`categories/${this.value[2]}/attributes?sel=many`)
          console.log('分类参数', res)
          this.dynamicAttrs = res.data.data

          this.dynamicAttrs.forEach((item) => {
            item.attr_vals = item.attr_vals ? item.attr_vals.trim().split(',') : []
            // dynamicArr.push({
            //   attr_id: item.attr_id,
            //   attr_value: item.attr_vals
            // })
          })
          // console.log('this.value', this.value)
          // [1, 3, 11]
          console.log('this.dynamicAttrs', this.dynamicAttrs)
        } else if (this.active === '3') {
          const res1 = await this.$http.get(`categories/${this.value[2]}/attributes?sel=only`)
          this.staticAttrs = res1.data.data
          // this.staticAttrs.forEach((item) => {
          //   staticArr.push({
          //     attr_id: item.attr_id,
          //     attr_value: item.attr_vals
          //   })
          // })
          console.log('this.staticAttrs', this.staticAttrs)
        }
        console.log('this.form.attrs', this.form.attrs)
      }
    },
    // tabs标签页样式改变方法,可以直接给el-tabs v-model="active"绑定active 可省略以下方法
    // handleClick (tab, event) {
    //   console.log(tab, event)
    //   this.active = parseInt(this.activeName)
    // }
    // 获取所有商品分类 categories type [1,2,3] 值：1，2，3 分别表示显示一层二层三层分类列表
    async getCategories () {
      const res = await this.$http.get(`categories?type=3`)
      this.options = res.data.data
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
.quill-editor {
  margin-top: 10px;
  height: 350px;
}
</style>
