// ./api/request.js
import axios from "../http/request"

export const moveImgToAlbumReq = (data) => {
    // 移动图片到某相册
    return axios({
        url: 'album/image',
        method: 'post',
        data
    })
}

export const setAlbumCoverReq = (pid) => {
    // 设置相册封面
    return axios({
        url: 'album/cover',
        method: "put",
        data: {
            pid: pid
        }
    })
}

export const getAlbumListReq = (data) => {
    // 获取相册列表
    return axios({
        url: 'album/album',
        method: 'get',
        data
    })
}

export const newAlbumReq = (data) => {
    // 新建相册
    return axios({
        url: 'album/album',
        method: 'post',
        data
    })
}

export const delAlbumReq = (data) => {
    // 删除相册
    return axios({
        url: 'album/album',
        method: 'delete',
        data
    })
}

export const editAlbumReq = (data) => {
    // 编辑相册
    return axios({
        url: 'album/album',
        method: 'put',
        data
    })
}