'use client'

import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  FormLabel
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation"

import CardWrapper from "./CardWrapper";
import { PasswordSchema } from "@/schemas/index";
import toast from "react-hot-toast";
import { request } from "@/axios";

export const NewPasswordForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
    },
  })
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  function onSubmit(data: z.infer<typeof PasswordSchema>) {
    request({
      url:'/api/auth/vertifyPassword',
      method:"POST",
      data:{
        ...data,
        token,
      }
    }).then(({data})=>{
      if (data?.error) {
        toast.error(data.error)
      }
      if (data?.success) {
        toast.success(data.success);
        router.replace('/auth/login');
      }
    })
  }
  return (
    <CardWrapper
      headerLabel="请输入您的新密码"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        <Button type="submit" className="w-full">提交</Button>
      </form>
    </Form>
      </div>
    </CardWrapper>
  )
}