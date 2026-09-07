import { auth } from "@/auth";
import connectDB from "@/lib/connectDB";
import Product from "@/model/product.model";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const session = await auth();

        const adminUser = await User.findById(session?.user?.id);

        if (!adminUser || adminUser.role !== "admin") {
            return NextResponse.json(
                { message: "NOT AUTHORIZED" },
                { status: 403 }
            );
        }

        const { productId, status, rejectedReason } = await req.json();

        if (!productId || !status) {
            return NextResponse.json(
                { message: "MISSING DETAILS" },
                { status: 400 }
            );
        }

        const product = await Product.findById(productId);

        if (!product) {
            return NextResponse.json(
                { message: "PRODUCT NOT FOUND" },
                { status: 404 }
            );
        }

        if (status === "approved") {
            product.verificationStatus = "approved";
            product.isApproved = true;
            product.approvedAt = new Date();
            product.rejectedReason = undefined;
        }

        if (status === "rejected") {
            product.verificationStatus = "rejected";
            product.isApproved = false;
            product.rejectedReason =
                rejectedReason || "Rejected by Admin";
        }

        await product.save();

        return NextResponse.json(
            {
                message: "PRODUCT STATUS UPDATED SUCCESSFULLY",
                product,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("PRODUCT STATUS ERROR:", error);

        return NextResponse.json(
            { message: "INTERNAL SERVER ERROR" },
            { status: 500 }
        );
    }
}