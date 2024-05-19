import { vertify } from "@/actions/verification";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {code , token} = await req.json();
    return vertify({code},token || '').then((res)=>{
        return NextResponse.json(res)
    })
}