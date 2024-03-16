'use client';

import { Windows , Github } from "@icon-park/react"
import { Button } from "../ui/button";

const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
        <Button
            size='lg'
            className='w-full'
            variant='outline'
            onClick={()=>{}}
        >
            <Windows size='20'/>
        </Button>
        <Button
            size='lg'
            className='w-full'
            variant='outline'
            onClick={()=>{}}
        >
            <Github size='20'/>
        </Button>
    </div>
  );
};
export default Social;