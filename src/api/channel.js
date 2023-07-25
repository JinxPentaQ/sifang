import request from '@/utils/request'

// 获取通道
export function getsChannel(data) {
  return request({
    url: 'App/ChannelCurrency_ChannelController/GetsChannel',
    method: 'post',
    data
  })
}

// 添加通道
export function addChannel(data) {
  return request({
    url: 'App/ChannelCurrency_ChannelController/AddChannel',
    method: 'post',
    data
  })
}
// 删除通道
export function delChannel(data) {
  return request({
    url: 'App/ChannelCurrency_ChannelController/DelChannel',
    method: 'post',
    data
  })
}
