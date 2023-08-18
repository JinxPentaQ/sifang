import request from '@/utils/request'

// 会员列表
export function getsUser(data) {
  return request({
    url: 'App/User_UserController/GetsUser',
    method: 'post',
    data
  })
}
// 会员信息
export function getUser(data) {
  return request({
    url: 'App/User_UserController/GetUser',
    method: 'post',
    data
  })
}
// 修改会员状态
export function modUserStatus(data) {
  return request({
    url: 'App/User_UserController/ModUserStatus',
    method: 'post',
    data
  })
}

// 重置密码
export function resetUserPwd(data) {
  return request({
    url: 'App/User_UserController/ResetUserPwd',
    method: 'post',
    data
  })
}

// 重置用户谷歌密钥
export function resetUserGA(data) {
  return request({
    url: 'App/User_UserController/ResetUserGA',
    method: 'post',
    data
  })
}

// 获取用户钱包
export function getUserWallet(data) {
  return request({
    url: 'App/User_UserWalletController/GetUserWallet',
    method: 'post',
    data
  })
}

// 添加用户钱包
export function addUserWallet(data) {
  return request({
    url: 'App/User_UserWalletController/AddUserWallet',
    method: 'post',
    data
  })
}

// 获取用户钱包记录
export function getsUserWalletRecord(data) {
  return request({
    url: 'App/User_UserWalletController/GetsUserWalletRecord',
    method: 'post',
    data
  })
}
// 修改用户钱包
export function modUserWallet(data) {
  return request({
    url: '	App/User_UserWalletController/ModUserWallet',
    method: 'post',
    data
  })
}