<!--
 * @Author: your name
 * @Date: 2019-12-01 15:41:42
 * @LastEditTime: 2019-12-01 17:14:51
 * @LastEditors: Please set LastEditors
 * @Description: 订单管理-订单列表
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\order\order.vue
 -->
<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread level1="订单管理" level2="订单列表"></my-bread>
    <!-- 订单列表 -->
    <el-table :data="orderlist" height="450" border style="width: 100%;margin-top: 15px">
        <el-table-column type="index" prop="id" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="280">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="150">
        </el-table-column>
        <el-table-column prop="order_pay" label="是否付款" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.order_pay === '0'">未付款</span>
            <span v-if="scope.row.order_pay === '1'">已付款</span>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="150">
        </el-table-column>
        <el-table-column prop="orderlist" label="下单时间">
            <template slot-scope="orderlist">
                {{orderlist.row.create_time | fmtdate}}
            </template>
        </el-table-column>
        <el-table-column prop="orderlist" label="操作">
            <template slot-scope="orderlist">
                <!-- 编辑地址按钮 -->
                <el-button type="primary" icon="el-icon-edit" size="small" circle
                @click="editAddr(orderlist.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="pagenum"
    :page-sizes="[7,8,10,15]"
    :page-size="7"
    layout="total,sizes, prev, pager, next, jumper"
    :total="total">
    </el-pagination>
    <!-- 编辑订单地址弹框 -->
    <el-dialog title="修改订单地址" :visible.sync="dialogFormVisibleEditAddr">
        <el-form :model="form">
            <el-form-item label="省市区" :label-width="formLabelWidth">
              <!-- @change="handleChange" -->
              <el-cascader
              clearable
              v-model="value"
              :options="citydata"
              :props="{
              expandTrigger: 'hover', label: 'label',
              value: 'value',
              children: 'children',
              checkStrictly: true}"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
                <el-input v-model="form.addr" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEditAddr = false">取 消</el-button>
            <el-button type="primary" @click="changeAddr">确 定</el-button>
        </div>
    </el-dialog>
  </el-card>
</template>
<script>
// 导入一个js文件，是一个城市数组
import cityData from '@/assets/city_data2017_element.js'
export default {
  data () {
    return {
      orderlist: [],
      query: '',
      pagenum: 1,
      pagesize: 7,
      total: -1,
      currentOrderId: -1,
      currentOrder: {},
      dialogFormVisibleEditAddr: false,
      // 订单地址
      formLabelWidth: '120px',
      form: {},
      citydata: [],
      value: []
    }
  },
  created () {
    this.getOrderlist()
  },
  methods: {
    // 编辑订单地址发请求put orders/:id
    // id订单 ID不能为空携带在url中
    // is_send订单是否发货1:已经发货，0:未发货
    // order_pay订单支付支付方式 0未支付1支付宝2微信3银行卡
    // order_price订单价格
    // order_number订单数量
    // pay_status支付状态订单状态：0未付款、1已付款
    changeAddr () {
    // const res =  this.$http.put(`orders/${this.currentOrderId}`)
    // 没有实际功能，接口文档没有提供修改地址的接口
      this.dialogFormVisibleEditAddr = false
    },
    // 编辑订单地址弹框
    editAddr (order) {
      this.dialogFormVisibleEditAddr = true
      this.currentOrderId = order.order_id
      this.currentOrder = order
      this.citydata = cityData
    },
    // 分页方法
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.pagenum = 1
      this.getOrderlist()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getOrderlist()
    },
    // orders，请求参数如下
    // query查询参数可以为空
    // pagenum当前页码不能为空
    // pagesize每页显示条数不能为空
    // user_id用户 ID可以为空
    // pay_status支付状态可以为空
    // is_send是否发货可以为空
    // order_fapiao_title['个人','公司']可以为空
    // order_fapiao_company公司名称可以为空
    // order_fapiao_content发票内容可以为空
    // consignee_addr发货地址可以为空
    async getOrderlist () {
      const res = await this.$http.get(`orders?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      // console.log('订单列表', res)
      this.orderlist = res.data.data.goods
      this.total = res.data.data.total
      // console.log('orderlist', this.orderlist)
      // console.log('total', this.total)
    }
  }
}
</script>
<style>
.is-always-shadow {
  margin-bottom: 15px;
}
</style>
