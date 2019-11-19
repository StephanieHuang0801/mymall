<!--
 * @Author: your name
 * @Date: 2019-11-18 22:08:34
 * @LastEditTime: 2019-11-19 21:06:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\rights\role.vue
 -->
<template>
  <el-card>
      <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-table :data="roleList" height="450" border style="width: 100%;margin-top: 15px">
    <!-- 给表格添加展开功能，添加一个带有展开属性的标签 请求所有权限列表，树形类型,错-->
    <el-table-column type="expand"  prop="roleList">
      <template slot-scope="scope">
          <el-row v-for="item in scope.row.children" :key="item.id">
              <el-column :span="4">
                <!-- 可移除标签，这里展示一级标签 -->
                  <el-tag>{{item.authName}}</el-tag>
              </el-column>
              <el-column :span="20">
                   <el-row>
                       <el-column :span="4">{{二级标签}}</el-column>
                       <el-column :span="20">{{三级标签}}</el-column>
                   </el-row>
              </el-column>
          </el-row>
      </template>
    </el-table-column>
        <el-table-column type="index" prop="id" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180">
        </el-table-column>
        <el-table-column prop="roleDesc" label="描述">
        </el-table-column>
        <el-table-column prop="roleList" label="操作">
            <!-- 编辑用户按钮 -->
            <template slot-scope="roleList">
                <!-- 编辑按钮 -->
                <el-button type="primary" icon="el-icon-edit" size="small" circle
                @click="editRole(roleList.row)"></el-button>
                <!-- 设置用户角色按钮 -->
                <el-button type="success" icon="el-icon-setting" size="small" circle @click="showRoleBox(roleList.row)"></el-button>
                <!-- 删除按钮 -->
                <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                circle
                @click="delRole(roleList.row.id)"
                ></el-button>
            </template>
        </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  created () {
    this.getRoleList()
    // 需要和角色关联起来，因此不是所有权限列表的树形而是请求角色列表
    // this.getRightsList()
  },
  data () {
    return {
      roleList: []
    //   rightList: []
    }
  },
  methods: {
    async getRoleList () {
      const res = await this.$http.get(`roles`)
      // console.log(res)
      this.roleList = res.data.data
    },
    // async getRightsList () {
    //   const res1 = await this.$http.get(`rights/tree`)
    //   console.log(res1)
    //   this.rightList = res1.data.data
    // },
    editRole () {},
    delRole () {},
    showRoleBox () {}
  }
}
</script>
<style>
 el-tag {
     margin-top: 5px;
 }
</style>
