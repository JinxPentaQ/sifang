import request from '@/utils/request'

// 平台列表
export function getsPlatform(data) {
  return request({
    url: 'App/Platform_PlatformController/GetsPlatform',
    method: 'post',
    data
  })
}
// 添加平台
export function addPlatform(data) {
  return request({
    url: 'App/Platform_PlatformController/AddPlatform',
    method: 'post',
    data
  })
}

// 修改平台状态
export function modPlatformStatus(data) {
  return request({
    url: 'App/Platform_PlatformController/ModPlatformStatus',
    method: 'post',
    data
  })
}

// 重置密码
export function resetPlatformPwd(data) {
  return request({
    url: 'App/Platform_PlatformController/ResetPlatformPwd',
    method: 'post',
    data
  })
}

// 重置商户谷歌密钥
export function resetPlatformGA(data) {
  return request({
    url: 'App/Platform_PlatformController/ResetPlatformGA',
    method: 'post',
    data
  })
}

// 获取平台钱包
export function getPlatformWallet(data) {
  return request({
    url: 'App/Platform_PlatformWalletController/GetPlatformWallet',
    method: 'post',
    data
  })
}

// 添加平台钱包
export function addPlatformWallet(data) {
  return request({
    url: 'App/Platform_PlatformWalletController/AddPlatformWallet',
    method: 'post',
    data
  })
}

// 获取平台钱包记录
export function getsPlatformWalletRecord(data) {
  return request({
    url: 'App/Platform_PlatformWalletController/GetsPlatformWalletRecord',
    method: 'post',
    data
  })
}