'use client'

import { ApplicationMenu } from "@icon-park/react"
import { Button } from "../ui/button"
import { TransFormIcon } from "./TransFormIcon"

interface MenuProps{
    /** 可以做展开菜单事件等 */
    onClick?:()=>void
}

/** 适配移动端菜单 */
export const Menu = ({
    onClick
}:MenuProps) => {
  return (
    <Button variant="ghost" size="icon" onClick={onClick}>
      {TransFormIcon({children:<ApplicationMenu theme="outline" size="24" fill="#333"/>})}
    </Button>
  )
}