import request from '@/utils/request'
import qs from 'qs'

/**
 * 汤添加
 * @param {title, description, content, sort, recommend, status} data 
 */
export function add(data) {
    return request({
        url: '/admin/question',
        method: 'post',
        data: qs.stringify(data)
    })
}

/**
 * 汤获取
 * @param {questionId} data 
 */
export function get(data) {
    return request({
        url: '/admin/question/' + data.questionId,
        method: 'get'
    })
}

/**
 * 汤添加
 * @param {questionId, title, description, content, sort, recommend, status} data 
 */
export function edit(data) {
    return request({
        url: '/admin/question/' + data.questionId,
        method: 'put',
        data: qs.stringify(data)
    })
}

/**
 * 汤列表
 * @param {page, limit} data 
 */
export function list(data) {
    return request({
        url: '/admin/question',
        method: 'get',
        params: data
    })
}

/**
 * 批量修改状态
 * @param {questionId, status} data 
 */
export function batchStatus(data) {
    return request({
        url: '/admin/question/batch/status',
        method: 'post',
        data: data
    })
}
