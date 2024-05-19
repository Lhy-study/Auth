import { db } from "@/lib/db";

/** 通过邮箱获取验证令牌 */
export const getPasswordTokenByEmail = async (email: string) => {
    try {
        const newPasswordToken = await db.newPasswordToken.findFirst({
            where: { email }
        });

        return newPasswordToken;
    } catch (error) {
        return null
    }
}

/** 通过令牌获取验证令牌 */
export const getPasswordTokenByToken = async (token: string) => {
    try {
        const newPasswordToken = await db.newPasswordToken.findUnique({
            where: { token }
        });
        return newPasswordToken;
    } catch (error) {
        console.log(error)
        return null
    }
}