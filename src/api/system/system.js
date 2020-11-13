import request from '@/utils/request'

/**
 * 七牛上传图片
 */
export function qiniuUploadImage(data) {
  return request({
    url: '/cultures/system/qiniuUploadImage',
    method: 'post',
    data
  })
}

/**
 * 七牛获取token
 */
export function qiniuGetTokenAndKey(data) {
  return request({
    url: '/cultures/system/qiniuGetTokenAndKey',
    method: 'post',
    data
  })
}

export function uploadQiniu(data) {
  return request({
    url: 'https://up.qiniup.com',
    method: 'post',
    data
  })
}

