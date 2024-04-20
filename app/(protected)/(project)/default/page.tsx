'use client';
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const page = () => {
  return (
    <div>
      <Button onClick={()=>{
        toast.error('成功',{
          position:'top-center',
          duration:2000
        });
        console.dir(toast)
      }}>toast</Button>
    </div>
  )
}
export default page