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
        <el-form-item label="订单ID" prop="order_no" :label-width="labelWidth">
          <el-input
            v-model="filters.order_no"
            placeholder="订单ID"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="status" :label-width="labelWidth">
          <el-select
            v-model="filters.status"
            placeholder="订单状态"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="(item, index) in orderStatusOptions"
              :label="item.text"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式" prop="type" :label-width="labelWidth">
          <el-select v-model="filters.type" placeholder="支付方式" clearable>
            <el-option
              v-for="(item, index) in orderTypeOptions"
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
        <el-table-column prop="order_no" label="订单ID" align="left">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.order_no" placement="top">
              <p>{{ scope.row.order_no }}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="channel_currency_name" label="通道名称" align="left">
        </el-table-column>
        <el-table-column
          prop="buy_fee"
          label="买方手续费"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="buy_fee_rate"
          label="买方手续费率"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="buy_amount"
          label="买入金额"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="buy_currency_id"
          label="买入货币类型"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="channel_code"
          label="通道代码"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="exchange_rates"
          label="交易费率"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          align="left"
          min-width="120"
        >
          <template slot-scope="scope">
            {{ getOptionsText(orderStatusOptions, scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="支付方式"
          align="left"
          min-width="120"
        >
          <template slot-scope="scope">
            {{ getOptionsText(orderTypeOptions, scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="seller_user_name"
          label="卖方"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="sell_fee"
          label="卖方手续费"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="sell_fee_rate"
          label="卖方手续费率"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="sell_amount"
          label="卖出金额"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="sell_currency_code"
          label="卖出货币类型"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="update_time"
          label="更新时间"
          align="left"
        ></el-table-column>
        <el-table-column
          label="操作"
          align="left"
          min-width="100"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleDetail(scope.row.id)"
              >详情</el-button
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
      <!--订单详情-->
      <el-dialog title="订单详情" :visible.sync="infoVisible" width="50%">
        <div class="info-item">
          <span>订单类型</span>
          <span> {{ getOptionsText(orderTypeOptions, detail.type) }}</span>
        </div>
        <div class="info-item">
          <span>订单状态</span>
          <span>{{ getOptionsText(orderStatusOptions, detail.status) }}</span>
        </div>
        <div class="info-item">
          <span>通道Code</span>
          <span>{{ detail.channel_code }}</span>
        </div>
        <div class="info-item">
          <span>买方</span>
          <span>{{ detail.buyer_user_name }}</span>
        </div>
        <div class="info-item">
          <span>买入金额</span>
          <span>{{ detail.buy_amount }}</span>
        </div>
        <div class="info-item">
          <span>买入手续费</span>
          <span>{{ detail.buy_amount }}</span>
        </div>
        <div class="info-item">
          <span>买入手续费率</span>
          <span>{{ detail.buy_amount }}</span>
        </div>
        <div class="info-item">
          <span>买入币种</span>
          <span>{{ detail.buy_currency_id }}</span>
        </div>
        <div class="info-item">
          <span>交易手续费</span>
          <span>{{ detail.exchange_rates }}</span>
        </div>
        <div class="info-item">
          <span>卖方</span>
          <span>{{ detail.seller_user_name }}</span>
        </div>
        <div class="info-item">
          <span>卖出金额</span>
          <span>{{ detail.sell_amount }}</span>
        </div>
        <div class="info-item">
          <span>卖出手续费</span>
          <span>{{ detail.sell_fee }}</span>
        </div>
        <div class="info-item">
          <span>卖出手续费率</span>
          <span>{{ detail.sell_fee_rate }}</span>
        </div>
        <div class="info-item">
          <span>卖出币种</span>
          <span>{{ detail.sell_currency_id }}</span>
        </div>
        <div class="info-item">
          <span>备注</span>
          <span>{{ detail.remark }}</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getOrders, getOrder } from "@/api/order";
import { orderStatusOptions, orderTypeOptions } from "@/utils/const";
import { getOptionsText } from "@/utils/func";
export default {
  data() {
    return {
      //筛选
      filters: {
        type: "",
        status: "",
        order_no: "",
      },
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      labelWidth: "100px",
      formLabelWidth: "200px",
      listLoading: false,
      infoVisible: false,
      detail: {},
      orderStatusOptions,
      orderTypeOptions,
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
      getOrders({
        ...this.filters,
        offset: this.page,
        limit: this.pageSize,
      })
        .then((res) => {
          this.listLoading = false;
          this.tableData = res.items;
          this.totalNum = res.allnum;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //详情
    handleDetail(id) {
      this.infoVisible = true;
      getOrder({ id })
        .then((res) => {
          this.detail = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0 !important;
}
.el-dialog__body {
  .info-item {
    span:nth-child(1) {
      width: 120px;
      display: inline-block;
      font-weight: 700;
      font-size: 14px;
      color: #606266;
      line-height: 30px;
      text-align: right;
      padding-right: 20px;
    }
  }
}
</style>