<!--
 * @Author: your name
 * @Date: 2019-11-18 22:08:34
 * @LastEditTime: 2019-11-21 22:38:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\components\rights\role.vue
 -->
<template>
<el-card>
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-table :data="roleList" height="450" border style="width: 100%;margin-top: 15px">
        <!-- 给表格添加展开功能，添加一个带有展开属性的标签 请求所有权限列表，树形类型,错-->
<el-table-column type="expand" prop="roleList">
    <template slot-scope = "scope">
    <!-- 一级 一行两列 -->
    <span v-if="scope.row.children.length===0">该角色无权限</span>
    <el-row v-for="(item1,i) in scope.row.children" :key="i">
        <!-- 第一列中放一级标签 -->
        <el-col :span="4">
            <!-- 可移除标签，这里展示一级标签,绑定取消权限方法 -->
            <el-tag closable @close="delRight(item1.id,scope.row)">{{item1.authName}}</el-tag>
        </el-col>
        <el-col :span="20">
            <!-- 第二列也是一行两列 -->
            <el-row v-for="(item2,index) in item1.children" :key="index">
                <!-- 第二行第一列中放二级标签 -->
                <el-col :span="4">
                    <el-tag type="success" closable @close="delRight(item2.id,scope.row)">{{item2.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                    <el-tag @close="delRight(item3.id,scope.row)" closable type="warning" v-for="(item3,indexInner) in item2.children" :key="indexInner">{{item3.authName}}</el-tag>
                </el-col>
            </el-row>
        </el-col>
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
            <template slot-scope="scope">
                <!-- 编辑角色按钮 -->
                <el-button type="primary" icon="el-icon-edit" size="small" circle @click="editRole(roleList.row)"></el-button>
                <!-- 设置角色权限按钮 -->
                <el-button type="success" icon="el-icon-setting" size="small" circle @click="editRightBox(scope.row)"></el-button>
                <!-- 删除角色按钮 -->
                <el-button type="danger" icon="el-icon-delete" size="small" circle @click="delRole(roleList.row.id)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分配权限弹框 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisibleRight">
        <!-- {{树形结构}} -->
        <!-- node-key的值，是treelist这个数据来源中的该值的key名 -->
        <!-- :default-expanded-keys="allRoleId" 不需要forEach获得所有id了，这一个属性就完成所有功能-->
        <!-- check-strictly在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false -->
        <el-tree
        ref="mytree"
        default-expand-all
        :data="treelist"
        show-checkbox
        node-key="id"
        :default-checked-keys="checklistArr"
        :props="defaultProps">
        </el-tree>
       <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
          <el-button type="primary" @click="confirmRole()">确 定</el-button>
       </div>
    </el-dialog>
</el-card>
</template>2
<script>
export default {
  created () {
    this.getRoleList()
    // 需要和角色关联起来，因此不是所有权限列表的树形而是请求角色列表
    // this.getRightsList()
  },
  data () {
    return {
      roleList: [],
      dialogFormVisibleRight: false,
      //   树形结构绑定的data,data是数组一级的Array(5)，对于每个一级，又是一个对象
      treelist: [],
      checklist: [],
      checklistArr: [],
      currentRoleId: -1,
      defaultProps: {
        children: 'children',
        label: 'authName'
        // 这两个值要去treelist的属性中找,这是实现绑定的关键
      }
    //   allRoleId: []
    }
    // 这是文档的结构，我用treelist代替
    // data: [{
    //     id: 1,
    //     label: '一级 1',
    //     children: [{
    //       id: 4,
    //       label: '二级 1-1',
    //       children: [{
    //         id: 9,
    //         label: '三级 1-1-1'
    //       }, {
    //         id: 10,
    //         label: '三级 1-1-2'
    //       }]
    //     }]
    //   }],
    //   defaultProps: {
    //     children: 'children',
    //     label: 'label'
    //   }
    // }
    //   rightList: []
  },
  methods: {
    async getRoleList () {
      const res = await this.$http.get(`roles`)
      console.log(res)
      this.roleList = res.data.data
    //   console.log(typeof(res.data.data[2].children))
    },
    async getRightsList () {
      const res1 = await this.$http.get(`rights/tree`)
      console.log(res1)
      this.treelist = res1.data.data
      // console.log('treelist:', this.treelist)
      // var tmpArr = []
      // this.treelist.forEach(item1 => {
      //   tmpArr.push(item1.id)
      //   var item2 = item1.children
      //   item2.forEach(item2 => {
      //     tmpArr.push(item2.id)
      //     var item3 = item2.children
      //     item3.forEach(item3 => {
      //       tmpArr.push(item3.id)
      //     })
      //   })
      //   // console.log('tmpArr', tmpArr)
      // })
      // this.allRoleId = tmpArr
    },
    // async delRight (rightId, roleId) {
    async delRight (rightId, role) {
    // roles/:roleId/rights/:rightId delete方法
    // roleList里有roleid
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
      } else {
        this.$message.warning(res.data.meta.msg)
      }
      // console.log(res)
      role.children = res.data.data
    },
    // 分配用户权限
    editRightBox (role) {
      this.dialogFormVisibleRight = true
      this.checklist = role.children
      this.currentRoleId = role.id
      //  这里只展示现有的功能
      this.getRightsList()
      // 将所有权限的id赋值给数组allRoleId
      console.log('role', role)
      console.log('checklist:', this.checklist)
      // 问题：发现这里拿不到treelist
      var tmpArr = []
      this.checklist.forEach(item1 => {
        // tmpArr.push(item1.id)
        var item2 = item1.children
        item2.forEach(item2 => {
        //   tmpArr.push(item2.id)
          var item3 = item2.children
          item3.forEach(item3 => {
            tmpArr.push(item3.id)
          })
        })
      })
      this.checklistArr = tmpArr
      //   console.log('tmpArr', tmpArr)
      //   var length = tmpArr.length
      //   console.log('length', length)
    },
    // 点击确认按钮，增删改权限
    async confirmRole () {
      this.dialogFormVisibleRight = false
      // getCheckedKeys若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
      // getHalfCheckedKeys若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点的 key 所组成的数组
      // 角色授权接口post roles/:roleId/rights请求体rids
      let arr1 = this.$refs.mytree.getCheckedKeys()
      let arr2 = this.$refs.mytree.getHalfCheckedKeys()
      let arr = [...arr1, ...arr2]
      const res = await this.$http.post(`roles/${this.currentRoleId}/rights`, {rids: arr.join(',')})
      console.log('设置角色', res)
      this.getRoleList()
    }
  }
}
</script>
<style>
</style>
