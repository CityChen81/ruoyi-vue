import request from '@/utils/request'

// 查询easy_brush列表
export function listTopic(query) {
  return request({
    url: '/brush/topic/list',
    method: 'get',
    params: query
  })
}

// 查询easy_brush详细
export function getTopic(id) {
  return request({
    url: '/brush/topic/' + id,
    method: 'get'
  })
}

// 新增easy_brush
export function addTopic(data) {
  return request({
    url: '/brush/topic',
    method: 'post',
    data: data
  })
}

// 修改easy_brush
export function updateTopic(data) {
  return request({
    url: '/brush/topic',
    method: 'put',
    data: data
  })
}

// 删除easy_brush
export function delTopic(id) {
  return request({
    url: '/brush/topic/' + id,
    method: 'delete'
  })
}

// 导出easy_brush
export function exportTopic(query) {
  return request({
    url: '/brush/topic/export',
    method: 'get',
    params: query
  })
}

// 下载用户导入模板
export function importTemplate() {
  return request({
    url: '/brush/topic/importTemplate',
    method: 'get'
  })
}
