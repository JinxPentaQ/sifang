<template>
  <section class="page-container">
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
      style="background: #fff; margin-bottom: 20px"
    >
      <div class="titleContent">
        <i class="el-icon-warning-outline"></i>
        筛选
      </div>
      <el-form ref="filters" :inline="true" :model="filters" size="medium">
        <el-form-item label="类型" prop="type" :label-width="labelWidth">
          <el-select v-model="filters.type" placeholder="类型" clearable>
            <el-option
              v-for="(item, index) in platFormTypeOptions"
              :label="item.text"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <div style="margin: 0 auto; width: 210px; float: right">
          <el-form-item>
            <el-button type="primary" size="mini" @click="getData"
              >搜索</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button type size="mini" @click="resetForm">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-col>

    <div class="tableDivs">
      <div class="toolNav">
        <div class="toolNavList">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="small"
            @click="newsFormVisible = true"
            >添加</el-button
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
          prop="id"
          label="平台ID"
          align="left"
          min-width="50"
        />
        <el-table-column
          prop="user_name"
          label="平台名称"
          align="left"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="handleInfo(scope.row)" size="mini">{{
              scope.row.user_name
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="平台账号"
          align="left"
          min-width="100"
        />
        <el-table-column
          prop="parent_id"
          label="推荐平台"
          align="left"
          min-width="100"
        ></el-table-column>
    
        <el-table-column
          prop="type"
          label="平台类型"
          align="left"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ getOptionsText(platFormTypeOptions, scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="平台备注"
          align="left"
          min-width="100"
        ></el-table-column>
        <el-table-column prop="status" label="状态" min-width="200">
          <template slot-scope="scope">
            <el-radio-group
              v-model="scope.row.status"
              @input="handleStatusChange($event, scope.row)"
            >
              <el-radio
                v-for="(item, i) in platFormStatusOptions"
                :label="item.value"
                :key="i"
                >{{ item.text }}</el-radio
              >
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" fixed="right" min-width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              icon="el-icon-wallet"
              @click="handleWallet(scope.row.id)"
              >查看钱包</el-button
            >
            <el-button
              type="text"
              size="mini"
              icon="el-icon-notebook-2"
              @click="handleWalletRecords(scope.row.id)"
              >钱包记录</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
    <!--新增-->
    <el-dialog title="添加平台" :visible.sync="newsFormVisible" width="30%"  >
      <el-form :model="news" ref="news" :rules="rules" size="mini">
        <el-form-item
          prop="user_name"
          label="平台名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="news.user_name" placeholder="平台名称"></el-input>
        </el-form-item>
        <el-form-item
          prop="account"
          label="平台账号"
          :label-width="formLabelWidth"
        >
          <el-input v-model="news.account" placeholder="平台账号"></el-input>
        </el-form-item>
        <el-form-item
          prop="remark"
          label="平台备注"
          :label-width="formLabelWidth"
        >
          <el-input v-model="news.remark" placeholder="平台备注"></el-input>
        </el-form-item>
        <el-form-item label="推荐平台ID" prop="type" :label-width="formLabelWidth">
          <el-select v-model="news.type" placeholder="推荐平台ID" clearable>
            <el-option
              v-for="(item, index) in tableData"
              :label="item.user_name"
              :value="item.id"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="handleAdd('news')"
          >确定</el-button
        >
        <el-button size="mini" @click="newsFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!--平台详情-->
    <el-dialog title="平台信息" :visible.sync="infoVisible" width="50%">
      <div class="info-item">
        <span>平台ID</span>
        <span>{{ detail.id }}</span>
      </div>
      <div class="info-item">
        <span>平台名称</span>
        <span>{{ detail.user_name }}</span>
      </div>
      <div class="info-item">
        <span>平台状态</span>
        <el-tag :type="getOptionsTag(platFormStatusOptions, detail.status)">{{
          getOptionsText(platFormStatusOptions, detail.status)
        }}</el-tag>
      </div>
      <div class="info-item">
        <span>平台账号</span>
        <span>{{ detail.account }}</span>
      </div>
      <div class="info-item">
        <span>平台类型</span>
        <span>{{ getOptionsText(platFormTypeOptions, detail.type) }}</span>
      </div>
      <div class="info-item">
        <span>备注</span>
        <span>{{ detail.remark }}</span>
      </div>
      <el-button type="text" size="mini" @click="handleResetPwd(detail.id)"
        >重置密码</el-button
      >
      <el-button
        type="text"
        size="mini"
        @click="handleResetGoogle(detail.id)"
        >重置Google密钥</el-button
      >
    </el-dialog>
  </section>
</template>

<script>
// import posAdmin from "./components/posAdmin.vue";
import {
  getsPlatform,
  addPlatform,
  modPlatformStatus,
  resetPlatformPwd,
  resetPlatformGA,
} from "@/api/platform";
import { getOptionsText, getOptionsTag } from "@/utils/func";
import {
  platFormTypeOptions,
  platFormType,
  platFormStatus,
  platFormStatusOptions,
} from "@/utils/const";
export default {
  data() {
    return {
      filters: {
        type: "0",
      },
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      labelWidth: "100px",
      formLabelWidth: "120px",
      formLabelWidthLong: "200px",
      newsFormVisible: false,
      infoVisible: false,
      //添加平台
      news: {},
      //平台基本信息
      detail: {},
      bindFormVisible: false,
      rules: {
        user_name: [
          { required: true, message: "请输入平台名称！", trigger: "blur" },
        ],
        account: [
          { required: true, message: "请输入平台账号！", trigger: "blur" },
        ],
        remark: [
          { required: true, message: "请输入平台备注！", trigger: "blur" },
        ],
      },
      platFormTypeOptions,
      platFormType,
      platFormStatus,
      platFormStatusOptions,
    };
  },
  methods: {
    getOptionsText,
    getOptionsTag,
    //分页
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
      this.getUsers();
    },
    //获取列表
    getData() {
      getsPlatform({
        ...this.filters,
        offset: this.page,
        limit: this.pageSize,
      })
        .then((res) => {
          this.listLoading = false;
          this.tableData = res.items;
          this.total = res.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //添加平台
    handleAdd(formName) {
      this.listLoading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addPlatform(this.news)
            .then(() => {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.$refs[formName].resetFields();
              this.listLoading = false;
              this.newsFormVisible = false;
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    // 修改平台状态
    handleStatusChange(status, row) {
      modPlatformStatus({ id: row.id, status }).then(() => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      });
    },
    // 查看详情
    handleInfo(row) {
      this.infoVisible = true;
      this.detail = row;
    },
    // 重置密码
    handleResetPwd(id) {
      resetPlatformPwd({ id }).then(() => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
      });
    },
    // 重置谷歌密钥
    handleResetGoogle(id) {
      resetPlatformGA({ id }).then(() => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
      });
    },
    // 查看钱包
    handleWallet(id) {
      this.$router.push(`/platformWallet/${id}`)
    },
    handleWalletRecords(id) {
      this.$router.push(`/platformWalletRecords/${id}`)
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 130px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-dialog__body {
  .info-item {
    span:nth-child(1) {
      width: 80px;
      display: inline-block;
      font-weight: 700;
      font-size: 14px;
      color: #606266;
      line-height: 50px;
      text-align: right;
      padding-right: 20px;
    }
  }
}
</style>