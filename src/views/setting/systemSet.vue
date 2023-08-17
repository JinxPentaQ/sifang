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
        <el-table-column prop="config_value" label="配置Value">
          <template slot-scope="scope">
            <div v-if="scope.row.config_key === 'app_version'">
              <p><span>最新版本：</span>{{ JSON.parse(scope.row.config_value).version }}</p>
              <p><span>下载地址：</span>{{ JSON.parse(scope.row.config_value).download_url }}</p>
            </div>
            <div v-if="scope.row.config_key === 'auto_sell_assign'">
              <el-switch
                inactive-value="0"
                active-value="1"
                v-model="scope.row.config_value"
                @change="handleSellStatusChange($event)"
              ></el-switch>
            </div>
            <div v-if="scope.row.config_key === 'auto_buy_assign'">
              <el-switch
                inactive-value="0"
                active-value="1"
                v-model="scope.row.config_value"
                @change="handleBuyStatusChange($event)"
              ></el-switch>
            </div> </template
        ></el-table-column>
        <el-table-column prop="desc" label="备注"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.config_key === 'app_version'"
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
              prop="version"
              label="最新版本"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="news.version"
                autocomplete="off"
                placeholder="最新版本"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item
              prop="download_url"
              label="下载地址"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="news.download_url"
                autocomplete="off"
                placeholder="下载地址"
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
  setSellConfig,
  setBuyConfig,
  setAppVersion,
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
        config_value: [
          { required: true, message: "请输入配置key", trigger: "blur" },
        ],
        config_key: [
          { required: true, message: "请输入配置value", trigger: "blur" },
        ],
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
          setAppVersion(this.news)
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
    },
    handleSellStatusChange(status) {
      setSellConfig({ config_value: +status }).then(() => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      });
    },
    handleBuyStatusChange(status) {
      setBuyConfig({ config_value: +status }).then(() => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
</style>