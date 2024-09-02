'use client'

import { useRequest } from "ahooks";
import { observer } from "mobx-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { userControlStore } from "@/store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { userInfoApi } from "@/apis/modules/common";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

/** 设置模态框 */
export const SettingModal = observer(() => {
  const updateInfoReq = useRequest(userInfoApi.updateInfo,{
    manual:true,
    onSuccess(data) {
      if(data.success){

      }else{
        console.log('first')
        toast.error(data.message)
      }
    },
    onError(e, params) {
      toast.error(e)
    },
  })

  const update = () => {
    updateInfoReq.run(user?.id || '',Date.now() + '')
  }

  const user = useCurrentUser();
  const onOpen = (open:boolean) => {
    console.log(open)
    if(open === false){
      userControlStore.setOpen(open);
    }
  } 
  return (
    <Dialog open={userControlStore.isOpen} onOpenChange={onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>编辑你的个人信息</DialogTitle>
          <DialogDescription>
            在这里你可以编辑你的信息、包括用户名、头像等
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              名字
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              用户名
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={update} disabled={updateInfoReq.loading}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})