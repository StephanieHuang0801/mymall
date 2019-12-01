<!--
 * @Author: your name
 * @Date: 2019-11-28 20:37:01
 * @LastEditTime: 2019-12-01 15:36:06
 * @LastEditors: Please set LastEditors
 * @Description: 商品管理-商品分类
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\goods\goodscate.vue
 -->
<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <!-- 添加分类按钮 -->
    <el-button type="primary" @click="dialogFormVisibleAddCate=true;getCategories()">添加分类</el-button>
    <!-- 分类信息表格，展示所有一级分类 -->
     <el-table
    :data="options"
    border
    style="width: 100%">
      <!-- <el-table-column
        type="index"
        prop="cat_id"
        label="序号"
        width="80">
      </el-table-column> -->
      <!-- 原先的分类名称就注释掉了，用树形结构渲染 -->
      <!-- <el-table-column
        prop="cat_name"
        label="分类名称"
        width="300"> </el-table-column> -->
        <!-- 这里是一个树形结构 -->
        <!-- 特有属性：
        treeKey -> nodekey是节点唯一标识
        parentKey父节点的id
        levelKey当前节点的级别
        childKey子节点 -->
      <el-tree-grid
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        childKey="children"
        prop="cat_name"
        label="分类名称"
        width="350"
      ></el-tree-grid>
      <el-table-column
        prop="cat_deleted"
        label="是否有效">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_deleted===false">有效</span>
          <span v-if="scope.row.cat_deleted===true">无效</span>
        </template>
      </el-table-column>
      <!-- 这里不绑定prop="cat_level" -->
      <!-- 根据级别判断渲染中文 -->
      <el-table-column label="级别">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level===0">一级</span>
          <span v-if="scope.row.cat_level===1">二级</span>
          <span v-if="scope.row.cat_level===2">三级</span>
        </template>
      </el-table-column>
       <el-table-column
        label="操作"
        >
        <!-- slot-scope="scope" -->
          <template slot-scope="scope">
            <!-- 编辑参数按钮 @click="showEditAttr(scope.row)"-->
            <el-button type="primary" icon="el-icon-edit" size="small" circle @click="showEditCate(scope.row)"></el-button>
            <!-- 删除参数按钮 @click="delAttr(scope.row)"-->
            <el-button type="danger" icon="el-icon-delete" size="small" circle  @click="delCate(scope.row)"></el-button>
          </template>
        </el-table-column>
    </el-table>
    <!-- 添加分类弹框 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisibleAddCate">
        <!-- :model="editAttrs" -->
        <el-form>
            <el-form-item label="分类名称" >
                <el-input v-model="cate" autocomplete="off" class="cateinput"></el-input>
            </el-form-item>
            <!-- 展示级联选择器 -->
            <!-- :show-all-levels="false"这里不要仅显示最后一级-->
            <el-form-item label="父级分类" >
              <el-cascader
              clearable
              v-model="value"
              :options="option"
              :props="{
              expandTrigger: 'hover', label: 'cat_name',
              value: 'cat_id',
              children: 'children',
              checkStrictly: true}"
              @change="handleChange"
              ></el-cascader>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAddCate = false; this.value = [];this.cate = '';">取 消</el-button>
            <el-button type="primary" @click="addGoodsCate">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 编辑分类弹框 -->
    <el-dialog title="编辑分类" :visible.sync="dialogFormVisibleEditCate">
      <el-form>
          <el-form-item label="分类名称" >
              <el-input v-model="editCate" autocomplete="off"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEditCate = false">取 消</el-button>
          <el-button type="primary" @click="changeCate">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
// 引入tree-grid
var ElTreeGrid = require('element-tree-grid')
export default {
  // 局部注册 组件名<el-tree-grid>
  components: {
    ElTreeGrid
  },
  data () {
    return {
      // 添加分类弹框显示
      dialogFormVisibleAddCate: false,
      // 编辑分类的弹框显示
      dialogFormVisibleEditCate: false,
      // 绑定的分类
      cate: '',
      // 绑定的要修改的分类
      editCate: '',
      // 级联选择器绑定，是选中的分类的cate id数组 [ 1, 3 ]
      currentCateId: -1,
      value: [],
      // 将来表格要绑定的数据，分类的数组，而添加分类时只展示父级分类，不能直接绑定options，要先进行处理
      options: [],
      // 这个用于添加分类时，只显示父级分类
      option: [],
      // 添加分类的对象准备
      cateObj: {}
    }
  },
  methods: {
    // 删除分类按钮categories/:id
    async delCate (cate) {
      this.currentCateId = cate.cat_id
      const res = await this.$http.delete(`categories/${this.currentCateId}`)
      this.getCategories()
      // console.log('删除分类', res)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
      } else {
        this.$message.warning(res.data.meta.msg)
      }
    },
    // 展示编辑分类对话框
    showEditCate (cate) {
      this.dialogFormVisibleEditCate = true
      this.editCate = cate.cat_name
      this.currentCateId = cate.cat_id
    },
    // 编辑分类实现 编辑提交分类put categories/:id {cat_name}
    async changeCate () {
      const res = await this.$http.put(`categories/${this.currentCateId}`, {cat_name: this.editCate})
      // console.log('编辑分类', res)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
      } else {
        this.$message.warning(res.data.meta.msg)
      }
      this.dialogFormVisibleEditCate = false
      this.getCategories()
    },
    // 这里注意，如果不选就是添加一级分类
    // 点击确认按钮，添加分类post方法 categories
    // cat_pid分类父 ID不能为空 3
    // cat_name分类名称不能为空 xxx
    // cat_level分类层级不能为空 三级
    // 选中大家电-电视 value[1,3]
    async addGoodsCate () {
      if (this.value.length === 0) {
        this.cateObj.cat_pid = 0
        this.cateObj.cat_name = this.cate
        // 这一步也没必要，应当在定义cate的时候，就放在cateObj里，双向数据绑定
        this.cateObj.cat_level = 0
      } else {
        this.cateObj.cat_name = this.cate
      }
      const res = await this.$http.post(`categories`, this.cateObj)
      // console.log('添加分类', res)
      if (res.data.meta.status === 201) {
        this.$message.success(res.data.meta.msg)
      } else {
        this.$message.warning(res.data.meta.msg)
      }
      this.dialogFormVisibleAddCate = false
      this.getCategories()
      this.cate = ''
      this.value = []
    },
    // 当级联选择器选中一个分类时,其实都没必要写在这里，全写在addGoodsCate里不就得了
    async handleChange () {
      // 这步判断没有用，必须先写了分类名称
      // 长度为2时，所添加的新分类level为2
      let length = this.value.length
      // 在选了分类的情况下
      this.cateObj.cat_pid = this.value[ length - 1 ]
      this.cateObj.cat_level = length
      // console.log('this.cateObj', this.cateObj)
    },
    async getCategories () {
      const res = await this.$http.get(`categories?type=3`)
      this.options = res.data.data
      const res1 = await this.$http.get(`categories?type=2`)
      this.option = res1.data.data
      // console.log('res', res)
      // console.log('options', this.options)
      // console.log('option', this.option)
    }
  },
  created () {
    // 获取级联选择器数据源 商品的分类
    this.getCategories()
  }
}
</script>
<style>
.cateinput {
  width: 220px;
}
.is-always-shadow , .el-button{
  margin-bottom: 15px;
}
</style>
