import request from '@/utils/request'

// 查询运动库信息列表
export function listExercise(query) {
  return request({
    url: '/system/exercise/list',
    method: 'get',
    params: query
  })
}

// 查询运动库信息详细
export function getExercise(id) {
  return request({
    url: '/system/exercise/' + id,
    method: 'get'
  })
}

// 新增运动库信息
export function addExercise(data) {
  return request({
    url: '/system/exercise',
    method: 'post',
    data: data
  })
}

// 修改运动库信息
export function updateExercise(data) {
  return request({
    url: '/system/exercise',
    method: 'put',
    data: data
  })
}

// 删除运动库信息
export function delExercise(id) {
  return request({
    url: '/system/exercise/' + id,
    method: 'delete'
  })
}
