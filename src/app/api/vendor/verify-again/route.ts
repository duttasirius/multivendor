import { auth } from "@/auth";
import connectDB from "@/lib/connectDB";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    // Get data from the request body.
    const body = await req.json();

    const shopName = body.shopName;
    const gstNumber = body.gstNumber;

    // Accept either shopAddress OR businessAddress.
    // Whichever one is sent will be used as the address.
    const address = body.shopAddress || body.businessAddress;

    // Check required fields.
    if (!shopName || !address || !gstNumber) {
      return NextResponse.json(
        { message: "INCOMPLETE DETAILS" },
        { status: 400 }
      );
    }

    // Check whether the user is logged in.
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    // Update the vendor.
    // Store the same address in both fields so both old and new pages
    // continue to work without any issue.
    const updatedVendor = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        shopName,

        // Keep both fields updated.
        shopAddress: address,
        businessAddress: address,

        gstNumber,

        // Reset verification information.
        verificationStatus: "pending",
        requestedAt: new Date(),
        rejectedReason: null,
        isApproved: false,
      },
      {
        new: true,
      }
    );

    // User was not found.
    if (!updatedVendor) {
      return NextResponse.json(
        { message: "NO USER FOUND" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "VENDOR DETAILS VERIFY AGAIN SUBMITTED SUCCESSFULLY",
        updatedVendor,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify Again Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}