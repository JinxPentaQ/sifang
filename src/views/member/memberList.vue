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
        <el-form-item label="账号" prop="account" :label-width="labelWidth">
          <el-input
            v-model="filters.account"
            placeholder="账号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="user_name" :label-width="labelWidth">
          <el-input
            v-model="filters.user_name"
            placeholder="用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname" :label-width="labelWidth">
          <el-input
            v-model="filters.nickname"
            placeholder="昵称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="labelWidth">
          <el-input
            v-model="filters.phone"
            placeholder="电话"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="labelWidth">
          <el-input
            v-model="filters.email"
            placeholder="邮箱"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status" :label-width="labelWidth">
          <el-select v-model="filters.status" placeholder="类型" clearable>
            <el-option
              v-for="(item, index) in memberStatusOptions"
              :label="item.text"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="身份类型"
          prop="identity_type"
          :label-width="labelWidth"
        >
          <el-select
            v-model="filters.identity_type"
            placeholder="身份类型"
            clearable
          >
            <el-option
              v-for="(item, index) in identityTypeOptions"
              :label="item.text"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="身份证号"
          prop="identity_no"
          :label-width="labelWidth"
        >
          <el-input
            v-model="filters.identity_no"
            placeholder="身份证号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="是否身份认证"
          prop="auth_identity"
          :label-width="labelWidth"
        >
          <el-select
            v-model="filters.auth_identity"
            placeholder="是否身份认证"
            clearable
          >
            <el-option
              v-for="(item, index) in authIdentityOptions"
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
      <!--列表-->
      <el-table
        border
        :data="tableData"
        highlight-current-row
        v-loading="listLoading"
      >
        <el-table-column
          prop="nickname"
          label="昵称"
          align="left"
          min-width="100"
        />
        <el-table-column
          prop="user_name"
          label="用户名"
          align="left"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleInfo(scope.row.id)"
              size="mini"
              >{{ scope.row.user_name }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="账号"
          align="left"
          min-width="100"
        />
        <el-table-column
          prop="email"
          label="邮箱"
          align="left"
          min-width="100"
        />
        <el-table-column
          prop="type"
          label="类型"
          align="left"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ getOptionsText(memberTypeOptions, scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="auth_identity"
          label="身份类型"
          align="left"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ getOptionsText(identityTypeOptions, scope.row.identity_type) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="auth_identity"
          label="是否身份认证"
          align="left"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-tag :type="getOptionsTag(authIdentityOptions, scope.row.auth_identity)">
              <!-- <i :class="getOptionsItem(authIdentityOptions,  scope.row.auth_identity).icon"></i> -->
              {{ getOptionsText(authIdentityOptions, scope.row.auth_identity) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
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
                v-for="(item, i) in memberStatusOptions"
                :label="item.value"
                :key="i"
                >{{ item.text }}</el-radio
              >
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" fixed="right" min-width="140">
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
    <!--会员详情-->
    <el-dialog title="会员信息" :visible.sync="infoVisible" width="50%">
      <div class="info-item">
        <span>会员昵称</span>
        <span>{{ detail.nickname }}</span>
      </div>
      <div class="info-item">
        <span>会员状态</span>
        <el-tag :type="getOptionsTag(memberStatusOptions, detail.status)">{{
          getOptionsText(memberStatusOptions, detail.status)
        }}</el-tag>
      </div>
      <div class="info-item">
        <span>会员用户名</span>
        <span>{{ detail.user_name }}</span>
      </div>
      <div class="info-item">
        <span>会员手机号</span>
        <span>{{ detail.phone }}</span>
      </div>
      <div class="info-item">
        <span>会员邮箱</span>
        <span>{{ detail.email }}</span>
      </div>
      <div class="info-item">
        <span>是否身份认证</span>
        <el-tag :type="getOptionsTag(authIdentityOptions, detail.auth_identity)">
            <i :class="getOptionsItem(authIdentityOptions,  detail.auth_identity).icon"></i>
            {{ getOptionsText(authIdentityOptions, detail.auth_identity) }}
          </el-tag>
      </div>
      <div class="info-item">
        <span>身份类型</span>
        <span>{{ getOptionsText(identityTypeOptions, detail.identity_type) }}</span>
      </div>
      <div class="info-item">
        <span>备注</span>
        <span>{{ detail.remark }}</span>
      </div>
      <el-button type="text" size="mini" @click="handleResetPwd(detail.id)"
        >重置密码</el-button
      >
      <el-button type="text" size="mini" @click="handleResetGoogle(detail.id)"
        >重置Google密钥</el-button
      >
    </el-dialog>
  </section>
</template>

<script>
// import posAdmin from "./components/posAdmin.vue";
import {
  getsUser,
  getUser,
  modUserStatus,
  resetUserPwd,
  resetUserGA,
} from "@/api/member";
import { getOptionsText, getOptionsTag, getOptionsItem } from "@/utils/func";
import {
  memberType,
  memberTypeOptions,
  memberStatus,
  memberStatusOptions,
  identityType,
  identityTypeOptions,
  authIdentity,
  authIdentityOptions,
} from "@/utils/const";
export default {
  data() {
    return {
      filters: {
        account: "",
        user_name: "",
        nickname: "",
        phone: "",
        email: "",
        type: "",
        status: "",
        identity_type: "",
        identity_no: "",
        auth_identity: "",
        group_id: "",
      },
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      labelWidth: "100px",
      formLabelWidth: "120px",
      newsFormVisible: false,
      infoVisible: false,
      news: {}, //添加会员
      detail: {}, //会员基本信息
      memberType,
      memberTypeOptions,
      memberStatus,
      memberStatusOptions,
      identityType,
      identityTypeOptions,
      authIdentity,
      authIdentityOptions,
    };
  },
  methods: {
    getOptionsItem,
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
      getsUser({
        ...this.filters,
        page: this.page,
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
    // 修改会员状态
    handleStatusChange(status, row) {
      modUserStatus({ id: row.id, status }).then(() => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      });
    },
    // 查看详情
    handleInfo(id) {
      this.infoVisible = true;
      getUser({ id }).then((res) => {
        this.detail = res;
      });
    },
    // 重置密码
    handleResetPwd(id) {
      resetUserPwd({ id }).then(() => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
      });
    },
    // 重置谷歌密钥
    handleResetGoogle(id) {
      resetUserGA({ id }).then(() => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
      });
    },
    // 查看钱包
    handleWallet(id) {
      this.$router.push(`/memberWallet/${id}`)
    },
    handleWalletRecords(id) {
      this.$router.push(`/memberWalletRecords/${id}`)
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
      width: 100px;
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