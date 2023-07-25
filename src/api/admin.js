import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: 'App/Admin_AdminController.Login',
    method: 'post',
    data
  })
}
// 退出登录
export function logout() {
  return request({
    url: 'Admin/Admin_AdminController.logout',
    method: 'post'
  })
}
// 获取管理员列表
export function getAdmin(params) {
  return request({
    url: 'App/Admin_AdminController.GetsAdminUser',
    method: 'post',
    params
  })
}
// 添加管理员
export function addAdmin(params) {
  return request({
    url: 'App/Admin_AdminController.AddAdminUser',
    method: 'post',
    params
  })
}
// 删除管理员
export function delAdmin(params) {
  return request({
    url: 'App/Admin_AdminController.DelAdminUser',
    method: 'post',
    params
  })
}
// 重置管理员密码
export function resetAdminPwd(params) {
  return request({
    url: 'App/Admin_AdminController.ResetAdminPwd',
    method: 'post',
    params
  })
}
// 修改密码
export function modAdminPwd(params) {
  return request({
    url: 'App/Admin_AdminController/ModAdminPwd',
    method: 'post',
    params
  })
}

export function getInfo() {
  return request({
    url: 'Admin/Admin_AdminController.getInfo',
    method: 'post'
  })
}

export function getHomeData(params) {
  return request({
    url: 'Admin/Common_CommonController.GetHomeData',
    method: 'post',
    params
  })
}
// 获取权限
export function getAdminPermissions(params) {
  return request({
    url: 'App/Admin_AdminController/GetAdminPermissions',
    method: 'post',
    params
  })
}

// 绑定谷歌验证器
export function createGoogleAuth(params) {
  return request({
    url: 'App/Admin_AdminController/CreateGoogleAuthenticator',
    method: 'post',
    params
  })
}

