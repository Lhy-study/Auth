import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verificiation-token";

/** 生成令牌 */
export const generateVerificationToken = async (email: string , code:string) => {
    const token = uuidv4();

    /** 一小时有效期 */
    const expires = new Date(Date.now() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if(existingToken){
        await db.verificationToken.delete({
            where:{
                id : existingToken.id
            }
        });
    }

    const verificiationToken = await db.verificationToken.create({
        data:{
            email,
            token,
            expires,
            code
        }
    });

    return verificiationToken;
}