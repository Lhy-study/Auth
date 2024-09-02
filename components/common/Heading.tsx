'use client';

import toast from "react-hot-toast";
import { Menu } from "./Menu";
import { ModeToggle } from "./ModeToggle";

export const Heading = () => {
  const open = ()=>{
    toast.success('成功！')
  } 
  return (
    <div className="flex justify-between w-full px-4 py-2">
        <Menu onClick={open}/>
        <ModeToggle />
    </div>
  )
}