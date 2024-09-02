/** 将图片转化为PDF文件 */
import { PDFDocument } from "pdf-lib"
import toast from "react-hot-toast";

export const fileChange = (image: File) => {
    return new Promise(async (resolve, reject) => {
        const imgType = image.type.split('/')[1].toUpperCase(); // 提取图像类型

        if (imgType != 'JPEG' && imgType != 'PNG') {
            toast.error("图片类型必须为JPEG或PNG！")
            reject('')
            return
        }

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const arrayBuffer = await image.arrayBuffer()

        const imgEmbed = await pdfDoc.embedPng(arrayBuffer);

        const { width, height } = imgEmbed.scale(0.5);
        page.drawImage(imgEmbed, {
            x: page.getWidth() / 2 - width / 2,
            y: page.getHeight() / 2 - height / 2,
            width,
            height,
        });

        const pdfBytes = await pdfDoc.save();

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.pdf';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        resolve(url)
    })
}