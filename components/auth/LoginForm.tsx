'use client';

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { LoginSchema } from "@/schemas";
import CardWrapper from "./CardWrapper";
import { Button } from "../ui/button";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit = (values:z.infer<typeof LoginSchema>)=>{
    console.log(values)
  }
  return (
    <CardWrapper
      headerLabel="欢迎回来!"
      backButtonLabel='还没有账号？前往注册吧!'
      backButtonHref='/auth/register'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input 
                    {...field} 
                    placeholder="请输入您的邮箱"
                    type="email"
                  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input 
                    {...field} 
                    placeholder="请输入您的密码"
                    type="password"
                  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full">
            登录
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
export default LoginForm