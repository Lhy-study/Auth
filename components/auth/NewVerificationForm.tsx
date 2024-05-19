'use client'

import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation"

import CardWrapper from "./CardWrapper";
import { CodeSchema } from "@/schemas/index";
import toast from "react-hot-toast";
import { request } from "@/axios";

export const NewVerificationForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof CodeSchema>>({
    resolver: zodResolver(CodeSchema),
    defaultValues: {
      code: "",
    },
  })
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  function onSubmit(data: z.infer<typeof CodeSchema>) {
    request({
      url:'/api/auth/vertify',
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
        router.replace('/default');
      }
    })
  }
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
               请输入您的验证码
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">验证</Button>
      </form>
    </Form>
      </div>
    </CardWrapper>
  )
}