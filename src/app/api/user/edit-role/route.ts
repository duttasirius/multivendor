import { auth } from "@/auth";
import connectDB from "@/lib/connectDB";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";




export async function POST(req: NextRequest) {
    try {

        // Connect to MongoDB
        await connectDB();

        // Get phone and role from the request body
        const { phone, role } = await req.json();

        // Get the currently logged-in user's session
        const session = await auth();

        // Check if user is logged in
        if (!session?.user?.email) {
            return NextResponse.json(
                {
                    success: false,
                    message: "You are not logged in",
                },
                {
                    status: 401,
                }
            );
        }

        // Update the logged-in user's role and phone number
        const user = await User.findOneAndUpdate(
            {
                email: session.user.email,
            },
            {
                role: role,
                phone: phone,
            },
            {
                new: true,
            }
        );

        // Check if user was found
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        // Send updated user back to frontend
        return NextResponse.json(
            {
                success: true,
                message: "Profile updated successfully",
                user,
            },
            {
                status: 200,
            }
        );

    } catch (error) {

        console.error("Error updating user:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while updating profile",
            },
            {
                status: 500,
            }
        );
    }
}