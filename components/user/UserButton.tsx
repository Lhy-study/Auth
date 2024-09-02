'use client'

import { Fragment, ReactNode } from "react";
import { observer } from "mobx-react";
import { Logout, Setting, UserBusiness } from "@icon-park/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { TransFormIcon } from "@/components/common/TransFormIcon"
import { userControlStore } from "@/store"
import { useForm } from "react-hook-form";

interface DropdownMenuItemProProps{
    label:string;
    Icon:ReactNode;
    onClick?:()=>void
}

/** 用户按钮组件 */
export const UserButton = observer(() => {
    const form = useForm()
    const userInfo = useCurrentUser();
    const logout = () => {
        signOut();
    }

    /** 打开 */
    const open = ()=>{
        let timer = setTimeout(()=>{
            userControlStore.setOpen(true);
            clearTimeout(timer)
        },100)
    }

    const DropdownMenuItemPro = ({
        label,Icon,onClick
    }:DropdownMenuItemProProps) => {
        return <DropdownMenuItem className="flex gap-x-1 whitespace-pre cursor-pointer" onClick={onClick}>
            {Icon}
            {label}
        </DropdownMenuItem>
    }

    const MenuListData = [
        { label: '个人信息' , Icon: TransFormIcon({
            children: <UserBusiness
                theme="outline"
                size="16"
                fill='#333'
            />
        }) , onClick:()=>{}},
        { label: '设置' , Icon: TransFormIcon({
            children: <Setting
                theme="outline"
                size="16"
                fill='#333'
            />
        }) , onClick:open },
        { label: '注销' , Icon: TransFormIcon({
            children: <Logout
                theme="outline"
                size="16"
                fill='#333'
            />
        }) , onClick:signOut },
    ]
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild><Avatar>
                <AvatarImage src={userInfo?.image || '/defaultUser.jpg'} className="cursor-pointer" />
                <AvatarFallback>User</AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <div className="space-y-2">
                        <h2>{userInfo?.name}</h2>
                        <p className=" text-zinc-400">{userInfo?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem className="flex gap-x-1 whitespace-pre cursor-pointer">
                    {TransFormIcon({
                        children: <UserBusiness
                            theme="outline"
                            size="16"
                            fill='#333'
                        />
                    })}
                    个人信息
                </DropdownMenuItem> */}
                {
                    MenuListData.map((item)=>(
                        <Fragment key={item.label}>
                            {DropdownMenuItemPro({...item})}
                        </Fragment>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
})