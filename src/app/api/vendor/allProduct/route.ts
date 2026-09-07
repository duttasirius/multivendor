import connectDB from "@/lib/connectDB";
import Product from "@/model/product.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
      .populate({
        path: "reviews.user",
        select: "name email image",
      })
      .populate("vendor", "name email shopName")
      .sort({ createdAt: -1 });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
