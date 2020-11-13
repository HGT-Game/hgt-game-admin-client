import request from '@/utils/request'
import qs from 'qs'

/**
 * 注册
 * @param {account, code} data 账号/验证码
 */
export function register(data) {
  return request({
    url: '/cultures/user/register',
    method: 'post',
    data
  })
}

/**
 * 通过账号密码进行登陆
 * @param {account, password} data 账号密码
 */
export function loginByPassword(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 通过账号验证码进行登陆
 * @param {account, code} data 账号 验证码
 */
export function loginByCode(data) {
  return request({
    url: '/cultures/user/loginByCode',
    method: 'post',
    data
  })
}

/**
 * 退出登陆
 */
export function logout() {
  return request({
    url: '/cultures/user/logout',
    method: 'post'
  })
}

/**
 * 获取用户信息
 */
export function getInfo() {
  return request({
    url: '/cultures/user/getInfo',
    method: 'post'
  })
}

