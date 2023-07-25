

import request from '@/utils/request'

// 获取商户通道配置列表
export function getsBusinessChannelConfig(data) {
  return request({
    url: 'App/Business_BusinessChannelController/GetsBusinessChannelConfig',
    method: 'post',
    data
  })
}

// 添加商户通道配置
export function addBusinessChannelConfig(data) {
  return request({
    url: 'App/Business_BusinessChannelController/AddBusinessChannelConfig',
    method: 'post',
    data
  })
}
// 修改商户通道配置
export function modBusinessChannelConfig(data) {
  return request({
    url: 'App/Business_BusinessChannelController/ModBusinessChannelConfig',
    method: 'post',
    data
  })
}
