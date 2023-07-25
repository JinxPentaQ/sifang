<template>
  <div class="bgDiv">
    <div class="titContent">
      <p>后台管理系统</p>
      <label>BACKSTAGE MANGEMENT SYSTEM</label>
      <!-- <p>欢迎登录</p> -->
    </div>
    <div class="news">
      <el-button size="mini" @click="drawer = true">更新记录</el-button>
    </div>
    <div class="rightContent">
      <el-form
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
      >
        <div class="title">
          <p>
            <span>欢迎</span>
            您登录
          </p>
        </div>
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="ruleForm2.username"
            auto-complete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="ruleForm2.code" placeholder="请输入谷歌验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width:100%;"
            @keyup.enter="loginBtn"
            @click.native.prevent="loginBtn"
            :loading="logining"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-drawer title="更新历史记录" :visible.sync="drawer" :direction="direction">
      <div v-for="(item,index) in news" :key="index" style="padding:0 50px;">
        <span style="color:#E6A23C;">{{item.time}}</span>
        <p v-for="(content,index) in item.content" :key="index">
          <span style="color:#606266;">{{index + 1}}.</span>
          <span style="color:#606266;">{{content.content}}</span>
          <!-- <span style="float:right;color:#C0C4CC;">{{item.time}}</span> -->
        </p>
        <el-divider></el-divider>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { login  } from '../api/admin';
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        username: "",
        pwd: "",
        code: ""
      },
      rules2: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
          //{ validator: validaePass }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      drawer: false,
      direction: "rtl",
      news: [
        {
          time: "2020/2/26",
          content: [
            {
              content: "登入google验证"
            },
            {
              content: "增加会员整条下线冻结"
            },
            {
              content: "复制推广码显示卡号"
            },
            {
              content: "app logo更换"
            },
            {
              content: "APP接到订单推送"
            },
            {
              content: "商户api白名单商户后台不显示，开户时添加"
            },
            {
              content: "http://api.k9138.com/docs.php首页标签更换为9138"
            },
            {
              content: "首页下载页"
            },
            {
              content: "商户后台下发通知，下发状态显示（处理中、取消、完成）"
            },
            {
              content: "员工帐号增加备注，处理人由帐号修改为备注"
            },
            {
              content: "域名变更为https"
            },
            {
              content: "代理后台预付款订单订单金额点查看后数字不一样"
            },
            {
              content: "复制推广码显示卡号"
            },
            {
              content: "app logo更换"
            },
            {
              content: "APP接到订单推送"
            }
          ]
        },
        {
          time: "2020/2/24",
          content: [
            {
              content: "删除预留信息字段"
            },
            {
              content: "添加更新记录"
            }
          ]
        }
      ]
    };
  },
  methods: {
    loginBtn(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = {
            account: this.ruleForm2.username,
            pwd: this.$md5(this.$md5(this.$md5(this.ruleForm2.pwd))),
            code: this.ruleForm2.code,
          };
            login(loginParams).then((res)=>{
              sessionStorage.setItem(
                  "token",
                  JSON.stringify(res.token)
                );
                this.$router.push({ path: "/welcome" });
                location.reload();
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  // 绑定键盘enter  绑定在document上
  created() {
    var _this = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        _this.loginBtn();
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.bgDiv {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  .titContent {
    width: 70%;
    height: 100%;
    float: left;
    color: #fff;
    background: url("../assets/logbg1.jpg") no-repeat center center;
  }
  .titContent p:first-child {
    font-size: 50px;
    margin-top: 24%;
    letter-spacing: 15px;
    padding-left: 35%;
    margin-bottom: 20px;
  }
  .titContent label {
    font-size: 20px;
    text-align: center;
    padding-left: 36%;
  }
  .titContent p:last-child {
    width: 140px;
    height: 40px;
    font-size: 17px;
    color: #fff;
    background-color: #409eff;
    margin: 30px 0 20px 20%;
    line-height: 40px;
    border-radius: 10px;
    text-align: center;
  }
  .rightContent {
    width: 29%;
    height: 100%;
    background: rgba(255, 255, 255, 0.4);
    float: right;
    border-radius: 5px;
    margin-top: 13%;
    .login-container {
      width: 350px;
      overflow: hidden;
      margin: 0 auto;
      .title {
        margin: 10px auto 50px auto;
        text-align: left;
        color: #409eff;
        font-size: 25px;

        span {
          border-bottom: 2px solid #409eff;
          padding-bottom: 10px;
        }
      }
    }
    .forget {
      text-align: right;
      color: #fff;
      cursor: pointer;
    }
  }
}
.bottom {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 12px;
  margin: auto;
  color: #fff;
}
.news {
  position: absolute;
  top: 30px;
  right: 30px;
}
</style>