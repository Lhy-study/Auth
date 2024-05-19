import { db } from "@/lib/db";

/** 是否已经验证过了，阻止重复验证 */
export const getIsVertify = async (email:string) => {
    return await db.user.findUnique({
        where:{
            email
        }
    });
}

/** 通过邮箱获取验证令牌 */
export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: { email }
        });

        return verificationToken;
    } catch (error) {
        return null
    }
}

/** 通过令牌获取验证令牌 */
export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: { token }
        });
        return verificationToken;
    } catch (error) {
        console.log(error)
        return null
    }
}