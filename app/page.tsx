'use client'
import { Protect } from "@icon-park/react";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/LoginButton";

export default function Home() {
  return (
    <main className="w-full h-full bg-slate-100 flex justify-center items-center">
      <div className="space-y-6">
        <div className="text-6xl font-semibold text-black flex gap-x-2 items-center">
          {/* Icon必须是客户但组件  */}
          <Protect theme="outline" className="w-16 h-16" fill="#333" />
          <h1>Auth</h1>
        </div>
        <p className="text-black text-lg">一个简单的用户验证服务</p>
        <LoginButton>
          <Button variant={'outline'} size={'lg'}>Sign in</Button>
        </LoginButton>
      </div>
    </main>
  );
}
