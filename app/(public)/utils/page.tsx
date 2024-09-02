'use client'

import { fileChange } from "@/utils/fileTransForm"

const Utilspage = () => {
    fileChange
  return (
    <div>
        <input type="file" onChange={(e)=>{fileChange(e.target.files[0])}}/>
    </div>
  )
}
export default Utilspage