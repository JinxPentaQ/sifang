import request from '@/utils/request'

// 获取收款信息列表
export function getsReceiptInfo(data) {
  return request({
    url: 'App/User_UserReceiptInfoController/GetsReceiptInfo',
    method: 'post',
    data
  })
}
// 审核收款信息
export function configReceiptInfo(data) {
  return request({
    url: 'App/User_UserReceiptInfoController/ConfigReceiptInfo',
    method: 'post',
    data
  })
}
// 删除收款信息
export function delReceiptInfo(data) {
  return request({
    url: 'App/User_UserReceiptInfoController/DelReceiptInfo',
    method: 'post',
    data
  })
}