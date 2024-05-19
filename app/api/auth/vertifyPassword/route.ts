import { newPassword } from "@/actions/verification";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {password , token} = await req.json();
    return newPassword(token , password).then((res)=>{
        return NextResponse.json(res)
    })
}