import axios , { AxiosRequestConfig } from 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        type?: 'mock' | 'real'; // 可选的 type 属性
    }
}

/** mock模拟地址 */
export const mockBaseUrl = 'http://127.0.0.1:4523/m1/4972537-4630860-default'

export const request = axios.create({
    baseURL:process.env.BASEDOMAIN,
    timeout:1000 * 30,
    withCredentials:true,
});

/** 请求拦截 */
request.interceptors.request.use((config)=>{ 
    if(config.type == 'mock'){
        config.baseURL = mockBaseUrl
    }
    return config
})

/** 相应拦截 一般不做处理 */
request.interceptors.response.use((res)=>{
    // if(res.status == 200){
        
    // }
    return Promise.resolve(res)
})