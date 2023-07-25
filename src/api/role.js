import request from '@/utils/request'

// 角色列表
export function getRole(data) {
  return request({
    url: 'App/Role_RoleController/GetsRole',
    method: 'post',
    data
  })
}
// 获取权限
export function getsPermission(data) {
  return request({
    url: 'App/Role_RoleController/GetsPermission',
    method: 'post',
    data
  })
}
// 设置权限
export function setPermission(data) {
  return request({
    url: 'App/Role_RoleController/SetPermission',
    method: 'post',
    data
  })
}
// 删除权限
export function delPermission(data) {
  return request({
    url: 'App/Role_RoleController/DelPermission',
    method: 'post',
    data
  })
}
// 获取角色权限
export function getRolesPermission(data) {
  return request({
    url: 'App/Role_RoleController/GetsRolesPermission',
    method: 'post',
    data
  })
}

// 设置角色权限
export function setRolesPermission(data) {
  return request({
    url: 'App/Role_RoleController/SetRolesPermission',
    method: 'post',
    data
  })
}
