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

export const RegisterSchema = z.object({
    name:z.string().min(1,{
        message:'名字长度至少为1'
    }).max(10,{
        message:'名字长度最长为7'
    }),
    email:z.string().email({
        message:"邮箱是必须填的"
    }),
    password:z.string().min(6,{
        message:'密码长度至少为6位'
    })
});

export const CodeSchema = z.object({
    code: z.string().min(6, {
      message: "您必须输入发送至您邮箱的六位验证码。",
    }),
})

export const PasswordSchema = z.object({
    password:z.string().min(6,{
        message:'密码长度至少为6位'
    })
});

export const ResetSchema = z.object({
    email:z.string().email({
        message:"邮箱是必须填的"
    }),
});