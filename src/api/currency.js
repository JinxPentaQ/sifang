import request from '@/utils/request'

// 获取货币列表
export function getsCurrency(data) {
  return request({
    url: 'App/ChannelCurrency_CurrencyController/GetsCurrency',
    method: 'post',
    data
  })
}

// 添加货币
export function addCurrency(data) {
  return request({
    url: 'App/ChannelCurrency_CurrencyController/AddCurrency',
    method: 'post',
    data
  })
}
// 删除货币
export function delCurrency(data) {
  return request({
    url: 'App/ChannelCurrency_CurrencyController/DelCurrency',
    method: 'post',
    data
  })
}
