'use server'
import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";

/** 注册 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const vaildatedFields = RegisterSchema.safeParse(values);

    if (!vaildatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, name, password } = vaildatedFields.data;
    const hashedPassword = await bcrypt.hash(password,10);
    const existingUser = await db.user.findUnique({
        where: { email }
    });

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

    return { success: "创建成功!" };
}