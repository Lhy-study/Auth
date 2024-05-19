'use client';

import { Windows, Github } from "@icon-park/react"
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

type Providers = 'Github'
const Social = () => {
    const onClick = (provider: Providers) => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        });
    }
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size='lg'
                className='w-full'
                variant='outline'
                disabled={true}
                onClick={() => {
                    toast.error('抱歉，暂时不支持微软邮箱')
                }}
            >
                <Windows size='20' />
            </Button>
            <Button
                size='lg'
                className='w-full'
                variant='outline'
                onClick={() => { onClick('Github') }}
            >
                <Github size='20' />
            </Button>
        </div>
    );
};
export default Social;