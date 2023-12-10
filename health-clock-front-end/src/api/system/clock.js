import request from '@/utils/request'

// 查询打卡记录信息列表
export function listClock(query) {
  return request({
    url: '/system/clock/list',
    method: 'get',
    params: query
  })
}

// 统计打卡记录信息
export function selectPPunchClockStatisticsList(query) {
  return request({
    url: '/system/clock/selectPPunchClockStatisticsList',
    method: 'get',
    params: query
  })
}

// 查询打卡记录信息详细
export function getClock(id) {
  return request({
    url: '/system/clock/' + id,
    method: 'get'
  })
}

// 新增打卡记录信息
export function addClock(data) {
  return request({
    url: '/system/clock',
    method: 'post',
    data: data
  })
}

// 修改打卡记录信息
export function updateClock(data) {
  return request({
    url: '/system/clock',
    method: 'put',
    data: data
  })
}

// 删除打卡记录信息
export function delClock(id) {
  return request({
    url: '/system/clock/' + id,
    method: 'delete'
  })
}
