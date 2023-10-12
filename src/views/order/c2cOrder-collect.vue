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
        <el-form-item
          label="外部单号"
          prop="ext_order_no"
          :label-width="labelWidth"
        >
          <el-input
            v-model="filters.ext_order_no"
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
        <!-- <el-form-item label="支付方式" prop="type" :label-width="labelWidth">
          <el-select v-model="filters.type" placeholder="支付方式" clearable>
            <el-option
              v-for="(item, index) in orderTypeOptions"
              :label="item.text"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item> -->
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
            <el-button type="primary" size="mini" @click="search"
              >搜索
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type size="mini" @click="resetForm">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-col>

    <div class="tableDivs">
      <div class="toolNav">
        <div class="toolTotal">
          <div class="totalItem">
            今日成功交易总额：
            <div class="totalValue totalAmount">
              {{ orderTotalInfo.total_success_amount || 0 }}元
            </div>
          </div>
          <div class="totalItem">
            今日成功交易笔数：
            <div class="totalValue totalCount">
              {{ orderTotalInfo.success_count || 0 }}笔
            </div>
          </div>
          <div class="totalItem">
            今日实际到账：
            <div class="totalValue totalReal">
              {{ orderTotalInfo.reality_amount || 0 }}元
            </div>
          </div>
          <div class="totalItem">
            今日失败笔数：
            <div class="totalValue totalError">
              {{ orderTotalInfo.failure_count || 0 }}笔
            </div>
          </div>
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
          prop="order_no"
          label="订单ID"
          align="left"
          min-width="130"
        >
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.order_no" placement="top">
              <p>{{ scope.row.order_no }}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="order_no"
          label="外部单号"
          align="left"
          min-width="130"
        >
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.ext_order_no" placement="top">
              <p>{{ scope.row.ext_order_no }}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="channel_name"
          label="通道名称"
          align="left"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          align="left"
          min-width="60"
        >
          <template slot-scope="scope">
            {{ getOptionsText(orderStatusOptions, scope.row.status) }}
          </template>
        </el-table-column>

        <el-table-column
          prop="buyer_user_name"
          label="商户"
          align="left"
        ></el-table-column>
        <el-table-column prop="buy_amount" label="金额" align="left">
          <template slot-scope="scope">
            {{ filterNumber(scope.row.buy_amount) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="buy_currency_code"
          label="货币"
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
              >详情
            </el-button>
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
        <div class="infoOperate">
          <el-button
            type="primary"
            size="mini"
            @click="orderCallBack(detail.id)"
            >订单回调
          </el-button>
          <el-button
            v-show="detail.status === 7"
            type="primary"
            size="mini"
            @click="orderReConfirm(detail.id)"
            >补单
          </el-button>
          <el-button
            v-show="detail.status > 7"
            type="primary"
            size="mini"
            @click="orderBack(detail.id)"
            >退单
          </el-button>
        </div>
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
          <span>交易手续费</span>
          <span>{{ filterNumber(detail.exchange_rates) }}</span>
        </div>
        <div class="info-item">
          <span>卖方</span>
          <span>{{ detail.seller_user_name }}</span>
        </div>
        <div class="info-item">
          <span>卖出金额</span>
          <span>{{ filterNumber(detail.sell_amount) }}</span>
        </div>
        <div class="info-item">
          <span>卖出手续费</span>
          <span>{{ filterNumber(detail.sell_fee) }}</span>
        </div>
        <div class="info-item">
          <span>卖出手续费率</span>
          <span>{{ filterNumber(detail.sell_fee_rate) }}</span>
        </div>
        <div class="info-item">
          <span>卖出币种</span>
          <span>{{ detail.sell_currency_code }}</span>
        </div>
        <div class="info-item">
          <span>卖出通知时间</span>
          <span>{{ detail.sell_notify_time }}</span>
        </div>
        <div class="info-item">
          <span>卖出通知内容</span>
          <span>{{ detail.sell_notify_content }}</span>
        </div>
        <div class="info-item">
          <span>卖出回调状态</span>
          <span>
            {{
              getOptionsText(orderNotifyStatus, detail.sell_notify_status)
            }}</span
          >
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
import {
  getOrders,
  getOrder,
  pushOrder,
  reconfirmOrder,
  backOrder,
  getOrderStatistics,
} from "@/api/order";
import {
  orderStatusOptions,
  orderTypeOptions,
  orderNotifyStatus,
  c2cOrderType,
} from "@/utils/const";
import { getOptionsText, filterNumber } from "@/utils/func";

export default {
  data() {
    return {
      //筛选
      filters: {
        type: "1",
        status: "",
        order_no: "",
        ext_order_no: "",
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
      orderNotifyStatus,
      orderTotalInfo: {},
    };
  },
  methods: {
    getOptionsText,
    filterNumber,
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
    // 搜索
    search() {
      this.pageSize = 10;
      this.page = 1;
      this.getList();
    },
    // 获取提现订单列表
    getList() {
      this.listLoading = true;
      getOrders({
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
    //详情
    handleDetail(id) {
      this.infoVisible = true;
      getOrder({ id: `${id}` })
        .then((res) => {
          this.detail = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    orderCallBack(id) {
      pushOrder({ id }).then((res) => {
        this.infoVisible = false;
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.getList();
      });
    },
    orderReConfirm(id) {
      reconfirmOrder({ id }).then((res) => {
        this.infoVisible = false;
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.getList();
      });
    },
    orderBack(id) {
      backOrder({ id }).then((res) => {
        this.infoVisible = false;
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.getList();
      });
    },
    getOrderTotal() {
      getOrderStatistics({ type: c2cOrderType.collect }).then((res) => {
        this.orderTotalInfo = res;
      });
    },
  },
  mounted() {
    this.getList();
    this.getOrderTotal();
  },
};
</script>

<style lang="scss" scoped>
.toolNav {
  .toolTotal {
    display: flex;
    color: #67757c;
    font-size: 14px;
    padding: 8px;
    .totalItem {
      display: flex;
      align-items: center;
    }
    .totalValue {
      height: 20px;
      line-height: 20px;
      color: #fff !important;
      font-size: 12px;
      text-align: center;
      white-space: nowrap;
      margin-right: 10px;
      padding: 2px 8px;
      text-align: center;
      white-space: nowrap;
      border-radius: 4px;
    }
    .totalAmount {
      background: #fc4b6c;
    }
    .totalCount {
      background-color: #1e88e5;
    }
    .totalReal {
      background-color: #009688;
    }
    .totalError {
      background-color: #ff5722;
    }
  }
}
.el-button + .el-button {
  margin-left: 0 !important;
}

.el-dialog__body {
  .infoOperate {
    margin-bottom: 20px;
  }
  .info-item {
    border: 1px solid #e2e2e2;
    border-bottom: none;
    span:nth-child(1) {
      display: inline-block;
      width: 100px;
      font-weight: 700;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding-left: 10px;
      border-right: 1px solid #e2e2e2;
    }
    span:nth-child(2) {
      padding-left: 10px;
    }
  }
  .info-item:last-child{
    border-bottom: 1px solid #e2e2e2;
  }
}
</style>