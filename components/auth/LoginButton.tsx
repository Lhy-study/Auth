'use client'
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: ReactNode;
    mode?: 'modal' | 'redirect';
    asChild?: boolean;
}

const LoginButton = ({
    children, mode = 'redirect', asChild }:
    LoginButtonProps
) => {
    const router = useRouter();
    const onClick = () => {
        router.push('/auth/login');
    };
    if(mode === 'modal'){
        return <span>
            TODO : 实现模型
        </span>
    }
    return (
        <span
            className="cursor-pointer flex justify-center"
            onClick={onClick}
        >
            {children}
        </span>
    )
}
export default LoginButton