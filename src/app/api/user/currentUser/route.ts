import { auth } from "@/auth";
import connectDB from "@/lib/connectDB";
import User from "@/model/user.model";
import {  NextResponse } from "next/server";


export async function GET(){
    try {
        await connectDB();

        const session = await auth();

        const user = await User.findOne({email:session?.user?.email}).select("-password");

        if(!user){
             return NextResponse.json({ message: "NO USER FOUND" }, { status: 400 });
        }

        return NextResponse.json({user} , {status:200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}