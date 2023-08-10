<template>
  <section class="page-container">
    <div class="tableDivs">
      <div class="toolNav">
        <div class="toolNavList">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="mini"
            @click="newsFormVisible = true"
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
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="config_name" label="配置名称"></el-table-column>
        <el-table-column prop="config_key" label="配置Key"></el-table-column>
        <el-table-column prop="config_value" label="配置Value"></el-table-column>
        <el-table-column prop="desc" label="备注"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="editHandle(scope.row)"
              size="mini"
              >编辑</el-button
            >
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
        style="float: right; margin: 15px"
      ></el-pagination>
    </div>
    <!--新增界面-->
    <el-dialog
      title="编辑配置"
      :visible.sync="newsFormVisible"
      style="width: 60%; margin: 0 auto"
    >
      <el-form :model="news" :rules="rules" ref="news">
        <el-row>
          <el-col :span="22">
            <el-form-item
              prop="config_key"
              label="配置key"
              :label-width="formLabelWidth"
            >
              <el-input
                disabled
                v-model="news.config_key"
                autocomplete="off"
                placeholder="配置key"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item
              prop="config_value"
              label="配置value"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="news.config_value"
                autocomplete="off"
                placeholder="配置value"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="addSubmit('news')"
          >确定</el-button
        >
        <el-button size="mini" @click="newsFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import {
  getSysConfig,
  setSysConfig,
} from "@/api/system";
export default {
  data() {
    return {
      tableData: [],
      channelList: [],
      roleList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      news: {
        config_key: "",
        config_value: "",
      },
      formLabelWidth: "120px",
      LabelWidth: "140px",
      newsFormVisible: false,
      rules: {
        config_value: [{ required: true, message: "请输入配置key", trigger: "blur" }],
        config_key: [{ required: true, message: "请输入配置value", trigger: "blur" }],
      },
    };
  },
  methods: {
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
      getSysConfig()
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
          setSysConfig(this.news)
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
    editHandle(row) {
      this.news = row;
      this.newsFormVisible = true;
    }
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
</style>