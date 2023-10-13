import request from '@/utils/request'

// 获取首页统计
export function getHomeReport(data) {
  return request({
    url: 'App/Report_ReportController/GetHomeReport',
    method: 'post',
    data
  })
}
// 获取三方钱包
export function getHomeWallet(data) {
  return request({
    url: 'App/Platform_PlatformWalletController/GetAllPlatformWallet',
    method: 'post',
    data
  })
}