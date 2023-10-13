export const orderStatusOptions = [
  {
    text: "待创建",
    value: '1',
  },
  {
    text: "已创建",
    value: '2',
  },
  {
    text: "待接单",
    value: '3',
  },
  {
    text: "已接单",
    value: '4',
  },
  {
    text: "待确认",
    value: '5',
  },
  {
    text: "待审核",
    value: '6',
  },
  {
    text: "已完成",
    value: '7',
  },
  {
    text: "审核失败",
    value: '8',
  },
  {
    text: "失败",
    value: '9',
  },
]
export const orderTypeOptions = [
  {
    text: '商户代收',
    value: '1'
  },
  {
    text: '商户代付',
    value: '2'
  },
  {
    text: '用户充值',
    value: '3'
  },
  {
    text: '用户提现',
    value: '4'
  },
]
export const exchangeOrderTypeOptions = [
  {
    text: '用户兑换',
    value: '1'
  },
  {
    text: '商户兑换',
    value: '2'
  },
  {
    text: '平台兑换',
    value: '3'
  },
]

export const conExchangeStatusType = {
  success: 1,
  final: 0,
}

export const confirmExchangOrderStatus = [
  {
    text: '已通过',
    value: '1'
  },
  {
    text: '已拒绝',
    value: '0'
  },
]
export const merchantStatus = {
  open: 1,
  close: 0,
}
export const merchantStatusOptions = [
  {
    text: '关闭',
    value: merchantStatus.close,
  },
  {
    text: '开启',
    value: merchantStatus.open,
  },
]
export const platFormType = {
  all: 0,
  normal: 1,
  group: 2,
}
export const platFormTypeOptions = [
  {
    text: '全部',
    value: platFormType.all,
  },
  {
    text: '普通用户',
    value: platFormType.normal,
  },
  {
    text: '组',
    value: platFormType.group,
  },
]
export const platFormStatus = {
  disabled: 0,
  active: 1,
  limit: 2
}

export const platFormStatusOptions = [
  {
    text: '禁用',
    value: platFormStatus.disabled,
    tag: 'info'
  },
  {
    text: '已激活',
    value: platFormStatus.active,
    tag: 'success'
  },
  {
    text: '限制',
    value: platFormStatus.limit,
    tag: 'danger'
  },
]
export const memberType = {
  all: 0,
  normal: 1,
  group: 2
}
export const memberTypeOptions = [
  {
    text: '全部',
    value: memberType.all,
  },
  {
    text: '普通用户',
    value: memberType.normal,
  },
  {
    text: '组',
    value: memberType.group,
  },
]

export const memberStatus = {
  disabled: 0,
  active: 1,
  unactive: 2,
}

export const memberStatusOptions = [
  {
    text: '禁用',
    value: memberStatus.disabled,
    tag: 'danger'
  },
  {
    text: '已激活',
    value: memberStatus.active,
    tag: 'success'
  },
  {
    text: '未激活',
    value: memberStatus.unactive,
    tag: 'info'
  },
]

export const identityType = {
  all: 0,
  idCard: 1,
  possport: 2,
}

export const identityTypeOptions = [
  {
    text: '全部',
    value: identityType.all,
  },
  {
    text: '身份证',
    value: identityType.idCard,
  },
  {
    text: '护照 ',
    value: identityType.possport,
  },
]
export const authIdentity = {
  yes: 1,
  no: 0
}
export const authIdentityOptions = [
  {
    text: '已认证',
    value: authIdentity.yes,
    icon: 'el-icon-check',
    tag: 'success'
  },
  {
    text: '未认证',
    value: authIdentity.no,
    icon: 'el-icon-close',
    tag: 'danger'
  },
]

// 通道是否开启
export const channelOpen = {
  yes: 1,
  no: 0
}

export const channelOpenOptions = [
  {
    text: '开启',
    value: channelOpen.yes,
  },
  {
    text: '关闭',
    value: channelOpen.no,
  },
]

// 买入卖出指定类型
export const  bySellType = {
  no: 0,
  user: 1,
  platform: 2, 
}

export const bySellTypeOptions = [
  {
    text: '不指定',
    value: bySellType.no,
  },
  {
    text: '用户',
    value: bySellType.user,
  },
  {
    text: '三方',
    value: bySellType.platform,
  },
]

export const  buyChannelRetType = {
  info: 1, // 1信息 2收银台
  desk: 2,
}

export const buyChannelRetTypeOptions = [
  {
    text: '信息',
    value: buyChannelRetType.info,
  },
  {
    text: '收银台',
    value: buyChannelRetType.desk,
  },
]
export const openStatusKey = {
  open: 1,
  close: 0, 
}
export const openStatusOptions = [
  {
    text: '开启',
    value: openStatusKey.open,
  },
  {
    text: '关闭',
    value: openStatusKey.close,
  },
]

export  const orderNotifyStatus = [
  {
    text: '进行中',
    value: 1,
  },
  {
    text: '成功',
    value: 2,
  },
  {
    text: '失败',
    value: 3,
  },
]

export const c2cOrderType = {
  collect: 1,
  pay: 2
}