import request from '@/utils/request'

// 获取c2c订单
export function getOrders(data) {
  return request({
    url: 'App/Order_TradeOrderController/GetOrders',
    method: 'post',
    data
  })
}

// 获取订单详情
export function getOrder(data) {
  return request({
    url: 'App/Order_TradeOrderController/GetOrder',
    method: 'post',
    data
  })
}
// 获取兑换订单
export function getsExchangeOrder(data) {
  return request({
    url: 'App/Order_ExchangeOrderController/GetsExchangeOrder',
    method: 'post',
    data
  })
}
// 审核兑换订单
export function configExchangeOrder(data) {
  return request({
    url: 'App/Order_ExchangeOrderController/ConfigExchangeOrder',
    method: 'post',
    data
  })
}
// 订单回调通知
export function pushOrder(data) {
  return request({
    url: 'App/Order_TradeOrderController/PushOrder',
    method: 'post',
    data
  })
}
// 补单
export function reconfirmOrder(data) {
  return request({
    url: 'App/Order_TradeOrderController/ReconfirmOrder',
    method: 'post',
    data
  })
}
// 退单
export function backOrder(data) {
  return request({
    url: 'App/Order_TradeOrderController/BackOrder',
    method: 'post',
    data
  })
}
// 获取订单统计
export function getOrderStatistics(data) {
  return request({
    url: 'App/Order_TradeOrderController/GetStatistics',
    method: 'post',
    data
  })
} 