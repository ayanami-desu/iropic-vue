// ./api/request.js
import axios from "../http/request"

export const searchLabelReq = (key) => {
    // 从开头按关键词匹配标签
    return axios({
        url: 'label/query',
        method: 'get',
        data: {
            key: key
        }
    })
}

export const getLabelListReq = () => {
    // 获取全部标签
    return axios({
        url: 'label/labels',
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

export const delLabelReq = (data) => {
    // 删除标签
    return axios({
        url: 'label/label',
        method: 'delete',
        data
    })
}