import request from '@/utils/request'

// 获取货币列表
export function getsChannelCurrency(data) {
  return request({
    url: '	App/ChannelCurrency_ChannelCurrencyController/GetsChannelCurrency',
    method: 'post',
    data
  })
}

// 添加货币
export function addChannelCurrency(data) {
  return request({
    url: 'App/ChannelCurrency_ChannelCurrencyController/AddChannelCurrency',
    method: 'post',
    data
  })
}
// 删除货币
export function delChannelCurrency(data) {
  return request({
    url: 'App/ChannelCurrency_ChannelCurrencyController/DelChannelCurrency',
    method: 'post',
    data
  })
}
