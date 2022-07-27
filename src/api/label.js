// ./api/request.js
import axios from "../http/request"

export const searchLabelReq = (keyword) => {
    // 从开头按关键词匹配标签
    return axios({
        url: 'label/label',
        method: 'get',
        data: {
            keyword: keyword
        }
    })
}

export const getLabelListReq = () => {
    // 获取全部标签
    return axios({
        url: 'label/label',
        method: 'get',
    })
}

export const newLabelReq = (data) => {
    // 新建标签
    return axios({
        url: 'label/label',
        method: 'post',
        data
    })
}