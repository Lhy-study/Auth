'use client'

import { ReactElement, cloneElement, isValidElement } from "react";
import { useTheme } from "next-themes";

interface TransFormProps {
    children: ReactElement<IIconProps>
}

interface IIconProps {
    theme: string;
    size: string;
    fill: string;
}

/** 根据模式改变Icon组件的颜色 */
export const TransFormIcon = ({
    children
}: TransFormProps) => {
    const { theme } = useTheme();
    const transformedChildren = isValidElement(children)
        ? cloneElement(children, { fill: theme === 'dark' ? '#ffffff' : '#333' }) // 修改fill属性为红色示例
        : children;
    return (
        <>{transformedChildren}</>
    )
}