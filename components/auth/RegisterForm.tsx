'use client';

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
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
import { RegisterSchema } from "@/schemas";
import CardWrapper from "./CardWrapper";
import { Button } from "../ui/button";
import { register } from "@/actions/register";

const RegisterForm = () => {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name:'',
            email: '',
            password: ''
        }
    });
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        register(values).then((res)=>{
            if (res?.error) {
                toast.error(res?.error)
              }
              if (res?.success) {
                toast.success(res?.success);
                form.reset();
              }
        });
    }
    return (
        <CardWrapper
            headerLabel="创建用户"
            backButtonLabel='已有账号？'
            backButtonHref='/auth/login'
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                    <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Nickname
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="请输入您的昵称"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        注册
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
export default RegisterForm