<template>
  <div class="page-container">
    <el-row :gutter="40">
      <el-col :md="6" :xl="6">
        <div class="card-box first">
          <div class="left">
            <div class="name">平台成功总数据</div>
            <small class="name-tips">Todays Order</small>
            <div class="value">{{ source.all.total_success_amount }}</div>
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
            <div class="name">平台成功总订单/条</div>
            <small class="name-tips">sum number</small>
            <div class="value">{{ source.all.total_success_orders }}</div>
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
            <div class="name">订单成功率</div>
            <small class="name-tips">Monthly Deduction</small>
            <div class="value">{{ source.all.success_rate }}</div>
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
            <div class="name">平台总利润</div>
            <small class="name-tips">Weekly Revenue</small>
            <div class="value">{{ source.all.total_profit }}</div>
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
            <div class="name">今日平台成功总数据</div>
            <small class="name-tips">Todays Order</small>
            <div class="value">{{ source.today.total_success_amount }}</div>
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
            <div class="name">今日平台成功总订单/条</div>
            <small class="name-tips">sum number</small>
            <div class="value">{{ source.today.total_success_orders }}</div>
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
            <div class="name">今日订单成功率</div>
            <small class="name-tips">Monthly Deduction</small>
            <div class="value">{{ source.today.success_rate }}</div>
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
            <div class="name">今日平台总利润</div>
            <small class="name-tips">Weekly Revenue</small>
            <div class="value">{{ source.today.total_profit }}</div>
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
        <div class="card-box-yesterday first">
          <div class="left">
            <i class="el-icon-coin"></i>
          </div>
          <div class="right">
            <div class="name">昨日平台成功总数据</div>
            <div class="value">{{ source.yesterday.total_success_amount }}</div>
          </div>
        </div>
      </el-col>
      <el-col :md="6" :xl="6">
        <div class="card-box-yesterday second">
          <div class="left">
            <i class="el-icon-notebook-1"></i>
          </div>
          <div class="right">
            <div class="name">昨日平台成功总订单/条</div>
            <div class="value">{{ source.yesterday.total_success_orders }}</div>
          </div>
        </div>
      </el-col>
      <el-col :md="6" :xl="6">
        <div class="card-box-yesterday third">
          <div class="left">
            <i class="el-icon-goods"></i>
          </div>
          <div class="right">
            <div class="name">昨日订单成功率</div>
            <div class="value">{{ source.yesterday.success_rate }}</div>
          </div>
        </div>
      </el-col>
      <el-col :md="6" :xl="6">
        <div class="card-box-yesterday fourth">
          <div class="left">
            <i class="el-icon-data-line"></i>
          </div>
          <div class="right">
            <div class="name">昨日平台总利润</div>
            <div class="value">{{ source.yesterday.total_profit }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getHomeReport } from "@/api/dashBoard";
export default {
  data() {
    return {
      source: {},
    };
  },
  methods: {
    // 获取首页数据
    getData() {
      this.listLoading = true;
      getHomeReport().then((res) => {
        this.source = { ...res };
      });
    },
  },
  created() {
    this.getData();
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
    background: rgba(0, 0, 0, .2);
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