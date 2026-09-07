import connectDB from "@/lib/connectDB";
import User from "@/model/user.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const admin = await User.findOne({ role: "admin" });

        if (!admin) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Admin user not found",
                },
                { status: 200 } // ✅ changed from 404 → 200
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Admin found successfully",
                admin,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error while finding admin:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while finding admin",
            },
            { status: 500 } // this one stays — a real server error
        );
    }
}