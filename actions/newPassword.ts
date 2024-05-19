import { v4 as uuidv4 } from "uuid";
import { getPasswordTokenByEmail, getPasswordTokenByToken } from "@/data/new-password";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { newPasswordTemplate } from "@/lib/template";

/** 修改密码 - 发送邮件 */
export const newPassword = async (email:string) => {
    const passwordToken = await getPasswordTokenByEmail(email);
    let result;
    const token = uuidv4();
    if(passwordToken){
        result = await db.newPasswordToken.update({
            where:{
                id:passwordToken.id,
            },
            data:{
                token,
                expires:new Date(Date.now() + 600 * 1000)
            }
        });
    }else{
        result  = await db.newPasswordToken.create({
            data:{
                email,
                expires:new Date(Date.now() + 600 * 1000),
                token,
            }
        });
    }
    sendEmail({
        to: email,
        subject: "修改密码",
        html:newPasswordTemplate(email , process.env.BASEDOMAIN+`/auth/new-password?token=${result.token}`)
    });

    return { success : '邮件发送成功' }
}