import * as nodemailer from "nodemailer";

/** 邮箱数据 */
export interface MailInfo{
    /** 目标邮箱 */
    to:string;
   /** 标题 */
    subject:string;
    /** 文本 */
    text?:string;
    /** 富文本, 文本和富文本优先富文本 */ 
    html?:string;
}

/** 发送邮箱 */
export const sendEmail = async (mailInfo:MailInfo) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: +(process.env.MAIL_PORT || 465),
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });
    
      // 定义transport对象并发送邮件
      const info = await transporter.sendMail({
        from: `Auth <${process.env.MAIL_USER}>`,
        ...mailInfo,
      });
    
      return info;
}