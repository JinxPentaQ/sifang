import {
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
  platformChannel,
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
  system,
} from "@/router/const.js";

let routes = [
  {
    path: "/",
    component: Home,
    name: "首页",
    iconCls: "el-icon-message", //图标样式class
    children: [
      //欢迎页
      { path: "/welcome", component: welcome, name: "欢迎页",  hidden: true },
      {
        path: "/changePwd",
        component: changePwd,
        name: "修改密码",
        hidden: true,
      },
      //订单管理
      {
        path: "/order",
        component: multiLevelMenu,
        name: "订单管理",
        icon: 'el-icon-document-copy',
        children: [
          {
            path: "/c2cOrder",
            component: c2cOrder,
            name: "C2C订单",
          },
          {
            path: "/exchangeOrder",
            component: exchangeOrder,
            name: "兑换订单",
          },
        ],
      },
      //商户管理
      {
        path: "/merchant",
        component: multiLevelMenu,
        name: "商户管理",
        icon: 'el-icon-school',
        children: [
          { path: "/merchantList", component: merchantList, name: "商户列表" },
          { path: "/merchantWallet/:id", component: merchantWallet, name: "商户钱包",  hidden: true },
          { path: "/merchantWalletRecords/:id", component: merchantWalletRecords, name: "商户钱包记录",  hidden: true },
          { path: "/merchantChannel/:id", component: merchantChannel, name: "商户通道配置", hidden: true },
        ],
      },
      {
        path: "/platform",
        component: multiLevelMenu,
        name: "平台管理",
        icon: "el-icon-data-analysis",
        children: [
          {
            path: "/platformList",
            component: platformList,
            name: "平台列表",
          },
          { path: "/platformWallet/:id", component: platformWallet, name: "平台钱包" ,  hidden: true,},
          { path: "/platformWalletRecords/:id", component: platformWalletRecords, name: "平台钱包记录",  hidden: true, },
          { path: "/platformChannel/:id", component: platformChannel, name: "平台通道配置", hidden: true },
        ],
      },
      {
        path: "/member",
        component: multiLevelMenu,
        name: "会员管理",
        icon: "el-icon-user",
        children: [
          {
            path: "/memberList",
            component: memberList,
            name: "会员列表",
          },
          { path: "/memberWallet/:id", component: memberWallet, name: "会员钱包",   hidden: true,},
          { path: "/memberWalletRecords/:id", component: memberWalletRecords, name: "会员钱包记录",  hidden: true, },
        ],
      },
      {
        path: "/setting",
        component: multiLevelMenu,
        name: "系统设置",
        icon: "el-icon-setting",
        children: [
          { path: "/roleList", component: roleList, name: "角色管理" },
          { path: "/userList", component: userList, name: "用户管理" },
          { path: "/permission", component: permissionList, name: "权限管理" },
          { path: "/channel", component: channel, name: "通道管理" },
          { path: "/currencyChannel", component: currencyChannel, name: "币种通道管理" },
          { path: "/currency", component: currency, name: "币种管理" },
          { path: "/testOrder", component: testOrder, name: "测试下单" },
          { path: "/system", component: system, name: "系统配置"  }
        ],
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    name: "",
  },
  {
    path: "/404",
    component: NotFound,
    name: "",
  },
  {
    path: "*",
    hidden: true,
    redirect: { path: "/404" },
  },
];

export default routes;
