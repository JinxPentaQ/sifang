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