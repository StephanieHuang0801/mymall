<!--
 * @Author: your name
 * @Date: 2019-11-28 20:37:01
 * @LastEditTime: 2019-11-28 22:16:14
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
      <el-table-column
        type="index"
        prop="cat_id"
        label="序号"
        width="80">
      </el-table-column>
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
          <template >
            <!-- 编辑参数按钮 @click="showEditAttr(scope.row)"-->
            <el-button type="primary" icon="el-icon-edit" size="small" circle ></el-button>
            <!-- 删除参数按钮 @click="delAttr(scope.row)"-->
            <el-button type="danger" icon="el-icon-delete" size="small" circle ></el-button>
          </template>
        </el-table-column>
    </el-table>
    <!-- 添加分类弹框 -->
    <el-dialog title="修改动态参数" :visible.sync="dialogFormVisibleAddCate">
        <!-- :model="editAttrs" -->
        <el-form>
            <el-form-item label="分类名称" >
                <el-input v-model="cate" autocomplete="off" class="cateinput"></el-input>
            </el-form-item>
            <!-- 展示级联选择器 -->
            <!-- @change="handleChange" -->
            <el-form-item label="商品分类" >
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
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAddCate = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
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
      // 绑定的分类
      cate: '',
      value: [],
      // 将来表格要绑定的数据，分类的数组
      options: []
    }
  },
  methods: {
    // 当级联选择器选中一个分类时，应当在表中渲染出数据
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
      console.log('res', res)
      console.log('options', this.options)
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
</style>
