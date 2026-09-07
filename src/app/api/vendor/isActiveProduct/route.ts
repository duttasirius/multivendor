import { auth } from "@/auth";
import connectDB from "@/lib/connectDB";
import Product from "@/model/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Connect to MongoDB.
        await connectDB();

        // Get the current logged-in user's session.
        const session = await auth();

        // Check that the session, email, and user ID exist.
        if (!session || !session.user?.email || !session.user?.id) {
            return NextResponse.json(
                { message: "UNAUTHORIZED ACCESS" },
                { status: 401 }
            );
        }

        // Get productId and new isActive value from the request body.
        const { productId, isActive } = await req.json();

        // Find the product and update its active status.
        const product = await Product.findByIdAndUpdate(
            productId,
            { isActive },
            { new: true }
        );

        // Check whether the product exists.
        if (!product) {
            return NextResponse.json(
                { message: "NO PRODUCT FOUND" },
                { status: 404 }
            );
        }

        // Return the updated product.
        return NextResponse.json(
            { product },
            { status: 200 }
        );

    } catch (error) {
        // Print the actual error in the server console.
        console.error("TOGGLE ACTIVE ERROR:", error);

        return NextResponse.json(
            { message: "INTERNAL SERVER ERROR" },
            { status: 500 }
        );
    }
}