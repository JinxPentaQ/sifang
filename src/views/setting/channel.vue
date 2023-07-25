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
        <el-table-column prop="channel_name" label="通道名称"></el-table-column>
        <el-table-column prop="channel_code" label="通道code"></el-table-column>
        <el-table-column prop="status" label="通道状态">
          <template slot-scope="scope">
            <el-switch
              :inactive-value="0"
              :active-value="1"
              v-model="scope.row.status"
              disabled
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="通道描述"></el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteHandle(scope.row.id)" size="mini">删除</el-button>
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
    <el-dialog title="新增通道" :visible.sync="newsFormVisible" style="width:60%;margin:0 auto;">
      <el-form :model="news" :rules="rules" ref="news">
        <el-row>
          <el-col :span="22">
            <el-form-item prop="name" label="通道名称" :label-width="formLabelWidth">
              <el-input v-model="news.name" autocomplete="off" placeholder="通道名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item prop="code" label="通道code" :label-width="formLabelWidth">
              <el-input v-model="news.code" autocomplete="off" placeholder="通道code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item prop="desc" label="通道描述" :label-width="formLabelWidth">
              <el-input v-model="news.desc" autocomplete="off" placeholder="通道描述"></el-input>
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
import { getsChannel, addChannel, delChannel } from "@/api/channel";
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
        code: "",
        desc: "",
      },
      formLabelWidth: "120px",
      LabelWidth: "140px",
      newsFormVisible: false,
      rules: {
        name: [
          { required: true, message: "请输入通道名称", trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入通道code", trigger: "blur" },
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
      this.getData();
    },
    // 分页N条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    // 重置
    resetForm() {
      this.$refs.filters.resetFields();
      this.getData();
    },
    // 获取用户列表
    getData() {
      this.listLoading = true;
      getsChannel()
        .then((res) => {
          this.listLoading = false;
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //新增
    addSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addChannel(this.news)
            .then(() => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.$refs[formName].resetFields();
              this.newsFormVisible = false;
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    //删除用户
    deleteHandle(id) {
      this.$confirm("确认删除该通道吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.listLoading = true;
          delChannel({ id })
            .then((res) => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.listLoading = false;
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
</style>