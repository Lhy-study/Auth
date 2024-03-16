import * as z from "zod";

//登录模式
export const LoginSchema = z.object({
    email:z.string().email({
        message:"邮箱是必须填的"
    }),
    password:z.string().min(1,{
        message:'您必须填写密码'
    })
});