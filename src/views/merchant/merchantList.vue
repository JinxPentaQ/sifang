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
        <el-form-item
          label="商户ID"
          prop="business_no"
          :label-width="labelWidth"
        >
          <el-input
            v-model="filters.business_no"
            placeholder="商户ID"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商户名称"
          prop="business_no"
          :label-width="labelWidth"
        >
          <el-input
            v-model="filters.name"
            placeholder="商户名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商户账户"
          prop="business_no"
          :label-width="labelWidth"
        >
          <el-input
            v-model="filters.account"
            placeholder="商户账户"
            clearable
          ></el-input>
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
          prop="business_no"
          label="商户编号"
          align="left"
          min-width="100"
        />
        <el-table-column
          prop="business_name"
          label="商户名称"
          align="left"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-s-home"
              @click="handleInfo(scope.row.id)"
              size="mini"
              >{{ scope.row.business_name }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="商户账号"
          align="left"
          min-width="100"
        />
        <el-table-column
          prop="private_key"
          label="密钥"
          align="left"
          min-width="100"
        ></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-switch
              :inactive-value="0"
              :active-value="1"
              v-model="scope.row.status"
              @change="handleStatusChange($event, scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="left"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="left"
          min-width="100"
        ></el-table-column>
        <el-table-column
          label="操作"
          align="left"
          fixed="right"
          min-width="100"
        >
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
              >钱包记录</el-button>
            <el-button
              type="text"
              size="mini"
              icon="el-icon-s-shop"
              @click="handleCurrenyChannel(scope.row.id)"
              >通道配置</el-button
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
    <el-dialog title="添加商户" :visible.sync="newsFormVisible" width="50%">
      <el-form :model="news" ref="news" :rules="rules">
        <el-form-item
          prop="name"
          label="商户名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="news.name"></el-input>
        </el-form-item>
        <el-form-item
          prop="account"
          label="商户账号"
          :label-width="formLabelWidth"
        >
          <el-input v-model="news.account"></el-input>
        </el-form-item>
        <el-form-item prop="account" label="备注" :label-width="formLabelWidth">
          <el-input v-model="news.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="handleAdd('news')"
          >确定</el-button
        >
        <el-button size="mini" @click="newsFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!--商户详情-->
    <el-dialog title="商户信息" :visible.sync="infoVisible" width="50%">
      <div class="info-item">
        <span>商户编号</span>
        <span>{{ detail.business_no }}</span>
      </div>
      <div class="info-item">
        <span>商户名称</span>
        <span>{{ detail.business_name }}</span>
      </div>
      <div class="info-item">
        <span>商户状态</span>
        <el-tag
          :type="detail.status === merchantStatus.open ? 'success' : 'info'"
          >{{ getOptionsText(merchantStatusOptions, detail.status) }}</el-tag
        >
      </div>
      <div class="info-item">
        <span>商户账号</span>
        <span>{{ detail.account }}</span>
      </div>
      <div class="info-item">
        <span>密钥</span>
        <span>{{ detail.private_key }}</span>
      </div>
      <div class="info-item">
        <span>备注</span>
        <span>{{ detail.remark }}</span>
      </div>
      <el-button
        type="text"
        size="mini"
        @click="handleResetPwd(detail.id, '0')"
        >重置密码</el-button
      >
      <el-button
        type="text"
        size="mini"
        @click="handleResetSerect(detail.id)"
        >重置密钥</el-button
      >
      <el-button
        type="text"
        size="mini"
        @click="handleResetGoogle(detail.id, '1')"
        >重置Google密钥</el-button
      >
    </el-dialog>
  </section>
</template>

<script>
// import posAdmin from "./components/posAdmin.vue";
import {
  getsBusiness,
  getBusiness,
  addBusiness,
  modBusinessStatus,
  resetBusinessPwd,
  resetBusinessPK,
  resetBusinessGA,
  getBusinessWallet,
} from "@/api/merchant";
import { getOptionsText } from "@/utils/func";
import { merchantStatusOptions, merchantStatus } from "@/utils/const";
export default {
  components: {
    // posAdmin,
  },
  data() {
    return {
      filters: {
        business_no: "",
        name: "",
        account: "",
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
      //添加商户
      news: {},
      //商户基本信息
      detail: {},
      bindFormVisible: false,
      rules: {
        name: [
          { required: true, message: "请输入商户名称！", trigger: "blur" },
        ],
        account: [
          { required: true, message: "请输入商户账号！", trigger: "blur" },
        ],
      },
      merchantStatusOptions,
      merchantStatus,
    };
  },
  methods: {
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
      getsBusiness({
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
    //添加商户
    handleAdd(formName) {
      this.listLoading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addBusiness(this.news)
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
    // 修改商户状态
    handleStatusChange(status, row) {
      modBusinessStatus({ id: row.id, status }).then(() => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      });
    },
    // 查看详情
    handleInfo(id) {
      this.infoVisible = true;
      getBusiness({ id }).then((res) => {
        this.detail = res;
      });
    },
    // 重置密码
    handleResetPwd(id) {
      resetBusinessPwd({ id }).then((res) => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
      });
    },
    //重置秘钥
    handleResetSerect(id) {
      resetBusinessPK({ id }).then((res) => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
      });
    },
    // 重置谷歌密钥
    handleResetGoogle(id) {
      resetBusinessGA({ id }).then((res) => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
      });
    },
    // 查看钱包
    handleWallet(id) {
      this.$router.push(`/merchantWallet/${id}`);
    },
    handleWalletRecords(id) {
      this.$router.push(`/merchantWalletRecords/${id}`);
    },
    // 通道设置
    handleCurrenyChannel(id) {
      this.$router.push(`/merchantChannel/${id}`);
    },
    getOptionsText,
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