<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col
        class="logo"
        style="width: 227px; cursor: pointer"
        @click.native="$router.push({ path: '/dashBoard' })"
      >
      <img src="../assets/hdLogo.png" alt="">
      恒达支付管理系统
      </el-col>
      <div class="userinfo">
        <el-dropdown>
          <span class="rightBtn">
            <i class="el-icon-user"></i>
            {{ this.GLOBAL.user }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              谷歌身份验证
              <el-switch
                v-model="auth"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="1"
                inactive-value="0"
                @change="getGeoCod"
              ></el-switch>
            </el-dropdown-item>
            <el-divider></el-divider>
            <el-dropdown-item @click.native.prevent="change()">
              <i class="el-icon-key"></i>修改密码
            </el-dropdown-item>
            <el-dropdown-item @click.native.prevent="logout()">
              <i class="el-icon-switch-button"></i>
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <el-col :span="24" class="main">
      <aside>
        <el-scrollbar style="height: 100%">
          <!--导航菜单-->
          <el-menu
            :default-active="currentUrl"
            :unique-opened="true"
            text-color="#FFFFFF"
            active-text-color="#FFFFFF"
            router
          >
            <template v-for="(item, index) in routeList">
              <el-submenu v-if="item.children" :key="index" :index="item.path">
                <template slot="title"> <i :class="item.icon"></i> {{ item.name }}</template>
                <div
                  v-for="(subItem, subIndex) in item.children"
                  :key="subIndex"
                >
                  <el-menu-item
                    v-if="!subItem.hidden"
                    :key="subItem.path"
                    :index="subItem.path"
                    >{{ subItem.name }}</el-menu-item
                  >
                </div>
              </el-submenu>
              <el-menu-item
                v-if="!item.children && !item.hidden"
                :index="item.path"
                :key="index"
              >
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-scrollbar>
      </aside>
      <div class="content-container">
        <section style="height: 100%">
          <el-scrollbar style="height: 100%">
            <div :span="24" class="content-wrapper">
              <div class="title">
                <div class="title-name">{{ $route.name }}</div>
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item
                    v-for="(route, index) in $route.matched"
                    :key="index"
                    >{{ route.name }}</el-breadcrumb-item
                  >
                </el-breadcrumb>
              </div>
              <transition name="fade" mode="out-in">
                <!-- <keep-alive> -->
                  <router-view></router-view>
                <!-- </keep-alive> -->
              </transition>
            </div>
          </el-scrollbar>
        </section>
      </div>
    </el-col>
    <!-- 谷歌验证器 -->
    <el-dialog title="谷歌验证器" :visible.sync="dialogVisible" width="40%">
      <p>1.秘钥绑定</p>
      <div style="padding: 30px; background-color: #f2f2f2">
        <p>账号：{{ account }}</p>
        <p>秘钥：{{ serect }}</p>
      </div>
      <div>
        <p>2.扫码绑定(使用Geogle身份验证器 APP 扫码)</p>
      </div>
      <div id="qrcode"></div>
      <p style="text-align: center">
        请使用“Google 身份验证器APP”
        绑定，各大软件商店均可下载该APP，支持安卓、IOS系统。
      </p>
      <p style="text-align: center; color: #f56c6c">
        开启服务后，请立即使用“Google 身份验证器APP”
        绑定,以免出现无法登录的情况。
      </p>
    </el-dialog>
  </el-row>
</template>
<script>
import Qs from "qs";
import QRCode from "qrcodejs2";
import routes from "@/router/routes";
import { createGoogleAuth, getAdminPermissions } from "@/api/admin";
export default {
  data() {
    return {
      currentIndex: "",
      currentUrl: "welcome",
      sysUserName: "",
      level01Name: "",
      level01: [],
      level02: [],
      navList: [
        {
          menu_name: "统计",
          routing_url: "/dashBoard",
        },
      ],
      activeClass: 0,
      activeClassNav: 0,
      iconUrl: "../../static/icon/",
      auth: "0",
      dialogVisible: false,
      account: "",
      serect: "",
      routeList: [],
      permissionIds: [],
    };
  },
  methods: {
    //退出登录
    logout() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    //获取谷歌验证码
    getGeoCod() {
      createGoogleAuth({ status: this.auth })
        .then((res) => {
          if (this.auth == 0) {
            this.$message.success("操作成功");
          } else if (this.auth == 1) {
            this.dialogVisible = true;
            this.account = res.name;
            this.serect = res.code;
            this.$nextTick(() => {
              let qrcode = new QRCode("qrcode", {
                width: 200,
                height: 200,
                text: res.qr, // 二维码地址
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取菜单
    getMenu() {
      getAdminPermissions().then((res) => {
        this.permissionIds = res.map((item) => item.path);
        sessionStorage.setItem('ids', this.permissionIds);
        const level1 = routes[0].children.filter((item) =>
          this.permissionIds.includes(item.path)
        );
        const menu = level1.map((item) => {
          const child =
            item.children &&
            item.children.filter((i) => this.permissionIds.includes(i.path));
          return {
            ...item,
            children: child,
          };
        });
        this.routeList = menu;
      });
    },
    //修改密码
    change() {
      this.$router.push({ path: "/changePwd" });
    },
  },
  mounted() {
    this.getMenu();
    this.auth = this.GLOBAL.auth;
    console.log(this.$route ,'route')
  },
};
</script>
<style scoped lang="scss">
@import "~scss_vars";
.container {
  position: absolute;
  top: 0;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: #3d424f;
    color: #fff;
    .userinfo {
      text-align: center;
      padding-right: 20px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 5px 10px 10px;
          float: left;
        }
      }
      .rightBtn {
        cursor: pointer;
        width: 80px;
        display: inline-block;
        color: #fff;
      }
      .rightBtn i {
        display: inline-block;
        margin-right: 2px;
      }
    }
    .logo {
      height: 60px;
      font-size: 18px;
      padding-left: 8px;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px ;
      }
      .txt {
        color: #fff;
      }
      i {
        font-size: 25px;
        margin-right: 5px;
      }
    }
    .logo-width {
      width: 230px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    width: 100%;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    // 侧边栏
    aside {
      width: 227px;
      height: 100%;
      background-color: #3d424f !important;
      .el-menu {
        height: 100%;
        color: #fff;
      }
    }
    .content-container {
      position: absolute;
      top: 0px;
      left: 227px;
      right: 0;
      height: 100%;
      background-color: #f1f1f1;
      //标签栏
      .nav-tab {
        padding-bottom: 5px;
        position: fixed;
        top: 60px;
        left: 227px;
        right: 0;
        z-index: 3;
        background-color: #f1f1f1;
        border-bottom: 1px solid #dcdfe6;
        .activeNav {
          color: #fff;
          background-color: #409eff;
          border-color: #409eff;
        }
        .el-button {
          margin-top: 5px;
          margin-left: 8px;
        }
      }
      .content-wrapper {
       
        .title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 40px;
          padding: 10px 20px;
          background-color: #fff;
          margin-bottom: 20px;
          box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
          .title-name {
            height: 40px;
            font-size: 24px;
            color: #455a64;
          }
          .el-breadcrumb {
            font-size: 12px;
          }
        }
      }
    }
  }
}
//二维码样式
#qrcode {
  margin: 0 auto;
  width: 200px;
  height: 200px;
}
//菜单箭头样式
.active {
  box-shadow: 0px 12px 26px 3px rgba(242, 244, 247, 0.27);
  font-size: 15px;
  background: url("../../src/assets/arrow.png") no-repeat center bottom;
  background-size: 20% 15%;
  background-position: 32px 52px;
}
</style>
<style lang="scss">
.el-aside {
  display: block;
  position: relative;
  background-color: #324157 !important;
}
//scroll 横向滚动
.el-scrollbar__wrap {
  overflow-x: hidden;
}
//修改菜单样式
.el-menu {
  color: #fff;
  background: #3d424f;
}
.el-menu .el-submenu {
  background: #3d424f !important;
}
.el-submenu__title {
  color: #fff !important;
}
.el-menu-item:hover,
.el-menu-item:focus,
.el-menu-item:active,
.el-submenu__title:hover {
  background-color: rgb(84, 92, 100);
  color: #fff;
}
.el-submenu__title i {
  color: #fff;
}
.el-menu-item {
  color: #fff;
}
.el-menu-item.is-active {
  color: #fff;
  background: #409eff;
}

.child-item {
  background: #f2f4f7;
  color: black;
}
</style>
