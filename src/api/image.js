// ./api/request.js
import axios from "../http/request"

export const getImgListReq = (data) => {
    // 获取图片列表
    return axios({
        url: 'image/images',
        method: 'post',
        data
    })
}

export const getRandomImgReq = (data) => {
    // 获取随机图片
    return axios({
        url: 'image/random',
        method: 'get',
        data
    })
}

export const deleteImgReq = (data) => {
    // 删除图片
    return axios({
        url: 'image/image',
        method: 'delete',
        data
    })
}

export const setImgGroupReq = (data) => {
    // 将图片差分设为一组
    return axios({
        url: 'image/group',
        method: 'post',
        data
    })
}

export const getImgInfoReq = (data) => {
    // 获取图片详细信息
    return axios({
        url: 'image/info',
        method: 'get',
        data
    })
}

export const putImgLabelReq = (data) => {
    //为图片增加标签
    return axios({
        url: 'image/info',
        method: 'put',
        data
    })
}
export const delImgLabelReq = (data) => {
    //为图片删除标签
    return axios({
        url: 'image/info',
        method: 'delete',
        data
    })
}

export const setImgR18Req = (data) => {
    //设置图片为R18
    return axios({
        url: 'image/r18',
        method: 'post',
        data
    })
}

export const cancelImgR18Req = (data) => {
    //取消图片R18
    return axios({
        url: 'image/r18',
        method: 'put',
        data
    })
}

export const getImageSeqReq = (data) => {
    //获取还没有打标签的图片
    return axios({
        url: 'image/seq',
        method: 'get',
        data
    })
}