import request from '@/utils/request'
import qs from 'qs'

/**
 * 发送验证码
 * @param {account, scene} data 账号/场景
 */
export function sendCode(data) {
  return request({
    url: '/api/message/sendCode',
    method: 'post',
    data: qs.stringify(data)
  })
}
