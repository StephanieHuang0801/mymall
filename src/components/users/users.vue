<!--
 * @Author: your name
 * @Date: 2019-11-10 16:14:10
 * @LastEditTime: 2019-11-17 20:49:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\users\users.vue
 -->
<template>
<el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框、添加用户 -->
    <div style="margin-top: 15px;">
        <el-input @clear="loadUserList" placeholder="请输入内容" v-model="query" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
        <!-- 添加按钮 -->
        <el-button type="success" @click="showAddDialog">添加用户</el-button>
    </div>
    <!-- 用户列表 -->
    <el-table :data="userlist" height="450" border style="width: 100%;margin-top: 15px">
        <el-table-column type="index" prop="id" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="role_name" label="角色">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="userlist" label="创建日期">
            <template slot-scope="userlist">
                {{userlist.row.create_time | fmtdate}}
            </template>
        </el-table-column>
        <el-table-column prop="userlist" label="用户状态">
            <template slot-scope="userlist">
                <!-- 状态开关 -->
                <el-switch v-model="userlist.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="changeState(userlist.row)">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column prop="userlist" label="操作">
            <!-- 编辑用户按钮 -->
            <template slot-scope="userlist">
                <!-- 编辑按钮 -->
                <el-button type="primary" icon="el-icon-edit" size="small" circle
                @click="editUser(userlist.row)"></el-button>
                <!-- 设置用户角色按钮 -->
                <el-button type="success" icon="el-icon-setting" size="small" circle @click="showSettingDialog(userlist.row)"></el-button>
                <!-- 删除按钮 -->
                <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                circle
                @click="delUser(userlist.row.id)"
                ></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total,sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- 添加用户弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 编辑用户弹框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="editUserConfirm">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 设置角色弹框 -->
    <el-dialog title="设置角色" :visible.sync="dialogRoleFormVisible">
      <el-form :model="form">
        <el-form-item label="当前用户" :label-width="formLabelWidth">
            {{currentUserName}}
        </el-form-item>
        <el-form-item label="分配新角色" :label-width="formLabelWidth">
          <!-- 角色id做value（查数组）值 显示与遍历 -->
          <el-select v-model="currentRoleId" >
            <!-- <el-option :label="currentRoleName" :value="currentRoleId"></el-option> -->
            <el-option v-for="item in roleData" :key=item.id :value="item.id" :label="item.roleName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeRole(currentRoleId)">确 定</el-button>
      </div>
    </el-dialog>
</el-card>
</template>
<script>
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      userlist: [],
      total: -1,
      value: true,
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      dialogRoleFormVisible: false,
      form: {
        username: '',
        mobile: '',
        email: '',
        password: ''
      },
      formLabelWidth: '120px',
      currentRoleId: -1,
      currentUserName: '',
      currentRoleName: '',
      currentUserId: -1,
      roleData: []
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 分页方法
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      // pagesize=2 第1页  2；第2页3 4
      // const start = this.pagesize * (val - 1)
      // console.log(`数组起始位置: ${start}`)
      // this.userlist.splice(start)
      this.getUserList()
    },
    async getUserList () {
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      // console.log(res)
      // console.log('请求数据')
      const {data: {total, users}, meta: {msg, status}} = res.data
      if (status === 200) {
        this.userlist = users
        this.total = total
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    },
    searchUser () {
      this.getUserList(this.query)
    },
    loadUserList () {
      this.getUserList(this.query)
    },
    // 展示添加用户界面
    showAddDialog () {
      this.dialogFormVisible = true
      this.form = {}
    },
    // 添加用户
    async addUser () {
      this.dialogFormVisible = false
      const res = await this.$http.post(`users`, this.form)
      // console.log(res)
      const {meta: {msg, status}} = res.data
      if (status === 201) {
        // this.form.username = ''
        // this.form.mobile = ''
        // this.form.emial = ''
        // this.form.password = ''
        this.form = {}
        this.$message.success(msg)
        this.getUserList(this.query)
      } else {
        this.$message.warning(msg)
      }
    },
    // 点击删除按钮，弹出对话框
    delUser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${id}`)
        console.log(id)
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            //   message: '删除成功!'
            message: res.data.meta.msg
          })
          this.pagenum = 1
          this.getUserList()
        } else {
          this.$message({
            type: 'warning',
            message: res.data.meta.msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑用户界面显示
    editUser (user) {
      this.dialogFormVisibleEdit = true
      this.form = user
      console.log(user)
    //   this.currentUserId = user.id
    },
    // 修改信息
    async editUserConfirm () {
    //   users/:id
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      const {meta: {msg, status}} = res.data
      if (status === 200) {
        this.dialogFormVisibleEdit = false
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    },
    // 修改用户状态 users/:uId/state/:type
    async changeState (user) {
    //   console.log(this.form.id)
      console.log(user)
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}/`)
      const {meta: {msg, status}} = res.data
      if (status === 200) {
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    },
    // 展示设置角色对话框，参数是用户
    async showSettingDialog (user) {
      // 设置数据 ①当前角色名-currentRoleName ②当前角色id-currentRoleId ③角色数组
      this.dialogRoleFormVisible = true
      this.currentUserName = user.username
      // console.log(user)
      // this.currentRoleName = user.role_name
      // roles 返回角色对象数组
      this.currentUserId = user.id
      const res = await this.$http.get(`roles`)
      this.roleData = res.data.data
      // 根据id查角色id
      const res1 = await this.$http.get(`users/${user.id}`)
      this.currentRoleId = res1.data.data.rid
    },
    // 分配用户角色 users/:id/role
    async changeRole () {
      this.dialogRoleFormVisible = false
      const res = await this.$http.put(`users/${this.currentUserId}/role`, {rid: this.currentRoleId})
      // console.log(this.currentUserId)
      // console.log(this.currentRoleId)
      console.log(res)
      this.dialogRoleFormVisible = false
      this.getUserList()
    }
  }
}
</script>
<style>
.el-input {
  width: 400px;
}
.el-card, .el-card__body {
    height: 100%;
}
.el-card__body {
padding: 40px;
}
.el-table {
    height: 500px;
}
</style>
