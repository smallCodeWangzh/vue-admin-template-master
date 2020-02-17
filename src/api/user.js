import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/authentication/form',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/authentication/getUserDetailByToken',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/authentication/logout',
    method: 'post'
  })
}
