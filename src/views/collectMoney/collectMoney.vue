<template>
  <div class="page-container">
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
        <el-form-item prop="user_id" label="用户" :label-width="labelWidth">
          <el-select v-model="filters.user_id" placeholder="用户" clearable>
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.nickname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status" :label-width="labelWidth">
          <el-select
            v-model="filters.status"
            placeholder="状态"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="(item, index) in confirmExchangOrderStatus"
              :label="item.text"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="currency_id" label="币种" :label-width="labelWidth">
          <el-select v-model="filters.currency_id" placeholder="币种" clearable>
            <el-option
              v-for="item in currencyList"
              :key="item.id"
              :label="item.currency_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="channel_id" label="通道" :label-width="labelWidth">
          <el-select v-model="filters.channel_id" placeholder="通道" clearable>
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.channel_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="channel_currency_id"
          label="通道货币"
          :label-width="labelWidth"
        >
          <el-select
            v-model="filters.channel_currency_id"
            placeholder="通道货币"
            clearable
          >
            <el-option
              v-for="item in channelCurrencyList"
              :key="item.id"
              :label="item.channel_currency_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <div style="margin: 0 auto; width: 210px; float: right">
          <el-form-item>
            <el-button type="primary" size="mini" @click="getList"
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
        <el-table-column prop="user_name" label="用户名称" align="left"  width="120px"/>
        <el-table-column prop="user_account" label="用户账号" align="left"  width="120px"/>
        <el-table-column prop="status" label="状态" align="left">
          <template slot-scope="scope">
            {{ getOptionsText(confirmExchangOrderStatus, scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column prop="is_open" label="启用状态" align="left" width="100px">
          <template slot-scope="scope">
            {{ getOptionsText(openStatusOptions, scope.row.is_open) }}
          </template>
        </el-table-column>
        <el-table-column prop="min_amount" label="收款下限" align="left" />
        <el-table-column prop="max_amount" label="收款上限" align="left" />
        <el-table-column
          prop="channel_currency_name"
          label="通道币种名称"
          align="left"
        />
        <el-table-column prop="channel_name" label="通道名称" align="left"  width="180px"/>
        <el-table-column prop="currency_name" label="币种名称" align="left"  width="180px"/>
        <el-table-column prop="name" label="收款姓名" align="left"  width="180px"/>
        <el-table-column prop="account" label="收款账号" align="left"  width="180px"/>
        <el-table-column prop="organization" label="收款组织" align="left" />
        <el-table-column prop="address" label="组织地址" align="left" />
        <el-table-column prop="chain" label="链名称" align="left" />
        <el-table-column prop="remark" label="备注" align="left" />
        <el-table-column prop="day_amount" label="日收款金额" align="left" />
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="left"
          width="180px"
        ></el-table-column>
        <el-table-column
          label="操作"
          align="left"
          min-width="200"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleDelete(scope.row.id)"
            ></el-button>
            <el-button
              v-if="
                scope.row.status !== conExchangeStatusType.success ||
                scope.row.status !== conExchangeStatusType.final
              "
              type="primary"
              size="mini"
              @click="handleVerify(scope.row.id, conExchangeStatusType.success)"
              >通过</el-button
            >
            <el-button
              v-if="
                scope.row.status !== conExchangeStatusType.success ||
                scope.row.status !== conExchangeStatusType.final
              "
              type="danger"
              size="mini"
              @click="handleVerify(scope.row.id, conExchangeStatusType.final)"
              >拒绝</el-button
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
  </div>
</template>
<script>
import {
  getsReceiptInfo,
  configReceiptInfo,
  delReceiptInfo,
} from "@/api/collectMoney";
import {
  exchangeOrderTypeOptions,
  conExchangeStatusType,
  confirmExchangOrderStatus,
  openStatusOptions,
} from "@/utils/const";
import { getOptionsText } from "@/utils/func";
import { getsCurrency } from "@/api/currency";
import { getsChannelCurrency } from "@/api/currencyChannel";
import { getsChannel } from "@/api/channel";
import { getsUser } from "@/api/member";
export default {
  data() {
    return {
      //筛选
      filters: {
        type: "",
        status: "",
      },
      tableData: [],
      currencyList: [],
      channelCurrencyList: [],
      channelList: [],
      userList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      labelWidth: "100px",
      formLabelWidth: "200px",
      listLoading: false,
      exchangeOrderTypeOptions,
      conExchangeStatusType,
      confirmExchangOrderStatus,
      openStatusOptions,
    };
  },
  methods: {
    getOptionsText,
    //分页
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    // 分页N条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    // 重置
    resetForm() {
      this.$refs.filters.resetFields();
      this.getList();
    },

    // 获取列表
    getList() {
      this.listLoading = true;
      getsReceiptInfo({
        ...this.filters,
        offset: this.page,
        limit: this.pageSize,
      })
        .then((res) => {
          this.listLoading = false;
          this.tableData = res.items;
          this.totalNum = res.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //详情
    handleVerify(id, status) {
      const confirmText =
        stauts === conExchangeStatusType.success
          ? "确认审核通过？"
          : "确认审核拒绝？";
      this.$confirm(confirmText, "提示", {
        type: "warning",
      })
        .then(() => {
          configReceiptInfo({ id, status })
            .then(() => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.getList();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    //删除
    handleDelete(id) {
      this.$confirm("确认删除该信息吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.listLoading = true;
          delReceiptInfo({ id: `${id}` })
            .then((res) => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.listLoading = false;
              this.getList();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    // 获取货币列表
    getCurreny() {
      getsCurrency()
        .then((res) => {
          this.currencyList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取货币列表
    getChannelCurreny() {
      getsChannelCurrency()
        .then((res) => {
          this.channelCurrencyList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getChannelList() {
      getsChannel().then((res) => {
        this.channelList = res;
      });
    },
    getUserList() {
      getsUser({ offset: 1, limit: 100 }).then((res) => {
        this.userList = res.items;
      });
    },
  },
  mounted() {
    this.getList();
    this.getCurreny();
    this.getChannelCurreny();
    this.getChannelList();
    this.getUserList();
  },
};
</script>

<style scoped>
.el-button + .el-button {
  margin-left: 0 !important;
}
</style>
