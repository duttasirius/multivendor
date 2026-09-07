import { auth } from "@/auth";
import connectDB from "@/lib/connectDB";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try {
        await connectDB();
        const session = await auth();
        const adminUser = await User.findById(session?.user?.id)

        if(!adminUser || adminUser.role !== "admin"){
            return NextResponse.json({message:"NOT AUTHORIZED"} , {status:403})
        }

        const {vendorId , status , rejectedReason} = await req.json();

        if(!vendorId || !status){
            return NextResponse.json({message:"MISSING DETAILS"} , {status:403})
        }

        const vendor = await User.findById(vendorId)

        if(status === "approved"){
            vendor.verificationStatus = "approved";
            vendor.isApproved = true;
            vendor.approvedAt = new Date();
            vendor.rejectedReason = undefined

        }



        if(status === "rejected"){
            vendor.verificationStatus = "rejected";
            vendor.isApproved = false;
            
            vendor.rejectedReason = rejectedReason || "Rejected by Admin"

        }

        await vendor.save()

        return NextResponse.json({message:"VENDOR STATUS UPDATED SUCCESSFULLY" , vendor} , {status:200})

    } catch (error) {
     console.log(error)   
    }
}