import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getIsVertify, getVerificationTokenByToken } from "@/data/verificiation-token";
import { CodeSchema } from "@/schemas";
import { getPasswordTokenByToken } from "@/data/new-password";

/** 验证 */
export const vertify = async (values: z.infer<typeof CodeSchema>, token: string) => {
    const vaildatedFields = CodeSchema.safeParse(values);

    if (!vaildatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { code } = vaildatedFields.data;
    const data = await getVerificationTokenByToken(token);
    if (!data?.email) {
        return { error: '邮箱不存在' }
    }
    const isVertify = await getIsVertify(data.email);
    if(isVertify){
        return { error: '该邮箱已经验证过了，无需重复验证!' }
    }
    const time = Date.now();
    if (data.expires.getTime() < time) {
        //已过期
        return { error: '邮箱验证已过期!请重新进行验证' }
    }

    if (data.code != code) {
        return { error: '验证码输入错误!' }
    }

    await db.verificationToken.delete({
        where:{
            token:data.token
        }
    })

    //验证成功的
    console.log(data.token)
    await db.user.update({
        where: {
            email: data.email
        },
        data: {
            emailVerified: new Date()
        }
    });

    return { success: '验证成功' };
}

/** 修改密码 */
export const newPassword = async (token:string , password:string) => {
    const result = await getPasswordTokenByToken(token);
    const hashedPassword = await bcrypt.hash(password,10);
    if(!result){
        return { error : 'Invalid fields!' }
    }

    const time = Date.now();
    if(result.expires.getTime() < time){
        return { error : '有效期已过，请重新修改!' }
    }

    await db.newPasswordToken.delete({
        where:{
            token,
        }
    });

    await db.user.update({
        where:{
            email:result.email
        },
        data:{
            password:hashedPassword
        }
    });

    return { success : '密码重置成功!' }
}