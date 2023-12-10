import request from '@/utils/request'

// 查询食物库信息列表
export function listStock(query) {
  return request({
    url: '/system/stock/list',
    method: 'get',
    params: query
  })
}

// 查询食物库信息详细
export function getStock(id) {
  return request({
    url: '/system/stock/' + id,
    method: 'get'
  })
}

// 新增食物库信息
export function addStock(data) {
  return request({
    url: '/system/stock',
    method: 'post',
    data: data
  })
}

// 修改食物库信息
export function updateStock(data) {
  return request({
    url: '/system/stock',
    method: 'put',
    data: data
  })
}

// 删除食物库信息
export function delStock(id) {
  return request({
    url: '/system/stock/' + id,
    method: 'delete'
  })
}
