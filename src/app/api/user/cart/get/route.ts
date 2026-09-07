import { auth } from "@/auth";
import connectDB from "@/lib/connectDB";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    try {
        await connectDB()

        const session = await auth();

          // Stop the request if the user is not authenticated.
            if (!session?.user?.id) {
              return NextResponse.json(
                { message: "Unauthorized access" },
                { status: 401 }
              );
            }

            const user = await User.findById(session.user.id).populate("cart.product");

            if(!user){
                return NextResponse.json(
                { message: "Unauthorized access" },
                { status: 401 }
              );
            }
// cart → the property name you want in the response
// user.cart → the value you're putting into that property

            return NextResponse.json({cart:user.cart}, {status:200})


    } catch (error) {
        console.log(error)
    }
}