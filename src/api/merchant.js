import request from '@/utils/request'

// 商户列表
export function getsBusiness(data) {
  return request({
    url: 'App/Business_BusinessController/GetsBusiness',
    method: 'post',
    data
  })
}
// 商户信息
export function getBusiness(data) {
  return request({
    url: 'App/Business_BusinessController/GetBusiness',
    method: 'post',
    data
  })
}
// 添加商户
export function addBusiness(data) {
  return request({
    url: 'App/Business_BusinessController/AddBusiness',
    method: 'post',
    data
  })
}

// 修改商户状态
export function modBusinessStatus(data) {
  return request({
    url: 'App/Business_BusinessController/ModBusinessStatus',
    method: 'post',
    data
  })
}

// 重置密码
export function resetBusinessPwd(data) {
  return request({
    url: 'App/Business_BusinessController/ResetBusinessPwd',
    method: 'post',
    data
  })
}

// 重置商户密钥
export function resetBusinessPK(data) {
  return request({
    url: 'App/Business_BusinessController/ResetBusinessPK',
    method: 'post',
    data
  })
}

// 重置商户谷歌密钥
export function resetBusinessGA(data) {
  return request({
    url: 'App/Business_BusinessController/ResetBusinessGA',
    method: 'post',
    data
  })
}

// 获取商户钱包
export function getBusinessWallet(data) {
  return request({
    url: 'App/Business_BusinessWalletController/GetBusinessWallet',
    method: 'post',
    data
  })
}

// 添加商户钱包
export function addBusinessWallet(data) {
  return request({
    url: 'App/Business_BusinessWalletController/AddBusinessWallet',
    method: 'post',
    data
  })
}

// 获取商户钱包记录
export function getsBusinessWalletRecord(data) {
  return request({
    url: 'App/Business_BusinessWalletController/GetsBusinessWalletRecord',
    method: 'post',
    data
  })
}