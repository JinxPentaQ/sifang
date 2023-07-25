<template>
  <section class="page-container">
    <div class="tableDivs">
      <div class="toolNav">
        <div class="toolNavList">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="mini"
            @click="newsFormVisible = true;"
          >新增</el-button>
        </div>
      </div>
      <!--列表-->
      <el-table
        border
        :data="tableData"
        highlight-current-row
        v-loading="listLoading"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="status" label="状态"  :formatter="statusMethods"></el-table-column>
        <el-table-column prop="status" label="状态" :formatter="statusMethods">
          <template slot-scope="scope">
            <el-switch
              :inactive-value="0"
              :active-value="1"
              v-model="scope.row.status"
              disabled
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="role_name" label="类型" align="left"></el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteHandle(scope.row.id)" size="mini">删除</el-button>
            <el-button slot="reference" type="text" size="mini" @click="resetPwd(scope.row.id)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="10"
        layout="total, prev, pager, next, sizes, jumper"
        :total="total"
        style="float:right;margin: 15px;"
      ></el-pagination>
    </div>
    <!--新增界面-->
    <el-dialog title="新增管理员" :visible.sync="newsFormVisible" style="width:60%;margin:0 auto;">
      <el-form :model="news" :rules="rules" ref="news">
        <el-row>
          <el-col :span="22">
            <el-form-item prop="name" label="管理员昵称" :label-width="formLabelWidth">
              <el-input v-model="news.name" autocomplete="off" placeholder="管理员账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item prop="account" label="管理员账号" :label-width="formLabelWidth">
              <el-input v-model="news.account" autocomplete="off" placeholder="管理员账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item prop="type" label="角色" :label-width="formLabelWidth">
              <el-select v-model="news.role_id" style="width:100%;">
                <el-option
                  v-for="(item,index) in roleList"
                  :key="index"
                  :value="item.id"
                  :label="item.role_name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="addSubmit('news')">确定</el-button>
        <el-button size="mini" @click="newsFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getAdmin, addAdmin, delAdmin, resetAdminPwd } from "@/api/admin";
import { getRole } from "@/api/role";
export default {
  data() {
    return {
      tableData: [],
      roleList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      news: {
        name: "",
        account: "",
        role_id: "",
      },
      formLabelWidth: "120px",
      LabelWidth: "140px",
      newsFormVisible: false,
      rules: {
        name: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
        ],
        account: [
          { required: true, message: "请输入管理员密码", trigger: "blur" },
        ],
        role_id: [
          { required: true, message: "请选择账户类型", trigger: "change" },
        ],
      },
      statusOptions: [
        {
          label: "禁用",
          value: 0,
        },
        {
          label: "启用",
          value: 1,
        },
      ],
    };
  },
  methods: {
    statusMethods(row) {
      for (var i in this.statusOptions) {
        switch (row.status) {
          case this.statusOptions[i].value:
            return this.statusOptions[i].label;
            break;
        }
      }
    },
    // 分页
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    // 分页N条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUsers();
    },
    // 重置
    resetForm() {
      this.$refs.filters.resetFields();
      this.getUsers();
    },
    // 获取用户列表
    getUsers() {
      this.listLoading = true;
      getAdmin({
        page: this.page,
        limit: this.pageSize,
      })
        .then((res) => {
          this.listLoading = false;
          this.tableData = res.items;
          this.total = Number(res.total);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取角色列表
    getRoles() {
      getRole()
        .then((res) => {
          this.roleList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //新增
    addSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addAdmin(this.news)
            .then(() => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.$refs[formName].resetFields();
              this.newsFormVisible = false;
              this.getUsers();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    //删除用户
    deleteHandle(id) {
      this.$confirm("确认删除该管理员吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.listLoading = true;
          delAdmin({ id })
            .then((res) => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.listLoading = false;
              this.getUsers();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    //重置密码
    resetPwd(id) {
      this.$confirm("确认重置密码?", "提示", {
        type: "warning",
      })
        .then(() => {
          resetAdminPwd({ id })
            .then((res) => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
  },
  created() {
    this.getUsers();
    this.getRoles();
  },
};
</script>

<style scoped>
</style>