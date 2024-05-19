'use server'
import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendEmail } from "@/lib/email";
import { generateCode } from "@/lib/verificationCode";
import { emailTemplate } from "@/lib/template";

/** 验证登录 */
export const login = async (values: z.infer<typeof LoginSchema>) => {
    const vaildatedFields = LoginSchema.safeParse(values);

    if (!vaildatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = vaildatedFields.data;

    const existingUser =await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        return { error : "电子邮箱不存在!" }
    }

    if(!existingUser.emailVerified){
        const code = generateCode();
        const verificationToken = await generateVerificationToken(existingUser.email,code);
        let res = await sendEmail({
            to: verificationToken.email,
            subject: '验证您的邮箱',
            text:'欢迎来到Auth!',
            html:emailTemplate(email,code,process.env.BASEDOMAIN+`/auth/new-verification?token=${verificationToken.token}`)
          });
    
        return { success : '验证码已发送至您的邮箱！' }
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: '密码错误!' }
                default : 
                    return { error : "Something went wrong!" }
            }
        }
        throw error;
    }
}