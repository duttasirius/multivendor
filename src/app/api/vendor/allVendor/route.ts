import connectDB from "@/lib/connectDB";
import User from "@/model/user.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const vendors = await User.find({ role: "vendor" })
      .sort({ createdAt: -1 })
      .populate("vendorProducts");

    if (!vendors) {
      return NextResponse.json({ message: "NO USER FOUND" }, { status: 400 });
    }

    return NextResponse.json({ vendors }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
