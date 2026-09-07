import { auth } from "@/auth";
import connectDB from "@/lib/connectDB";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

await connectDB()

  try {
    const { shopName, shopAddress, gstNumber } = await req.json();
    if (!shopName || !shopAddress || !gstNumber) {
      return NextResponse.json({ message: "INCOMPLETE DETAILS" }, { status: 400 });
    }
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
    }
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { shopName, shopAddress, gstNumber, verificationStatus: "pending", requestedAt: new Date() },
      { returnDocument: "after" }
    );
    if (!user) {
      return NextResponse.json({ message: "NO USER FOUND" }, { status: 404 });
    }
    return NextResponse.json({ message: "VENDOR DETAILS UPDATED SUCCESSFULLY", user }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}