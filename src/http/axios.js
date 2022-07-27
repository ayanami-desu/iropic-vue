import axios from "axios";
import { globalConfig } from '../stores/global-config.js'
import router from "../router";


const service = axios.create({
    baseURL: globalConfig.apiUrl,
    timeout: 10000,
}); //axios对象，设置公共地址和超时

//请求拦截
service.interceptors.request.use(config => {
    //每次发送请求之前判断是否存在 token，如果存在，则统一在 http 请求的 header 都加上 token，不用每次请求都手动添加了
    const token = window.localStorage.getItem('accessToken');
    //非外部链接，才增加 token 到请求头
    if (!config.url.startsWith("http")) {
        token && (config.headers['Authorization'] = 'Bearer ' + token)
    }
    return config;
},error => {
    console.log(error)
});

// 响应拦截
service.interceptors.response.use(response => {
    if (response.data.code){
        //此部分对自定义的错误码进行相应处理
        if (response.data.code === 401) {
            router.push('/login')
            return Promise.reject(response);
        }
        
    }
    return response.data;
},error => {
    if (error.response.status === 401){
        router.push('/login')
    }
    return Promise.reject(error)
});

export default service;