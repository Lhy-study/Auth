'use client'
import { Protect } from "@icon-park/react";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/LoginButton";
// background-image: linear-gradient(to right top, #6d327c, #485DA6, #00a1ba, #00BF98, #36C486);
// bg-gradient-to-tr from-cyan-500 form[#485DA6], #00a1ba, #00BF98, #36C486)
export default function Home() {
  return (
    <main className="w-full h-full  flex justify-center items-center" style={{backgroundImage:'linear-gradient(to right top, #ffffff, #eff1f9, #dae4f3, #c0d9eb, #a4cfdf, #8fb7c9, #7ba0b4, #688a9f, #596376, #44404c, #272226, #000000);'}}>
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
