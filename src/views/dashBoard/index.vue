<template>
  <div class="page-container">
    <el-row :gutter="40">
      <el-col :md="6" :xl="6">
        <div class="card-box first">
          <div class="left">
            <div class="name">代收成功数据</div>
            <small class="name-tips">Todays Order</small>
            <div class="value">{{ filterNumber(source.all.buy_total_success_amount)  || 0}}</div>
          </div>
          <div class="right">
            <img src="../../assets/arrow-graph-up-right.png" alt="" />
            up from
            <br />
            last month
          </div>
        </div>
      </el-col>
      <el-col :md="6" :xl="6">
        <div class="card-box second">
          <div class="left">
            <div class="name">代收成功订单/条</div>
            <small class="name-tips">sum number</small>
            <div class="value">{{ source.all.buy_total_success_orders }}</div>
          </div>
          <div class="right">
            <img src="../../assets/arrow-graph-up-right.png" alt="" />
            up from
            <br />
            last month
          </div>
        </div>
      </el-col>
      <el-col :md="6" :xl="6">
        <div class="card-box third">
          <div class="left">
            <div class="name">代付成功数据</div>
            <small class="name-tips">Monthly Deduction</small>
            <div class="value">{{ filterNumber(source.all.sell_total_success_amount) || 0}}</div>
          </div>
          <div class="right">
            <img src="../../assets/arrow-graph-up-right.png" alt="" />
            more than
            <br />
            last year
          </div>
        </div>
      </el-col>
      <el-col :md="6" :xl="6">
        <div class="card-box fourth">
          <div class="left">
            <div class="name">代收成功订单/条</div>
            <small class="name-tips">Weekly Revenue</small>
            <div class="value">{{ source.all.sell_total_success_orders || 0}}</div>
          </div>
          <div class="right">
            <img src="../../assets/arrow-graph-up-right.png" alt="" />
            more than
            <br />
            last year
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :md="6" :xl="6">
        <div class="card-box first">
          <div class="left">
            <div class="name">今日代收成功数据</div>
            <small class="name-tips">Todays Order</small>
            <div class="value">
              {{ filterNumber(source.today_buy.buy_total_success_amount) || 0}}
            </div>
          </div>
          <div class="right">
            <img src="../../assets/arrow-graph-up-right.png" alt="" />
            up from
            <br />
            last month
          </div>
        </div>
      </el-col>
      <el-col :md="6" :xl="6">
        <div class="card-box second">
          <div class="left">
            <div class="name">今日代收订单/成功订单</div>
            <small class="name-tips">sum number</small>
            <div class="value">
              {{ source.today_buy.buy_total_orders }} /
              {{ source.today_buy.buy_total_success_orders }}
            </div>
          </div>
          <div class="right">
            <img src="../../assets/arrow-graph-up-right.png" alt="" />
            up from
            <br />
            last month
          </div>
        </div>
      </el-col>
      <el-col :md="6" :xl="6">
        <div class="card-box third">
          <div class="left">
            <div class="name">今日代收订单成功率</div>
            <small class="name-tips">Monthly Deduction</small>
            <div class="value">{{ source.today_buy.buy_success_rate }}%</div>
          </div>
          <div class="right">
            <img src="../../assets/arrow-graph-up-right.png" alt="" />
            more than
            <br />
            last year
          </div>
        </div>
      </el-col>
      <el-col :md="6" :xl="6">
        <div class="card-box fourth">
          <div class="left">
            <div class="name">今日代收利润</div>
            <small class="name-tips">Weekly Revenue</small>
            <div class="value">{{ filterNumber(source.today_buy.buy_total_profit) || 0 }}</div>
          </div>
          <div class="right">
            <img src="../../assets/arrow-graph-up-right.png" alt="" />
            more than
            <br />
            last year
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :md="6" :xl="6">
        <div class="card-box first">
          <div class="left">
            <div class="name">今日代付成功数据</div>
            <small class="name-tips">Todays Order</small>
            <div class="value">
              {{ filterNumber(source.today_sell.sell_total_success_amount) || 0 }}
            </div>
          </div>
          <div class="right">
            <img src="../../assets/arrow-graph-up-right.png" alt="" />
            up from
            <br />
            last month
          </div>
        </div>
      </el-col>
      <el-col :md="6" :xl="6">
        <div class="card-box second">
          <div class="left">
            <div class="name">今日代付订单/成功订单</div>
            <small class="name-tips">sum number</small>
            <div class="value">
              {{ source.today_sell.sell_total_orders }} /
              {{ source.today_sell.sell_total_success_orders }}
            </div>
          </div>
          <div class="right">
            <img src="../../assets/arrow-graph-up-right.png" alt="" />
            up from
            <br />
            last month
          </div>
        </div>
      </el-col>
      <el-col :md="6" :xl="6">
        <div class="card-box third">
          <div class="left">
            <div class="name">今日代付订单成功率</div>
            <small class="name-tips">Monthly Deduction</small>
            <div class="value">{{ source.today_sell.sell_success_rate }}%</div>
          </div>
          <div class="right">
            <img src="../../assets/arrow-graph-up-right.png" alt="" />
            more than
            <br />
            last year
          </div>
        </div>
      </el-col>
      <el-col :md="6" :xl="6">
        <div class="card-box fourth">
          <div class="left">
            <div class="name">今日代付利润</div>
            <small class="name-tips">Weekly Revenue</small>
            <div class="value">{{ filterNumber(source.today_sell.sell_total_profit) || 0 }}</div>
          </div>
          <div class="right">
            <img src="../../assets/arrow-graph-up-right.png" alt="" />
            more than
            <br />
            last year
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="box-wapper" v-if="walletList.length > 0">
      <div class="box" v-for="(item, index) in walletList" :key="index">
        <div class="box-title">{{ item.platform_name }}</div>
        <div class="empty" v-if="item.platform_wallet.length <= 0">
          暂无数据
        </div>
        <div v-else>
          <div
            class="box-content"
            v-for="(wallet, walletIndex) in item.platform_wallet"
            :key="walletIndex"
          >
            <div class="name">{{ wallet.currency_name }}</div>
            <div class="amount">{{ filterNumber(wallet.balance_fee) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHomeReport, getHomeWallet } from "@/api/dashBoard";
import { filterNumber } from "@/utils/func";
export default {
  data() {
    return {
      source: {},
    };
  },
  methods: {
    filterNumber,
    // 获取首页数据
    getData() {
      this.listLoading = true;
      getHomeReport().then((res) => {
        this.source = { ...res };
      });
    },
    getWallet() {
      getHomeWallet().then((res) => {
        this.walletList = res;
      });
    },
  },
  created() {
    this.getData();
    this.getWallet();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0 !important;
}
.el-row {
  padding-bottom: 40px;
}
.card-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 12px;
  padding: 20px;
  border-radius: 4px;
  .left {
    .name {
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      font-weight: 400;
    }
    .value {
      height: 40px;
      line-height: 40px;
      font-size: 24px;
    }
  }
  .right {
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    img {
      width: 18px;
      height: 18px;
      vertical-align: bottom;
    }
  }
}
.card-box.first {
  background-color: #7460ee;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
}
.card-box.second {
  background-color: #26c6da;
}
.card-box.third {
  background-color: #1e88e5;
}
.card-box.fourth {
  background-color: #fc4b6c;
}
.card-box-yesterday {
  display: flex;
  align-items: center;
  color: #67757c;
  background: #fff;
  font-size: 12px;
  padding: 20px;
  border-radius: 4px;
  .left {
    width: 70px;
    height: 70px;
    text-align: center;
    font-size: 30px;
    line-height: 74px;
    background: rgba(0, 0, 0, 0.2);
    margin-right: 20px;
    border-radius: 4px;
    .el-icon-coin,
    .el-icon-goods,
    .el-icon-notebook-1,
    .el-icon-data-line {
      color: #fff;
    }
  }
  .right {
    .name {
      line-height: 24px;
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 300;
    }
    .value {
      font-weight: 300;
      font-size: 21px;
      line-height: 32px;
    }
  }
}
.card-box-yesterday.first {
  .left {
    background: #1e88e5;
  }
}
.card-box-yesterday.second {
  .left {
    background: #26c6da;
    border-radius: 50%;
  }
}
.card-box-yesterday.third {
  .left {
    background: #7460ee;
  }
}
.card-box-yesterday.fourth {
  .left {
    background: #fc4b6c;
  }
}
.box-wapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  .box {
    flex: 1;
    width: calc(100% - 120px) / 4 !important;
    min-width: calc((100% - 120px) / 4);
    max-width: calc((100% - 120px) / 4);
    background-color: #fff;
    margin-right: 40px;
    margin-bottom: 40px;
    border-radius: 4px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
    .box-title {
      color: #67757c;
      font-size: 18px;
      font-weight: 400;
      white-space: nowrap;
      padding: 12px 20px;
      border-bottom: 1px solid rgba(97, 106, 120, 0.07);
    }
    .box-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 20px;
      font-size: 14px;
      color: #67757c;
      。
      .amount {
        height: 20px;
        line-height: 20px;
        color: #fff !important;
        font-size: 12px;
        text-align: center;
        white-space: nowrap;
        padding: 2px 8px;
        text-align: center;
        white-space: nowrap;
        border-radius: 4px;
        background-color: #1e88e5;
      }
    }
    .empty {
      color: #67757c;
      text-align: center;
      margin-top: 20px;

    }
  }
  .box:nth-child(4n) {
    /* 去除第3n个的margin-right */
    margin-right: 0;
  }
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