import request from '@/utils/request'

/**
 * 发送验证码
 * @param {account, scene} data 账号/场景
 */
export function sendCode(data) {
  return request({
    url: '/cultures/message/sendCode',
    method: 'post',
    data
  })
}
