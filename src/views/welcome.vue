<template>
  <section>
    
    <h2>欢迎登录！</h2>
    <!-- <el-row :gutter="70">
      <el-col :span="6" v-for="item in cardData" :key="item.icon">
        <el-card shadow="always" :style="{'background-color':item.bgColor}" class="card_item">
          <div class="card_img">
            <img :src="item.icon" alt />
          </div>
          <div class="card_div">
            <p class="card_title">{{item.name}}</p>
            <span class="card_content">{{item.value}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="70">
      <el-col :span="6" v-for="item in cardDataP" :key="item.icon">
        <el-card shadow="always" :style="{'background-color':item.bgColor}" class="card_itemP">
          <div class="card_img">
            <img :src="item.icon" alt />
          </div>
          <div class="card_div">
            <p class="card_title">{{item.name}}</p>
            <span class="card_content">{{item.value}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="padding-top:30px;">
      <div class="amount-row">
        <div style="border-bottom: 1px solid #F2F6FC;">
          <span>{{checkAmount.allamount}}元/{{checkAmount.allcount}}笔</span>
          <p>今日总交易量/总笔数</p>
        </div>
        <div style="border-bottom: 1px solid #F2F6FC;">
          <span>{{checkAmount.payamount}}元/{{checkAmount.paycount}}笔</span>
          <p>成功总计/成功笔数</p>
        </div>
        <div>
          <el-progress
            :stroke-width="15"
            :percentage="checkAmount.paypercent"
            color="#e6a23c"
            :text-inside="true"
          ></el-progress>
          <p>成功率</p>
        </div>
      </div>
      <div class="amount-right">
        <div class="amount-one" style="border-bottom: 1px solid #F2F6FC;">
          <div class="amount-one-div">
            <span>{{checkAmount.allwxamount}}元/{{checkAmount.allwxcount}}笔</span>
            <p>微信总交易量/总笔数</p>
          </div>
          <div class="amount-one-div">
            <span>{{checkAmount.paywxamount}}元/{{checkAmount.paywxcount}}笔</span>
            <p>微信总计/成功笔数</p>
          </div>
          <div>
            <el-progress
              :text-inside="true"
              :stroke-width="15"
              :percentage="checkAmount.paywxpercent"
              color="#67c23a"
            ></el-progress>
            <p>微信成功率</p>
          </div>
        </div>
        <div class="amount-one" style="border-bottom: 1px solid #F2F6FC;">
          <div class="amount-one-div">
            <span>{{checkAmount.allaliamount}}元/{{checkAmount.allalicount}}笔</span>
            <p>支付宝总交易量/总笔数</p>
          </div>
          <div class="amount-one-div">
            <span>{{checkAmount.payaliamount}}元/{{checkAmount.payalicount}}笔</span>
            <p>支付宝成功总计/成功笔数</p>
          </div>
          <div>
            <el-progress
              :stroke-width="15"
              :percentage="checkAmount.payalipercent"
              color="#409eff"
              :text-inside="true"
            ></el-progress>
            <p>支付宝成功率</p>
          </div>
        </div>
        <div class="amount-one">
          <div class="amount-one-div">
            <span>{{checkAmount.allbankamount}}元/{{checkAmount.allbankcount}}笔</span>
            <p>银行卡总交易量/总笔数</p>
          </div>
          <div class="amount-one-div">
            <span>{{checkAmount.paybankamount}}元/{{checkAmount.paybankcount}}笔</span>
            <p>银行卡成功总计/成功笔数</p>
          </div>
          <div>
            <el-progress
              :stroke-width="15"
              :percentage="checkAmount.paybankpercent"
              color="#e6a23c"
              :text-inside="true"
            ></el-progress>
            <p>银行卡成功率</p>
          </div>
        </div>
      </div>
      <div style="clear:both;"></div>
    </div>
    <el-row>
      <el-col :span="14" style="margin-top:25px;">
        <el-card class="box-card" style="height:100%;">

          <div slot="header" class="clearfix">
            <span>
              <strong>平台数据</strong>
            </span>
          </div>
          <el-table :data="tableData" height="350px" style="width: 95%;margin: 0 auto;margin-bottom:10px;">
            <el-table-column label="NO" width="180">
              <template slot-scope="scope">
                <span>{{scope.$index +1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="platform_name" label="平台名称" width="180"></el-table-column>
            <el-table-column prop="really_amount" sortable label="金额"></el-table-column>
            <el-table-column prop="percent" label="比例">
              <template slot-scope="scope">
                <el-progress
                  v-if="scope.row.percent > 90"
                  :text-inside="true"
                  :stroke-width="15"
                  :percentage="scope.row.percent"
                  status="success"
                ></el-progress>
                <el-progress
                  v-if="scope.row.percent < 90 && scope.row.percent>50"
                  :text-inside="true"
                  :stroke-width="15"
                  :percentage="scope.row.percent"
                  status="warning"
                ></el-progress>
                <el-progress
                  v-if="scope.row.percent < 50 && scope.row.percent>0"
                  :text-inside="true"
                  :stroke-width="15"
                  :percentage="scope.row.percent"
                  status="exception"
                ></el-progress>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8" :offset="1" style="margin-top:25px;">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>近12小时数据走势</span>
          </div>
          <div id="myChart" :style="{width: '100%', height: '360px'}"></div>
        </el-card>
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="7" style="height:350px;margin-top:25px;margin-bottom:50px;">
        <el-card shadow="always" class="box-card">
          <div slot="header" class="clearfix">
            <span>代收日数据量</span>
          </div>
          <div id="daishouDay" :style="{width: '100%', height: '350px'}"></div>
        </el-card>
      </el-col>
      <el-col :span="7" :offset="1" style="height:350px;margin-top:25px;">
        <el-card shadow="always" class="box-card">
          <div slot="header" class="clearfix">
            <span>代收周数据量</span>
          </div>
          <div id="daishouWeek" :style="{width: '100%', height: '350px'}"></div>
        </el-card>
      </el-col>
      <el-col :span="7" :offset="1" style="height:350px;margin-top:25px;margin-bottom:50px;">
        <el-card shadow="always" class="box-card">
          <div slot="header" class="clearfix">
            <span>代收月数据量</span>
          </div>
          <div id="daishouMonth" :style="{width: '100%', height: '350px'}"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7" style="height:350px;margin-top:25px;margin-bottom:50px;">
        <el-card shadow="always" class="box-card">
          <div slot="header" class="clearfix">
            <span>代付日数据量</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div id="daifuDay" :style="{width: '100%', height: '350px'}"></div>
        </el-card>
      </el-col>
      <el-col :span="7" :offset="1" style="height:350px;margin-top:25px;">
        <el-card shadow="always" class="box-card">
          <div slot="header" class="clearfix">
            <span>代付周数据量</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div id="daifuWeek" :style="{width: '100%', height: '350px'}"></div>
        </el-card>
      </el-col>
      <el-col :span="7" :offset="1" style="height:350px;margin-top:25px;margin-bottom:50px;">
        <el-card shadow="always" class="box-card">
          <div slot="header" class="clearfix">
            <span>代付月数据量</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div id="daifuMonth" :style="{width: '100%', height: '350px'}"></div>
        </el-card>
      </el-col>
    </el-row> -->
  </section>
</template>

<script>
import echarts from "echarts";
import Qs from "qs";
export default {
  data() {
    return {
      cardData: [
        {
          icon: "/static/icon/People.png",
          name: "接单员情况",
          value: "",
          bgColor: "#3F9EFF"
        },
        {
          icon: "/static/icon/EmptyWallet.png",
          name: "接单员账户总余额",
          value: "",
          bgColor: "#F1A00C"
        },
        {
          icon: "/static/icon/YenCoin.png",
          name: "接单员佣金总余额",
          value: "",
          bgColor: "#F46C6C"
        },
        {
          icon: "/static/icon/YenCoin1.png",
          name: "今日佣金提现金额",
          value: "",
          bgColor: "#67C23A"
        }
      ],
      cardDataP: [
        {
          icon: "/static/icon/Shop.png",
          name: "商户总数",
          value: "",
          bgColor: "#F2F6FC"
        },
        {
          icon: "/static/icon/CashPayment.png",
          name: "今日代收金额",
          value: "",
          bgColor: "#EBEEF5"
        },
        {
          icon: "/static/icon/ExtractMoney.png",
          name: "今日买币金额",
          value: "",
          bgColor: "#E4E7ED"
        },
        {
          icon: "/static/icon/CreditCardFront.png",
          name: "今日下发金额",
          value: "",
          bgColor: "#E4E7ED"
        },
        {
          icon: "/static/icon/Home.png",
          name: "今日交易商户",
          value: "",
          bgColor: "#F2F6FC"
        },
        {
          icon: "/static/icon/PayWithCash.png",
          name: "今日代付金额",
          value: "",
          bgColor: "#EBEEF5"
        },
        {
          icon: "/static/icon/InputMoney.png",
          name: "今日卖币金额",
          value: "",
          bgColor: "#E4E7ED"
        },
        {
          icon: "/static/icon/MultipleCreditCardFront.png",
          name: "商户未下发金额",
          value: "",
          bgColor: "#E4E7ED"
        }
      ],
      userAllNumber: "", //接单总人数
      userAllAmount: "", // 账户余额
      userGrabAmount: "", // 佣金余额
      userShareAmount: "", // 推广佣金
      platformAllNumber: "", //人数
      platformCol: "", //代收
      platformPayment: "", //代付
      platformOut: "", //今日下发
      all_present: "",
      tableData: [],
      checkAmount: {
        payalipercent: 0,
        paypercent: 0,
        paywxpercent: 0
      },
      hour: { // 每小时统计图表
        allamount: [],
        dateTime: []
      },
      days: {  // 日统计图表
        dayswxAmount: [],
        daysaliAmount: [],
        daysyunAmount: [],
        daysbankAmount: [],
        dateTime: []
      },
      weeks: { // 周统计图表
        weekswxAmount: [],
        weeksaliAmount: [],
        weeksyunAmount: [],
        weeksbankAmount: [],
        dateTime: []
      },
      months: { // 月统计图表
        monthwxAmount: [],
        monthaliAmount: [],
        monthyunAmount: [],
        monthbankAmount: [],
        dateTime: []
      }
      //下发
    };
  },
  methods: {
    //
    getUsers() {
      var _this = this;
      let param = {
        offset: "1",
        limit: "50"
      };
      param = this.sortObjByKey(param);
      let signAll = [];
      for (var prop in param) {
        signAll.push(param[prop]);
      }
      param.sign = this.$md5(signAll.join(""));
      _this.$http
        .post(
          this.GLOBAL.BASE_URL1 + "App.Admin_AdminController.GetHomeData",
          Qs.stringify(param),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        .then(res => {
          //第一行-------------------------------------------------
          //接单员情况
          this.cardData[0].value = res.data.data.userAlINumber.join("/");
          //接单员账户总余额
          this.cardData[1].value = Number(res.data.data.userAllAmount) / 100;
          //接单员佣金总余额
          this.cardData[2].value = Number(res.data.data.userGrabAmount) / 100;
          //今日佣金提现金额
          this.cardData[3].value = Number(res.data.data.outGrabAmount) / 100;
          // 第二行-------------------------------------------------------
          //商户总数
          this.cardDataP[0].value = res.data.data.platformAllNumber.join("/");
          //今日代收金额
          this.cardDataP[1].value = Number(res.data.data.platformTodayCol) / 100;
          //今日买币余额
          this.cardDataP[2].value = Number(res.data.data.todayUserBuy) / 100;
          //今日下发金额
          this.cardDataP[3].value = Number(res.data.data.platformTodayOut) / 100;
          // 第三行-------------------------------------------------------------
          //今日交易商户
          this.cardDataP[4].value = res.data.data.todayPlatformCount;
          //今日代付金额
          this.cardDataP[5].value = Number(res.data.data.platformTodayPayment) / 100;
          //今日卖币金额
          this.cardDataP[6].value = Number(res.data.data.todayProxySell) / 100;
          //商户未下发金额
          this.cardDataP[7].value = Number(res.data.data.platformAmount) / 100;

          this.all_present = Number(res.data.data.all_present) / 100;
          this.tableData = res.data.data.platform_present;

          for (let i in this.tableData) {
            this.tableData[i].really_amount = Number(this.tableData[i].really_amount) / 100;
            this.tableData[i].percent =
              Number(this.tableData[i].really_amount) / Number(this.all_present);
            this.tableData[i].percent = (
              this.tableData[i].percent * 100
            ).toFixed(2);
            this.tableData[i].percent = Number(this.tableData[i].percent);
          }
          this.tableData.sort(this.compare("amount"));

          // 今日统计成功率===========================================================================
          //今日总金额
          this.checkAmount.allamount = Number(res.data.data.today_data[0].allamount) / 100;
          //今日总笔数
          this.checkAmount.allcount = Number(res.data.data.today_data[0].allcount);
          //今日付款总笔数
          this.checkAmount.payamount = Number(res.data.data.today_data[0].payamount) / 100;
          //今日付款总金额
          this.checkAmount.paycount = Number(res.data.data.today_data[0].paycount);
          //今日支付宝总金额
          this.checkAmount.allaliamount = Number(res.data.data.today_data[0].allaliamount) / 100;
          //今日支付宝总笔数
          this.checkAmount.allalicount = Number(res.data.data.today_data[0].allalicount);
          //今日微信总金额
          this.checkAmount.allwxamount = Number(res.data.data.today_data[0].allwxamount) / 100;
          //今日微信总笔数
          this.checkAmount.allwxcount = Number(res.data.data.today_data[0].allwxcount);
          //今日银行卡总金额
          this.checkAmount.allbankamount = Number(res.data.data.today_data[0].allbankamount) / 100;
          //今日银行卡总笔数
          this.checkAmount.allbankcount = Number(res.data.data.today_data[0].allbankcount);
          //今日支付宝支付总金额
          this.checkAmount.payaliamount = Number(res.data.data.today_data[0].payaliamount) / 100;
          //今日支付宝支付笔数
          this.checkAmount.payalicount = Number(res.data.data.today_data[0].payalicount);
          //今日微信支付金额
          this.checkAmount.paywxamount = Number(res.data.data.today_data[0].paywxamount) / 100;
          //今日微信支付笔数
          this.checkAmount.paywxcount = Number(res.data.data.today_data[0].paywxcount);
          //今日银行卡支付金额
          this.checkAmount.paybankamount = Number(res.data.data.today_data[0].paybankamount) / 100;
          //今日银行卡支付笔数
          this.checkAmount.paybankcount = Number(res.data.data.today_data[0].paybankcount);

          //成功率计算
          if (this.checkAmount.allamount == 0) {
            this.checkAmount.paypercent = 0;
          } else {
            this.checkAmount.paypercent = Number(
              (
                Number(
                  this.checkAmount.payamount / this.checkAmount.allamount
                ) * 100
              ).toFixed(2)
            );
          }

          if (this.checkAmount.allwxamount == 0) {
            this.checkAmount.paywxpercent = 0;
          } else {
            this.checkAmount.paywxpercent = Number(
              (
                Number(
                  this.checkAmount.paywxamount / this.checkAmount.allwxamount
                ) * 100
              ).toFixed(2)
            );
          }
          if (this.checkAmount.allaliamount == 0) {
            this.checkAmount.payalipercent = 0;
          } else {
            this.checkAmount.payalipercent = Number(
              (
                Number(
                  this.checkAmount.payaliamount / this.checkAmount.allaliamount
                ) * 100
              ).toFixed(2)
            );
          }
          if (this.checkAmount.allbankamount == 0) {
            this.checkAmount.paybankpercent = 0;
          } else {
            this.checkAmount.paybankpercent = Number(
              (
                Number(
                  this.checkAmount.paybankamount /
                    this.checkAmount.allbankamount
                ) * 100
              ).toFixed(2)
            );
          }
          //代收
          // 日代收
          let hourAmount = res.data.data.hour_amount;
          for (let i in hourAmount) {
            this.hour.allamount.push(Number(hourAmount[i].allamount) / 100);
            this.hour.dateTime.push(hourAmount[i].dateTime);
          }
          // 日代收
          let daysAmount = res.data.data.days_amount;
          for (let i in daysAmount) {
            this.days.dayswxAmount.push(Number(daysAmount[i].wxamount) / 100);
            this.days.daysaliAmount.push(Number(daysAmount[i].aliamount) / 100);
            this.days.daysyunAmount.push(Number(daysAmount[i].yunamount) / 100);
            this.days.daysbankAmount.push(
              Number(daysAmount[i].bankamount) / 100
            );
            this.days.dateTime.push(daysAmount[i].dateTime);
          }
          //周代收
          let weeksAmount = res.data.data.weeks_amount;
          for (let j in weeksAmount) {
            this.weeks.weekswxAmount.push(
              Number(weeksAmount[j].wxamount) / 100
            );
            this.weeks.weeksaliAmount.push(
              Number(weeksAmount[j].aliamount) / 100
            );
            this.weeks.weeksyunAmount.push(
              Number(weeksAmount[j].yunamount) / 100
            );
            this.weeks.weeksbankAmount.push(
              Number(weeksAmount[j].bankamount) / 100
            );
            this.weeks.dateTime.push(weeksAmount[j].dateTime);
          }
          //月代收
          let monthAmount = res.data.data.months_amount;
          for (let k in monthAmount) {
            this.months.monthwxAmount.push(
              Number(monthAmount[k].wxamount) / 100
            );
            this.months.monthaliAmount.push(
              Number(monthAmount[k].aliamount) / 100
            );
            this.months.monthyunAmount.push(
              Number(monthAmount[k].yunamount) / 100
            );
            this.months.monthbankAmount.push(
              Number(monthAmount[k].bankamount) / 100
            );
            this.months.dateTime.push(monthAmount[k].dateTime);
          }
          this.drawLine();
        })
        .catch(err => {
          console.log(err);
        });
    },
    drawLine() {
      // 初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          top: "0",
          left: "center",
          // text: "坐席电话统计",
          textStyle: {
            align: "center",
            color: "#FFFFFF",
            fontSize: 22
          }
        },
        backgroundColor: "#043491",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        legend: {
          x: "center",
          y: "40px",
          textStyle: {
            color: "#f2f2f2",
            fontSize: 13
          },
          icon: "circle",
          data: ["代收", "代付"]
        },
        // dataZoom: [
        //   {
        //     type: "slider",
        //     show: true,
        //     height: 20,
        //     left: "10%",
        //     right: "10%",
        //     bottom: "2%",
        //     start: 50,
        //     end: 100,
        //     textStyle: {
        //       color: "#d4ffff",
        //       fontSize: 11
        //     }
        //   },
        //   {
        //     type: "inside"
        //   }
        // ],
        grid: {
          right: "5%",
          bottom: "10%",
          left: "2%",
          top: "80px",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.hour.dateTime,
            // name: "时间",
            nameTextStyle: {
              color: "#d4ffff"
            },
            axisLine: {
              lineStyle: {
                color: "#0B4CA9"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#FFF",
                fontSize: 12
              }
              //interval:0,
              //rotate:30
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            // name: "次数",
            nameTextStyle: {
              color: "#d4ffff"
            },
            position: "left",
            axisLine: {
              lineStyle: {
                color: "#0B4CA9"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#0B4CA9"
              }
            },
            axisLabel: {
              color: "#d4ffff",
              fontSize: 12
            }
          }
        ],
        series: [
          {
            name: "代付",
            type: "line",
            yAxisIndex: 0,
            symbolSize: 12,
            itemStyle: {
              normal: {
                color: "#FC30EE"
              }
            },
            data: 10
          },
          {
            name: "代收",
            type: "line",
            yAxisIndex: 0,
            symbolSize: 12,
            itemStyle: {
              normal: {
                color: "#0EF100"
              }
            },
            data: this.hour.allamount
          }
        ]
      });

      let daifuDay = echarts.init(document.getElementById("daifuDay"));
      // 绘制图表
      daifuDay.setOption({
        backgroundColor: "#323a5e",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "14%",
          top: "16%",
          containLabel: true
        },
        legend: {
          data: ["微信", "支付宝", "云闪付", "银行卡"],
          right: 10,
          top: 12,
          textStyle: {
            color: "#fff"
          },
          itemWidth: 12,
          itemHeight: 10
          // itemGap: 35
        },
        xAxis: {
          type: "category",
          data: ["2012", "2013", "2014", "2015", "2016", "2017", "2018"],
          axisLine: {
            lineStyle: {
              color: "white"
            }
          },
          axisLabel: {
            // interval: 0,
            // rotate: 40,
            textStyle: {
              fontFamily: "Microsoft YaHei"
            }
          }
        },

        yAxis: {
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "white"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.3)"
            }
          },
          axisLabel: {}
        },
        dataZoom: [
          {
            show: false,
            height: 12,
            xAxisIndex: [0],
            bottom: "8%",
            start: 10,
            end: 90,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#d3dee5"
            },
            textStyle: {
              color: "#fff"
            },
            borderColor: "#90979c"
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ],
        series: [
          {
            name: "微信",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#8bd46e"
                  },
                  {
                    offset: 1,
                    color: "#09bcb7"
                  }
                ]),
                barBorderRadius: 12
              }
            },
            // data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "支付宝",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  // {
                  //   offset: 0,
                  //   color: "#8bd46e"
                  // },
                  // {
                  //   offset: 1,
                  //   color: "#09bcb7"
                  // }
                  {
                    offset: 0,
                    color: "#248ff7"
                  },
                  {
                    offset: 1,
                    color: "#6851f1"
                  }
                ]),
                barBorderRadius: 11
              }
            },
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "云闪付",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#f85032"
                  },
                  {
                    offset: 1,
                    color: "#e73827"
                  }
                ]),
                barBorderRadius: 11
              }
            },
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "银行卡",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#fccb05"
                  },
                  {
                    offset: 1,
                    color: "#f5804d"
                  }
                ]),
                barBorderRadius: 11
              }
            },
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      });

      let daifuWeek = echarts.init(document.getElementById("daifuWeek"));
      daifuWeek.setOption({
        postion: "200",
        backgroundColor: "#1C2129", //画布背景
        title: {
          // text: "饱和度时变趋势",
          x: "center",
          y: "-5",
          textStyle: {
            fontSize: 16,
            color: "#fff"
          }
        },
        legend: {
          icon: "line",
          top: 20,
          textStyle: {
            color: "#fff",
            data: ["原方案", "建议方案"]
          },

          itemWidth: 10, // 设置宽度
          itemHeight: 10 // 设置高度
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          //x轴
          type: "category",
          boundaryGap: false, //坐标轴两边留白策略
          // data: [
          //   "06:00",
          //   "07:00",
          //   "08:00",
          //   "09:00",
          //   "10:00",
          //   "11:00",
          //   "12:00",
          //   "13:00",
          //   "14:00",
          //   "15:00",
          //   "16:00",
          //   "17:00",
          //   "18:00",
          //   "20:00",
          //   "21:00",
          //   "22:00",
          //   "23:00",
          //   "23:55"
          // ],
          axisLabel: {
            interval: 0,
            rotate: -40,
            textStyle: {
              fontSize: 12,
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          //y轴
          min: 0,
          type: "value",
          // splitLine: {
          //   show: true,
          //   lineStyle: {
          //     type: "dashed"
          //   }
          // },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#fff"
            }
          }
          // axisLine: {
          //   show: false,
          //   lineStyle: {
          //     color: "#fff"
          //   }
          // }
        },
        series: [
          {
            name: "原方案",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            type: "line",
            smooth: true, //折线是否平滑
            areaStyle: {
              opacity: 0
            },
            itemStyle: {
              normal: {
                color: "#197CD8", //小圆点的颜色
                lineStyle: {
                  color: "#197CD8" //折线的颜色
                }
              }
            }
          },
          {
            name: "建议方案",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            type: "line",
            smooth: true, //是否平滑
            areaStyle: {
              opacity: 0
            },
            itemStyle: {
              normal: {
                color: "#2B9F50", //小圆点的颜色
                lineStyle: {
                  color: "#2B9F50" //折线的颜色
                }
              }
            }
          }
        ]
      });
      let daifuMonth = echarts.init(document.getElementById("daifuMonth"));
      daifuMonth.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          color: ["#F58080", "#47D8BE", "#F9A589"],
          data: ["微信", "支付宝", "云闪付", "银行卡"],
          left: "center"
          // bottom: "bottom"
        },
        grid: {
          top: "middle",
          left: "3%",
          right: "4%",
          bottom: "3%",
          height: "80%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          }
        },
        yAxis: {
          type: "value",

          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#DDD"
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#333"
            }
          },
          nameTextStyle: {
            color: "#999"
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            name: "微信",
            type: "line",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            color: "#F58080",
            lineStyle: {
              normal: {
                width: 5,
                color: {
                  type: "linear",

                  colorStops: [
                    {
                      offset: 0,
                      color: "#FFCAD4" // 0% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: "#F58080" // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#F58080" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: "rgba(245,128,128, 0.5)",
                shadowBlur: 10,
                shadowOffsetY: 7
              }
            },
            itemStyle: {
              normal: {
                color: "#F58080",
                borderWidth: 10,
                /*shadowColor: 'rgba(72,216,191, 0.3)',
                     shadowBlur: 100,*/
                borderColor: "#F58080"
              }
            },
            smooth: true
          },
          {
            name: "支付宝",
            type: "line",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            lineStyle: {
              normal: {
                width: 5,
                color: {
                  type: "linear",

                  colorStops: [
                    {
                      offset: 0,
                      color: "#AAF487" // 0% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: "#47D8BE" // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#47D8BE" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: "rgba(71,216,190, 0.5)",
                shadowBlur: 10,
                shadowOffsetY: 7
              }
            },
            itemStyle: {
              normal: {
                color: "#AAF487",
                borderWidth: 10,
                /*shadowColor: 'rgba(72,216,191, 0.3)',
                     shadowBlur: 100,*/
                borderColor: "#AAF487"
              }
            },
            smooth: true
          },
          {
            name: "云闪付",
            type: "line",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            lineStyle: {
              normal: {
                width: 5,
                color: {
                  type: "linear",

                  colorStops: [
                    {
                      offset: 0,
                      color: "#F6D06F" // 0% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: "#F9A589" // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#F9A589" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: "rgba(249,165,137, 0.5)",
                shadowBlur: 10,
                shadowOffsetY: 7
              }
            },
            itemStyle: {
              normal: {
                color: "#F6D06F",
                borderWidth: 10,
                /*shadowColor: 'rgba(72,216,191, 0.3)',
                     shadowBlur: 100,*/
                borderColor: "#F6D06F"
              }
            },
            smooth: true
          },
          {
            name: "银行卡",
            type: "line",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            lineStyle: {
              normal: {
                width: 5,
                color: {
                  type: "linear",
                  colorStops: [
                    {
                      offset: 0,
                      color: "#F6D06F" // 0% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: "#F9A589" // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#F9A589" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: "rgba(249,165,137, 0.5)",
                shadowBlur: 10,
                shadowOffsetY: 7
              }
            },
            itemStyle: {
              normal: {
                color: "#F6D06F",
                borderWidth: 10,
                /*shadowColor: 'rgba(72,216,191, 0.3)',
                     shadowBlur: 100,*/
                borderColor: "#F6D06F"
              }
            },
            smooth: true
          }
        ]
      });
      let daishouDay = echarts.init(document.getElementById("daishouDay"));
      // 绘制图表
      // 绘制图表
      daishouDay.setOption({
        backgroundColor: "#323a5e",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "14%",
          top: "16%",
          containLabel: true
        },
        legend: {
          data: ["微信", "支付宝", "云闪付", "银行卡"],
          right: 10,
          top: 12,
          textStyle: {
            color: "#fff"
          },
          itemWidth: 12,
          itemHeight: 10
          // itemGap: 35
        },
        xAxis: {
          type: "category",
          data: this.days.dateTime, // 日期
          axisLine: {
            lineStyle: {
              color: "white"
            }
          },
          axisLabel: {
            // interval: 0,
            // rotate: 40,
            textStyle: {
              fontFamily: "Microsoft YaHei"
            }
          }
        },

        yAxis: {
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "white"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.3)"
            }
          },
          axisLabel: {}
        },
        series: [
          {
            name: "微信",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#8bd46e"
                  },
                  {
                    offset: 1,
                    color: "#09bcb7"
                  }
                ]),
                barBorderRadius: 0
              }
            },
            data: this.days.dayswxAmount
          },
          {
            name: "支付宝",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  // {
                  //   offset: 0,
                  //   color: "#8bd46e"
                  // },
                  // {
                  //   offset: 1,
                  //   color: "#09bcb7"
                  // }
                  {
                    offset: 0,
                    color: "#248ff7"
                  },
                  {
                    offset: 1,
                    color: "#6851f1"
                  }
                ]),
                barBorderRadius: 0
              }
            },
            data: this.days.daysaliAmount
          },
          {
            name: "云闪付",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#f85032"
                  },
                  {
                    offset: 1,
                    color: "#e73827"
                  }
                ]),
                barBorderRadius: 11
              }
            },
            data: this.days.daysyunAmount
          },
          {
            name: "银行卡",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#fccb05"
                  },
                  {
                    offset: 1,
                    color: "#f5804d"
                  }
                ]),
                barBorderRadius: 11
              }
            },
            data: this.days.daysbankAmount
          }
        ]
      });
      let daishouWeek = echarts.init(document.getElementById("daishouWeek"));
      daishouWeek.setOption({
        postion: "200",
        backgroundColor: "#1C2129", //画布背景
        title: {
          // text: "饱和度时变趋势",
          x: "center",
          y: "-5",
          textStyle: {
            fontSize: 16,
            color: "#fff"
          }
        },
        legend: {
          icon: "line",
          top: 20,
          textStyle: {
            left: "center",
            color: "#fff",
            data: ["微信", "支付宝", "云闪付", "银行卡"]
          },

          itemWidth: 10, // 设置宽度
          itemHeight: 10 // 设置高度
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "2%",
          right: "15%",
          bottom: "10%",
          top: "16%",
          containLabel: true
        },
        xAxis: {
          //x轴
          type: "category",
          boundaryGap: false, //坐标轴两边留白策略
          data: this.weeks.dateTime,
          axisLabel: {
            interval: 0,
            rotate: -40,
            textStyle: {
              fontSize: 12,
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          //y轴
          min: 0,
          type: "value",
          // splitLine: {
          //   show: true,
          //   lineStyle: {
          //     type: "dashed"
          //   }
          // },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#fff"
            }
          }
          // axisLine: {
          //   show: false,
          //   lineStyle: {
          //     color: "#fff"
          //   }
          // }
        },
        series: [
          {
            name: "微信",
            data: this.weeks.weekswxAmount,
            type: "line",
            smooth: true, //折线是否平滑
            areaStyle: {
              opacity: 0
            },
            itemStyle: {
              normal: {
                color: "#2B9F50", //小圆点的颜色
                lineStyle: {
                  color: "#2B9F50" //折线的颜色
                }
              }
            }
          },
          {
            name: "支付宝",
            data: this.weeks.weeksaliAmount,
            type: "line",
            smooth: true, //是否平滑
            areaStyle: {
              opacity: 0
            },
            itemStyle: {
              normal: {
                color: "#197CD8", //小圆点的颜色
                lineStyle: {
                  color: "#197CD8" //折线的颜色
                }
              }
            }
          },
          {
            name: "云闪付",
            data: this.weeks.weeksyunAmount,
            type: "line",
            smooth: true, //折线是否平滑
            areaStyle: {
              opacity: 0
            },
            itemStyle: {
              normal: {
                color: "#F58080", //小圆点的颜色
                lineStyle: {
                  color: "#F58080" //折线的颜色
                }
              }
            }
          },
          {
            name: "银行卡",
            data: this.weeks.weeksbankAmount,
            type: "line",
            smooth: true, //是否平滑
            areaStyle: {
              opacity: 0
            },
            itemStyle: {
              normal: {
                color: "#F6D06F", //小圆点的颜色
                lineStyle: {
                  color: "#F6D06F" //折线的颜色
                }
              }
            }
          }
        ]
      });
      let daishouMonth = echarts.init(document.getElementById("daishouMonth"));
      daishouMonth.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          color: ["#47D8BE", "#47D8BE", "#F58080", "#F9A589"],
          data: ["微信", "支付宝", "云闪付", "银行卡"],
          left: "center"
          // bottom: "bottom"
        },
        grid: {
          top: "middle",
          left: "3%",
          right: "4%",
          bottom: "3%",
          height: "80%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: this.months.dateTime,
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          }
        },
        yAxis: {
          type: "value",

          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#DDD"
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#333"
            }
          },
          nameTextStyle: {
            color: "#999"
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            name: "微信",
            type: "line",
            data: this.months.monthwxAmount,
            lineStyle: {
              normal: {
                width: 5,
                color: {
                  type: "linear",

                  colorStops: [
                    {
                      offset: 0,
                      color: "#AAF487" // 0% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: "#47D8BE" // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#47D8BE" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: "rgba(71,216,190, 0.5)",
                shadowBlur: 10,
                shadowOffsetY: 7
              }
            },
            itemStyle: {
              normal: {
                color: "#AAF487",
                borderWidth: 10,
                /*shadowColor: 'rgba(72,216,191, 0.3)',
                     shadowBlur: 100,*/
                borderColor: "#AAF487"
              }
            },
            smooth: true
          },
          {
            name: "支付宝",
            type: "line",
            data: this.months.monthaliAmount,
            lineStyle: {
              normal: {
                width: 5,
                color: {
                  type: "linear",

                  colorStops: [
                    {
                      offset: 0,
                      color: "#3a7bd5" // 0% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: "#3a6073" // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#3a6073" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: "#3a7bd5",
                shadowBlur: 10,
                shadowOffsetY: 7
              }
            },
            itemStyle: {
              normal: {
                color: "#3a7bd5",
                borderWidth: 10,
                /*shadowColor: '#3a6073',
                     shadowBlur: 100,*/
                borderColor: "#3a7bd5"
              }
            },
            smooth: true
          },
          {
            name: "云闪付",
            type: "line",
            data: this.months.monthyunAmount,
            color: "#F58080",
            lineStyle: {
              normal: {
                width: 5,
                color: {
                  type: "linear",

                  colorStops: [
                    {
                      offset: 0,
                      color: "#FFCAD4" // 0% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: "#F58080" // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#F58080" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: "rgba(245,128,128, 0.5)",
                shadowBlur: 10,
                shadowOffsetY: 7
              }
            },
            itemStyle: {
              normal: {
                color: "#F58080",
                borderWidth: 10,
                /*shadowColor: 'rgba(72,216,191, 0.3)',
                     shadowBlur: 100,*/
                borderColor: "#F58080"
              }
            },
            smooth: true
          },
          {
            name: "银行卡",
            type: "line",
            data: this.months.monthbankAmount,
            lineStyle: {
              normal: {
                width: 5,
                color: {
                  type: "linear",

                  colorStops: [
                    {
                      offset: 0,
                      color: "#F6D06F" // 0% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: "#F9A589" // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#F9A589" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: "rgba(249,165,137, 0.5)",
                shadowBlur: 10,
                shadowOffsetY: 7
              }
            },
            itemStyle: {
              normal: {
                color: "#F6D06F",
                borderWidth: 10,
                /*shadowColor: 'rgba(72,216,191, 0.3)',
                     shadowBlur: 100,*/
                borderColor: "#F6D06F"
              }
            },
            smooth: true
          }
        ]
      });
    },
    //
    compare(attr) {
      return function(a, b) {
        var val1 = a[attr];
        var val2 = b[attr];
        return val2 - val1;
      };
    },
    // 将通讯录按照 ABCD字母的顺序排序
    sortObjByKey(obj) {
      var keys = Object.keys(obj).sort();
      var newObj = {};
      for (var i = 0; i < keys.length; i++) {
        var index = keys[i];
        newObj[index] = obj[index];
      }
      return newObj;
    }
  },
  mounted() {
    //初始化要放在mounted方法中

    // this.getUsers();
  }
};
</script>
<style>
h2 {
  margin: 20px;
}
.el-card__body {
  padding: 0;
}
</style>
<style lang="scss" scoped>
.el-card {
  box-shadow: none;
}
.card_itemP {
  color: #3c4250;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: none;
  .card_img {
    padding: 20px;
    display: inline-block;
    vertical-align: super;
  }
  .card_div {
    display: inline-block;
    vertical-align: super;
    margin-left: 20px;
    .card_title {
      font-size: 16px;
      margin: 0;
      margin-bottom: 8px;
    }
    .card_content {
      font-size: 12px;
      color: #606266;
    }
    div {
      color: #fff;
      font-family: PingFangSC-Regular, PingFang SC;
    }
  }
}
.card_item {
  height: 72px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: none;
  .card_img {
    padding: 20px 20px 20px 20px;
    display: inline-block;
    vertical-align: super;
  }
  .card_div {
    display: inline-block;
    vertical-align: super;
    .card_title {
      font-size: 16px;
      margin: 0;
      margin-bottom: 8px;
    }
    .card_content {
      font-size: 12px;
    }
  }
  div {
    color: #fff;
    font-family: PingFangSC-Regular, PingFang SC;
  }
}
.amount-row {
  width: 30%;
  background-color: #fff;
  margin-bottom: 15px;
  border-radius: 8px;
  display: inline-block;
  vertical-align: top;
  div:nth-child(1),
  div:nth-child(2),
  div:nth-child(3) {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    vertical-align: middle;
    margin-top: 15px;
    margin-bottom: 5px;
    p {
      font-size: 14px;
      color: #909399;
    }
    span {
      font-size: 16px;
      color: #303133;
    }
  }
}
.amount-right {
  display: inline-block;
  width: 65%;
  margin-left: 4%;
  background-color: #fff;
  border-radius: 8px;
  .amount-one {
    width: 95%;
    margin: 0 auto;
    .amount-one-div {
      display: inline-block;
      width: 25%;
      text-align: center;
      padding-top: 7px;
      padding-bottom: 7px;
      p {
        font-size: 14px;
        color: #909399;
      }
      span {
        font-size: 16px;
        color: #303133;
      }
    }
    div:nth-child(3) {
      display: inline-block;
      width: 49%;
      text-align: center;
      padding-top: 7px;
      padding-bottom: 7px;
      div {
        width: 70%;
        margin: 0 auto;
      }
      p {
        font-size: 14px;
        color: #909399;
        margin: 0;
        padding: 0;
      }
    }
  }
}
</style>