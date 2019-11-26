<!--
 * @Author: your name
 * @Date: 2019-11-25 21:05:33
 * @LastEditTime: 2019-11-26 21:31:37
 * @LastEditors: Please set LastEditors
 * @Description: 商品分类参数
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\goods\cateparams.vue
 -->
<template>
  <el-card style="height:620px; overflow: scroll;">
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="分类参数"></my-bread>
    <!-- alert提示 -->
    <el-alert
       title="只允许为第三级分类设置参数"
       type="error">
    </el-alert>
    <!-- el-form包裹级联选择器和tabs -->
    <el-form ref="form" label-width="80px" >
      <el-form-item label="商品名称">
        <el-cascader
        :show-all-levels="false"
        clearable
        v-model="value"
        :options="options"
        :props="{
         expandTrigger: 'hover', label: 'cat_name',
         value: 'cat_id',
         children: 'children'}"
         @change="handleChange"
        ></el-cascader>
        <el-tabs v-model="active" @tab-click="tabsHandleClick">
           <el-tab-pane label="动态参数" name="1">
              <el-table
               :data="tableData"
               border
               style="width: 100%">
                 <!-- 展开展示参数tag -->
                 <el-table-column type="expand" prop="tableData" >
                     <template>
                      <el-tag
                       :key="tag"
                       v-for="tag in dynamicTags"
                       closable
                       :disable-transitions="false"
                       @close="handleClose(tag)">
                       {{tag}}
                      </el-tag>
                      <el-input
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                      >
                      </el-input>
                      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                      </template>
               </el-table-column>
                 <el-table-column
                   type="index"
                   prop="id"
                   label="序号"
                   width="50">
                 </el-table-column>
                 <el-table-column
                   prop="attr_name"
                   label="参数名称"
                   width="600">
                 </el-table-column>
                 <el-table-column
                   prop="date"
                   label="操作"
                   >
                    <template slot-scope="scope">
                      <!-- 编辑参数按钮 -->
                      <el-button type="primary" icon="el-icon-edit" size="small" circle @click="dialogFormVisibleEditAttr = true"></el-button>
                      <!-- 删除参数按钮 -->
                      <el-button type="danger" icon="el-icon-delete" size="small" circle @click="delAttr(scope.row.id)"></el-button>
                    </template>
                 </el-table-column>
              </el-table>
           </el-tab-pane>
           <el-tab-pane label="静态参数" name="2">配置管理</el-tab-pane>
        </el-tabs>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      value: [],
      options: [],
      active: '1',
      tableData: [],
      dynamicTags: [],
      dialogFormVisibleEditAttr: false,
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    // 删除参数
    delAttr () {},
    tabsHandleClick () {},
    // 根据id查参数categories/:id/attributes/:attrId
    async getAttrs (a, b) {
      console.log('a', a)
      console.log('b', b)
    //   const res = await this.$http.get(`categories/:id/attributes/:attrId`)
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 点击级联选择器，且选中一值时才发请求
    async handleChange () {
      if (this.value.length === 3) {
        if (this.active === '1') {
          const res = await this.$http.get(`categories/${this.value[2]}/attributes?sel=many`)
          this.dynamicAttrs = res.data.data
          console.log('dynamicAttrs', this.dynamicAttrs)
          var tmpArr = []
          this.dynamicAttrs.forEach((item) => {
            tmpArr.push({
              attr_name: item.attr_name,
              id: item.attr_id
            })
            // dynamicTags: item.attr_vals.split(',')需要发请求
            // ["一级", "二级", "三级"]
            // console.log('dynamicTags', this.dynamicTags)
          })
          this.tableData = tmpArr
        } else if (this.active === '2') {
          const res1 = await this.$http.get(`categories/${this.value[2]}/attributes?sel=only`)
          this.staticAttrs = res1.data.data
          console.log('staticAttrs', this.staticAttrs)
        }
      }
    },
    async getCategories () {
      const res = await this.$http.get(`categories?type=3`)
      this.options = res.data.data
    }
  },
  created () {
    this.getCategories()
  }
}
</script>
<style>
.is-always-shadow,.el-alert,.el-cascader  {
    margin-bottom: 15px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
