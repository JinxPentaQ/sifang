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
        <el-form-item label="订单状态" prop="status" :label-width="labelWidth">
          <el-select
            v-model="filters.status"
            placeholder="订单状态"
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
        <el-form-item label="类型" prop="type" :label-width="labelWidth">
          <el-select v-model="filters.type" placeholder="类型" clearable>
            <el-option
              v-for="(item, index) in exchangeOrderTypeOptions"
              :label="item.text"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="交易时间" prop="date" :label-width="labelWidth">
          <el-date-picker
            v-model="filters.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
        </el-form-item> -->
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
        <el-table-column prop="id" label="订单ID" align="left">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.id" placement="top">
              <p>{{ scope.row.id }}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="left">
          <template slot-scope="scope">
            {{ getOptionsText(exchangeOrderTypeOptions, scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="名称"
          align="left"
        ></el-table-column>
        <el-table-column prop="status" label="状态" align="left">
          <template slot-scope="scope">
            {{ getOptionsText(confirmExchangOrderStatus, scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="rate"
          label="费率"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="from_currency_name"
          label="初始货币类型"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="to_currency_name"
          label="兑换后货币类型"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="desc"
          label="备注"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="left"
        ></el-table-column>
        <el-table-column
          label="操作"
          align="left"
          min-width="120"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleVerify(scope.row.id, conExchangeStatusType.success)"
              :disabled="scope.row.status === conExchangeStatusType.success || scope.row.status === conExchangeStatusType.final"
              >通过</el-button
            >
            <el-button
              type="danger"
              size="mini"
              :disabled="scope.row.status === conExchangeStatusType.success || scope.row.status === conExchangeStatusType.final"
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
import { getsExchangeOrder, configExchangeOrder } from "@/api/order";
import {
  exchangeOrderTypeOptions,
  conExchangeStatusType,
  confirmExchangOrderStatus,
} from "@/utils/const";
import { getOptionsText } from "@/utils/func";
export default {
  data() {
    return {
      //筛选
      filters: {
        type: "",
        status: "",
      },
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      labelWidth: "100px",
      formLabelWidth: "200px",
      listLoading: false,
      exchangeOrderTypeOptions,
      conExchangeStatusType,
      confirmExchangOrderStatus,
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

    // 获取提现订单列表
    getList() {
      this.listLoading = true;
      getsExchangeOrder({
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
          ? "确认审核通过该订单？"
          : "确认审核拒绝该订单？";
      this.$confirm(confirmText, "提示", {
        type: "warning",
      })
        .then(() => {
          configExchangeOrder({ id, status })
            .then(() => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.getUsers();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
.el-button + .el-button {
  margin-left: 0 !important;
}
</style>
