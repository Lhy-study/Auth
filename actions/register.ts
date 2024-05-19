'use server'
import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { generateCode } from "@/lib/verificationCode";
import { sendEmail } from "@/lib/email";
import { emailTemplate } from "@/lib/template";

/** 注册 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const vaildatedFields = RegisterSchema.safeParse(values);

    if (!vaildatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, name, password } = vaildatedFields.data;
    const hashedPassword = await bcrypt.hash(password,10);
    const existingUser = await getUserByEmail(email);

    if(existingUser?.name){
        return {
            error : '该用户已存在'
        }
    }

    await db.user.create({
        data:{
            email,
            name,
            password:hashedPassword
        }
    });

    // 生成验证码
    const code = generateCode();
    const verificationToken = await generateVerificationToken(email , code);
    sendEmail({
        to: email,
        subject: '请验证验证您的邮箱',
        text:'欢迎来到Auth!',
        html:emailTemplate(email,code,process.env.BASEDOMAIN+`/auth/new-verification?token=${verificationToken.token}`)
    });

    return { success: "验证码已发送!" };
}