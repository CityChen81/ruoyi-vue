import request from '@/utils/request'

// 分页查询元数据列表
export function searchAaTopic(param) {
  return request({
    url: '/ry-vue-service/v1/aa-topic/search',
    method: 'get',
    // 使用 get 时，参数通过 params 传递
    params: param
  })
}

// 详情
export function getAaTopic(param) {
  return request({
    url: '/ry-vue-service/v1/aa-topic/get',
    method: 'get',
    params: param
  })
}

// 新增
export function createAaTopic(param) {
  return request({
    url: '/ry-vue-service/v1/aa-topic/create',
    method: 'post',
    data: param
  })
}

// 删除
export function deleteAaTopic(param) {
  return request({
    url: '/ry-vue-service/v1/aa-topic/delete',
    method: 'post',
    data: param
  })
}

// 获取元数据类别列表
export function getSelectList() {
  return request({
     url: '/ry-vue-service/v1/aa-topic/getSelectList',
     method: 'get'
  })
}
