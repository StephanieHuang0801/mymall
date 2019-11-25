<!--
 * @Author: your name
 * @Date: 2019-11-23 15:12:59
 * @LastEditTime: 2019-11-25 19:35:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\goods\goodslist.vue
 -->
<template>
<el-card>
  <!-- 面包屑 -->
  <my-bread level1="商品管理" level2="商品列表"></my-bread>
  <!-- 搜索input标签 -->
  <div style="margin-top: 15px;">
      <el-input @clear="getGoodsList" placeholder="请输入内容" v-model="query" class="input-with-select" clearable>
          <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
      </el-input>
      <!-- 添加按钮 -->
      <el-button type="success" @click="$router.push({name:'goodsadd'})">添加商品</el-button>
  </div>
    <!-- 商品列表 -->
    <el-table :data="goodslist" height="450" border style="width: 100%;margin-top: 15px">
        <el-table-column type="index" prop="id" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="680">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column prop="goodslist" label="创建日期">
            <template slot-scope="goodslist">
                {{goodslist.row.add_time | fmtdate}}
            </template>
        </el-table-column>
        <el-table-column prop="goodslist" label="操作">
            <!-- 编辑按钮 -->
            <!-- <template slot-scope="goodslist"> -->
                <!-- 编辑按钮 -->
                <!-- <el-button type="primary" icon="el-icon-edit" size="small" circle
                @click="editUser(goodslist.row)"></el-button> -->
                <!-- 设置用户角色按钮 -->
                <!-- <el-button type="success" icon="el-icon-setting" size="small" circle @click="showSettingDialog(goodslist.row)"></el-button> -->
                <!-- 删除按钮 -->
                <!-- <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                circle
                @click="delUser(goodslist.row.id)"
                ></el-button>
            </template> -->
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagenum" :page-sizes="[6, 8, 10]" :page-size="8" layout="total,sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
</el-card>
</template>
<script>
export default {
  data () {
    return {
      goodslist: [],
      pagenum: 1,
      pagesize: 8,
      query: '',
      total: -1
    }
  },
  created () {
    this.getGoodsList()
  },

  methods: {
    // 分页方法
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.pagenum = 1
      this.getGoodsList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getGoodsList()
    },
    loadGoodsList () {
      this.getGoodsList(this.query)
    },
    // 搜索商品
    searchGoods () {},
    // 获取商品列表 goods
    async getGoodsList () {
    //   const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const res = await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log('商品列表', res)
      this.goodslist = res.data.data.goods
      this.total = res.data.data.total
    }
  }
}
</script>
<style>
.el-input {
  width: 400px;
}
</style>
