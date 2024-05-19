import { db } from "@/lib/db";
import { getIsVertify, getVerificationTokenByToken } from "@/data/verificiation-token";
import { CodeSchema } from "@/schemas";
import * as z from "zod";

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