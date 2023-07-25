<template>
  <section class="page-container">
    <div class="tableDivs">
      <div class="toolNav">
        <div class="toolNavList">
          <el-button
            type="primary"
            size="mini"
            @click.native="handleAdd"
            icon="el-icon-circle-plus-outline"
            >新增</el-button
          >
        </div>
      </div>
      <!--列表-->
      <el-table
        border
        :data="tableData"
        highlight-current-row
        v-loading="listLoading"
      >
        <el-table-column
          label="ID"
          mi-width="120px"
          prop="id"
        ></el-table-column>
        <el-table-column
          prop="role_name"
          label="角色名称"
          align="left"
        ></el-table-column>
        <!-- <el-table-column prop="leave" label="角色等级" align="left" min-width="120"></el-table-column>
        <el-table-column prop="status" label="角色状态" align="left">
          <template slot-scope="scope">
            <el-switch
              :inactive-value="0"
              :active-value="1"
              v-model="scope.row.status"
              @change="handelSwitch(scope.row.id,scope.row.name,scope.row.status)"
            ></el-switch>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="150"
          align="left"
        ></el-table-column>
        <el-table-column
          label="操作"
          min-width="130"
          align="left"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="getPermission(scope.row)"
              icon="el-icon-setting"
              >设置权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 设置权限 -->
    <el-dialog title="设置权限信息" :visible.sync="setAuthVisible">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <div style="margin: 15px 0"></div>
      <el-checkbox-group
        v-model="permissionIds"
        @change="handleChangePermission"
      >
        <el-checkbox v-for="item in permissionList" :label="item.id" :key="item.path">{{
          item.menu_name
        }}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="setPermission()"
          >确定</el-button
        >
        <el-button size="mini" @click="setAuthVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getRole, setRolesPermission, getsPermission } from "@/api/role";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 15,
      listLoading: false,
      formLabelWidth: "120px",
      LabelWidth: "140px",
      setAuthVisible: false,
      itemId: "",
      permissionIds: "",
      checkAll: false,
      isIndeterminate: false,
      permissionList: [],
    };
  },
  methods: {
    // 获取角色列表
    getUsers() {
      this.listLoading = true;
      getRole()
        .then((res) => {
          this.listLoading = false;
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取菜单
    getPermission(item) {
      this.itemId = item.id;
      this.listLoading = true;
      this.setAuthVisible = true;
      getsPermission()
        .then((res) => {
          this.listLoading = false;
          this.permissionList = res;
          this.permissionIds = item.permission_ids.split(',').map((item)=> Number(item));
          this.checkAll = this.permissionIds.length === this.permissionList.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setPermission() {
      setRolesPermission({
        role_id: this.itemId,
        permission_ids: this.permissionIds.toString(),
      }).then((res) => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.setAuthVisible = false;
        this.$router.go(0);
      });
    },
    handleCheckAllChange(val) {
      this.permissionIds = val ? this.permissionList.map((item) => item.id) : [];
      this.checkAll = val;
      this.isIndeterminate = val.length < this.permissionList.length;
    },
    handleChangePermission(value) {
      console.log(value, 'values')
      this.permissionIds = value;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.permissionList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.permissionList.length;
    }
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style scoped>
</style>