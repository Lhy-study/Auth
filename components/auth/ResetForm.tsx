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
import { ResetSchema } from "@/schemas";
import CardWrapper from "./CardWrapper";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { request } from "@/axios";

const ResetForm = () => {
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    }
  });
  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    request({
      method:"POST",
      url:"/api/auth/newPassword",
      data:{
        ...values
      }
    }).then(({data})=>{
      toast.success(data.success);
    })
  }
  return (
    <CardWrapper
      headerLabel="重置密码!"
      backButtonLabel='返回登录界面'
      backButtonHref='/auth/login'
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
          </div>
          <Button className="w-full">
            发送验证邮箱
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
export default ResetForm