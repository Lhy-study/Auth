/** 生成验证码 */
export function generateCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/** 邮箱验证模板 */
export const emailTemplate = (email:string , code : string , url:string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            margin-top: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #444;
        }
        p {
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>验证您的邮箱</h1>
        <p>尊敬的${email}用户，您好！</p>
        <p>我需要验证您的邮箱，以便帮助我我们验证您在Auth的身份。</p>
        <p>这组验证码只能使用一次，如果您并未请求获得验证码，请忽略这封邮箱。请勿与他人分享这组验证码。</p>
        <p><strong>${code}</strong></p>
        <p>请注意：该验证码将在10分钟后失效，请尽快使用。</p>
        <p>验证地址：<a href="${url}">${url}</a></p>
    </div>
</body>
</html>
` 
