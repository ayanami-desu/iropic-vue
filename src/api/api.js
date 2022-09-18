// ./api/request.js
import axios from "../http/request"

export const getTokenReq = (data) => {
    return axios({
        url: 'login',
        method: 'post',
        data
    })
}

export const refreshTokenReq = (data) => {
    return axios({
        url: 'token/refresh/',
        method: 'post',
        data
    })
}

export const checkLoginReq = (data) => {
    //检查是否登录
    return axios({
        url: 'login/check',
        method: 'get',
        data
    })
}