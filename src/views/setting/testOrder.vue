<template>
  <section class="page-container">
    <el-col :span="12" :offset="1">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="商户名称">
          <el-input v-model="form.name" disabled style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" prop="amount">
          <el-input v-model="form.amount" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="订单类型" prop="pay_type">
          <el-select v-model="form.pay_type" placeholder="请选择订单类型">
            <el-option
              v-for="(item,index) in payType"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="small" :loading="createLoading">立即创建</el-button>
          <el-button size="small">取消</el-button>
        </el-form-item>
        <div v-show="orderVisible">
          <p>订单ID：{{aOrder}}</p>
          <p>
            支付地址 :
            <a :href="pay_url" target="_blank">{{pay_url}}</a>
          </p>
        </div>
      </el-form>
    </el-col>
  </section>
</template>

<script>
import Qs from 'qs'
export default {
  data() {
    return {
      form: {
        name: "测试商户",
        amount: "",
        pay_type: ""
      },
      aOrder: "",
      pay_url: "",
      orderVisible: false,
      createLoading: false,
      payType: [
        {
          label: "微信",
          value: "1"
        },
        {
          label: "支付宝",
          value: "2"
        },
        {
          label: "银行卡",
          value: "3"
        },
        {
          label: "云闪付",
          value: "4"
        },
        {
          label: "支付宝原生",
          value: "5"
        },
        {
          label: "手机号转账",
          value: "6"
        },
        {
          label: "USDT",
          value: "7"
        },
        {
          label: "BTC",
          value: "8"
        },
      ],
      rules: {
        amount: [{ required: true, message: "请输入金额" }],
        pay_type: [{ required: true, message: "请选择支付方式" }]
      }
    };
  },
  methods: {
    onSubmit() {
      var _this = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          this.createLoading = true;
          let param = {
            amount: this.form.amount,
            pay_type: this.form.pay_type,
            notice_url: "2c2f3b8945e907d4c5c66ff9748ff8e5",
            platform_id: "test123",
            sign: "lijignzhe",
            type: "1",
            p_order_id: Date.parse(new Date())
          };
          _this.$http
            .post(
              this.GLOBAL.BASE_URL2 + "Api_IController/testReserveOrder?",
              Qs.stringify(param),
              {
                headers: {
                  "Content-Type":
                    "application/x-www-form-urlencoded; "
                }
              }
            )
            .then(res => {
              if (res.data.ret == "200") {
                this.aOrder = res.data.data.advance_order_id;
                this.pay_url = res.data.data.pay_url;
                this.$refs.form.resetFields();
                this.orderVisible = true;
                this.createLoading = false;
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning"
                });
                this.createLoading = false;
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.el-form {
  background-color: #fff;
  padding: 30px;
}
</style>
