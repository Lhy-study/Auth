import { newPassword } from "@/actions/newPassword";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const { email } = await req.json();
    console.log(email)
    return newPassword(email).then((res)=>{
        return NextResponse.json(res)
    });
}