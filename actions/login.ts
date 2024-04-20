'use server'
import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

/** 验证登录 */
export const login = async (values: z.infer<typeof LoginSchema>) => {
    const vaildatedFields = LoginSchema.safeParse(values);

    if (!vaildatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = vaildatedFields.data;

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
                    return { error: 'Invaild credentials!' }
                default : 
                    return { error : "Something went wrong!" }
            }
        }
        throw error;
    }
}