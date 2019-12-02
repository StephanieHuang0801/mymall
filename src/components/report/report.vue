<!--
 * @Author: your name
 * @Date: 2019-12-01 17:08:35
 * @LastEditTime: 2019-12-02 20:54:52
 * @LastEditors: Please set LastEditors
 * @Description: 数据统计-数据报表
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\report\report.vue
 -->
<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread level1="数据统计" level2="数据报表"></my-bread>
    <!-- 为echart准备一个div容器 -->
    <div id="main" style="width: 600px;height:400px;"></div>
  </el-card>
</template>
<script>
var echarts = require('echarts')
export default {
  data () {
    return {}
  },
  methods: {
    async useEchart () {
      // init
      var myChart = echarts.init(document.getElementById('main'))
      const res = await this.$http.get(`reports/type/1`)
      // 参数为1时，data.data
      // legend:
      // data: (5) ["华东", "华南", "华北", "西部", "其他"]
      // __proto__: Object
      // series: (5) [{…}, {…}, {…}, {…}, {…}]
      // xAxis: [{…}]
      // yAxis: [{…}]
      let option1 = {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      }
      console.log('数据报表', res)
      let option2 = res.data.data
      let option = {...option1, ...option2}
      console.log(option)
      // setOption
      myChart.setOption(option)
    }
  },
  mounted () {
    // 这里操作元素
    this.useEchart()
    // const res = await this.$http.get(`reports/type/2`)
    // 参数为2时，data.data是数组
    // 2017-12-1: Array(4)
    // 0:
    // id: 81
    // rp2_count: 2860
    // rp2_date: "2017-11-30T16:00:00.000Z"
    // rp2_page: "首页"
  }
}
</script>
<style>
.is-always-shadow {
  margin-bottom: 15px;
}
</style>
