import { request } from '@/axios';
import { ContainerBaseEntity, ResponseParams } from '@/entity';

class UserInfoApi {
    /** 改变名字 */
    async updateInfo(id: string, userName: string) {
        return request({
            method: "POST",
            url:'/userInfo',
            data:{
                id,
                userName
            },
            // type:'mock'
        }).then((res)=>new ContainerBaseEntity<ResponseParams<boolean>>(res.data))
    }
}

/** 用户信息api相关实例 */
export const userInfoApi = new UserInfoApi()
