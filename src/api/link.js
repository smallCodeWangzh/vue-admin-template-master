import request from "@/utils/request"

export function getAllLink() {
    return request({
      url : "link/get",
      method : "get"
    })
  }
  
export function deleteLink(params) {
    return request({
      url : "link/deleteById",
      method : "get",
      params
    })
}

export function getLinkInfo(params) {
  return request({
    url : "link/getById",
    method : "get",
    params
  })
}

export function updateLink(params) {
  return request({
    url : "link/updateById",
    method : "post",
    params
  })
}

export function save(params) {
  return request({
    url : "link/save",
    method : "post",
    params
  })
}