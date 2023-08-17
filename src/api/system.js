import request from '@/utils/request'

// 获取系统配置
export function getSysConfig(data) {
  return request({
    url: 'App/System_SystemController/GetSysConfig',
    method: 'post',
    data
  })
}

// 设置系统配置
export function setSysConfig(data) {
  return request({
    url: 'App/System_SystemController/SetSysConfig',
    method: 'post',
    data
  })
}
// 代付自动接单开关
export function setSellConfig(data) {
  return request({
    url: 'App/System_SystemController/SetSellConfig',
    method: 'post',
    data
  })
}
// 代收自动接单开关
export function setBuyConfig(data) {
  return request({
    url: 'App/System_SystemController/SetBuyConfig',
    method: 'post',
    data
  })
}
// 更新版本信息
export function setAppVersion(data) {
  return request({
    url: 'App/System_SystemController/SetAppVersion',
    method: 'post',
    data
  })
}