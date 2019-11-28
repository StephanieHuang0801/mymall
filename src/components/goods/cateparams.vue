<!--
 * @Author: your name
 * @Date: 2019-11-25 21:05:33
 * @LastEditTime: 2019-11-28 20:12:59
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
              <el-button type="danger" @click="dialogFormVisibleAddDynamicAttr = true">添加动态参数</el-button>
              <!-- :data="tableData"不用给表格绑定tableData这么麻烦，直接就是dynamicAttrs了 -->
              <el-table
               :data="dynamicAttrs"
               border
               style="width: 100%">
                 <!-- 展开展示参数tag -->
                 <el-table-column type="expand" prop="dynamicAttrs" >
                     <template slot-scope="scope">
                      <el-tag
                       :key="tag"
                       v-for="tag in scope.row.attr_vals"
                       closable
                       :disable-transitions="false"
                       @close="handleClose(scope.row,tag)">
                       {{tag}}
                      </el-tag>
                      <el-input
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm(scope.row)"
                      @blur="handleInputConfirm(scope.row)"
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
                      <el-button type="primary" icon="el-icon-edit" size="small" circle @click="showEditAttr(scope.row)"></el-button>
                      <!-- 删除参数按钮 -->
                      <el-button type="danger" icon="el-icon-delete" size="small" circle @click="delAttr(scope.row)"></el-button>
                    </template>
                 </el-table-column>
              </el-table>
           </el-tab-pane>
           <!-- 静态参数页面 -->
           <el-tab-pane label="静态参数" name="2">
              <el-button type="danger">添加静态参数</el-button>
           </el-tab-pane>
        </el-tabs>
      </el-form-item>
    </el-form>
        <!-- 修改动态参数弹框 -->
    <el-dialog title="修改动态参数" :visible.sync="dialogFormVisibleEditAttr">
        <el-form :model="editAttrs">
            <el-form-item label="动态参数" >
                <el-input v-model="editAttrs.attrname" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEditAttr = false">取 消</el-button>
            <el-button type="primary" @click="changeAttr">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 添加动态参数弹框 -->
    <el-dialog title="添加动态参数" :visible.sync="dialogFormVisibleAddDynamicAttr">
        <el-form>
            <el-form-item label="动态参数" >
                <el-input v-model="dynamicAttr" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAddDynamicAttr = false">取 消</el-button>
            <el-button type="primary" @click="addDynamicAttr">确 定</el-button>
        </div>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      value: [],
      options: [],
      active: '1',
      // tableData: [],
      dynamicTags: [],
      dialogFormVisibleEditAttr: false,
      dialogFormVisibleAddDynamicAttr: false,
      // 要添加的动态参数
      dynamicAttr: '',
      inputVisible: false,
      inputValue: '',
      dynamicAttrs: [],
      // 要编辑的参数
      editAttrs: {
        attrname: '',
        attrsel: '',
        attrid: ''
      },
      currentCatId: -1
    }
  },
  methods: {
    // 点击确认按钮，添加动态参数 categories/:id/attributes
    async addDynamicAttr () {
      let obj = {
        attr_name: this.dynamicAttr,
        attr_sel: 'many'
      }
      const res = await this.$http.post(`categories/${this.dynamicAttrs[0].cat_id}/attributes`, obj)
      this.dialogFormVisibleAddDynamicAttr = false
      this.handleChange()
      console.log('添加动态参数', res)
    },
    // 点击确认，修改参数应该是编辑提交参数
    async changeAttr () {
      let obj = {
        attr_name: this.editAttrs.attrname,
        attr_sel: this.editAttrs.attrsel
      }
      const res = await this.$http.put(`categories/${this.currentCatId}/attributes/${this.editAttrs.attrid}`, obj)
      this.dialogFormVisibleEditAttr = false
      this.handleChange()
      console.log('修改动态参数', res)
    },
    // 展示编辑参数的对话框
    showEditAttr (attr) {
      this.dialogFormVisibleEditAttr = true
      this.editAttrs.attrname = attr.attr_name
      this.editAttrs.attrsel = attr.attr_sel
      this.editAttrs.attrid = attr.attr_id
      // console.log('this.editAttrs.attrname', this.editAttrs.attrname)
      this.currentCatId = attr.cat_id
    },
    // 删除整行参数
    async delAttr (attr) {
    // 这里把整个分类都删了
      const res = await this.$http.delete(`categories/${attr.cat_id}/attributes/${attr.attr_id}`)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
      } else {
        this.$message.warning(res.data.meta.msg)
      }
      console.log('删除参数', res)
      this.handleChange()
    },
    tabsHandleClick () {},
    // 根据id查参数categories/:id/attributes/:attrId
    async getAttrs (a, b) {
      console.log('a', a)
      console.log('b', b)
    //   const res = await this.$http.get(`categories/:id/attributes/:attrId`)
    },
    // 点击tag删除参数 put categories/:id/attributes/:attrId
    async handleClose (attr, tag) {
      attr.attr_vals.splice(attr.attr_vals.indexOf(tag), 1)
      //   attr_name
      //   attr_sel[only,many]
      //   attr_vals
      // splice方法返回值是被删掉的那个
      let obj = {
        attr_name: attr.attr_name,
        attr_sel: attr.attr_sel,
        attr_vals: attr.attr_vals.join(',')
      }
      const res = await this.$http.put(`categories/${attr.cat_id}/attributes/${attr.attr_id}`, obj)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
      } else {
        this.$message.warning(res.data.meta.msg)
      }
      // console.log('删除参数', res)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 添加动态参数attrvals post categories/:id/attributes
    async handleInputConfirm (attr) {
      let inputValue = this.inputValue
      if (inputValue) {
        attr.attr_vals.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
      let obj = {
        attr_name: attr.attr_name,
        attr_sel: attr.attr_sel,
        attr_vals: attr.attr_vals.join(',')
      }
      const res = await this.$http.post(`categories/${attr.cat_id}/attributes`, obj)
      // console.log('添加参数', res)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
      } else {
        this.$message.warning(res.data.meta.msg)
      }
    },
    // 点击级联选择器，且选中一值时才发请求
    async handleChange () {
      if (this.value.length === 3) {
        if (this.active === '1') {
          const res = await this.$http.get(`categories/${this.value[2]}/attributes?sel=many`)
          this.dynamicAttrs = res.data.data
          console.log('dynamicAttrs', this.dynamicAttrs)
          // 不用这么麻烦
          //   var tmpArr = []
          this.dynamicAttrs.forEach((item) => {
          // 把attr_vals转为数组类型
            item.attr_vals = item.attr_vals.split(',')
          // tmpArr.push({
          //   attr_name: item.attr_name,
          //   id: item.attr_id
          })
          // ["一级", "二级", "三级"]
          // console.log('dynamicTags', this.dynamicTags)
          // })
          // this.tableData = tmpArr
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
    // 商品数据列表
    this.getCategories()
  }
}
</script>
<style>
.is-always-shadow,.el-alert,.el-cascader,.el-button--danger {
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
