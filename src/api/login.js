import request from '@/utils/request'

export function login(params) {
    return request({
        url: 'users/login',
        method: 'post',
        data: params
    })
}

export function sendMns(phone_num) {
    return request({
        url: `mns/sendMns/${phone_num}`,
        method: 'get'
    })
}
