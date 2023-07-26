import Login from "@/views/Login.vue";
import NotFound from "@/views/404.vue";
import Home from "@/views/Home.vue";
import multiLevelMenu from "@/views/layout/multiLevelMenu.vue";
import changePwd from "@/views/changePwd.vue";
//欢迎页
import welcome from "@/views/welcome.vue";

//订单
import c2cOrder from "@/views/order/c2cOrder.vue";
import exchangeOrder from "@/views/order/exchangeOrder.vue";

//商户
import merchantList from "@/views/merchant/merchantList.vue";
import merchantWallet from "@/views/merchant/merchantWallet.vue";
import merchantWalletRecords from "@/views/merchant/merchantWalletRecords.vue"
import merchantChannel from '@/views/merchant/merchantChannel.vue'

//平台
import platformList from "@/views/platform/platformList.vue";
import platformWallet from "@/views/platform/platformWallet.vue";
import platformWalletRecords from "@/views/platform/platformWalletRecords.vue"

//会员管理
import memberList from "@/views/member/memberList.vue";
import memberWallet from "@/views/member/memberWallet.vue";
import memberWalletRecords from "@/views/member/memberWalletRecords.vue"

//系统设置
import roleList from "@/views/setting/roleList.vue";
import userList from "@/views/setting/userList.vue";
import channel from "@/views/setting/channel.vue";
import currency from "@/views/setting/currency.vue";
import currencyChannel from "@/views/setting/currencyChannel.vue";
import permissionList from "@/views/setting/permissionList.vue";
import testOrder from "@/views/setting/testOrder.vue";


export {
  Login,
  multiLevelMenu,
  NotFound,
  Home,
  changePwd,
  welcome,
  c2cOrder,
  exchangeOrder,
  merchantList,
  merchantWallet,
  merchantWalletRecords,
  merchantChannel,
  platformList,
  platformWallet,
  platformWalletRecords,
  memberList,
  memberWallet,
  memberWalletRecords,
  roleList,
  userList,
  channel,
  currency,
  currencyChannel,
  permissionList,
  testOrder,
};
