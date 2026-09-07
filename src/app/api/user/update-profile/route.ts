export const runtime = "nodejs";

import { auth } from "@/auth";
import uploadCloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/connectDB";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("1. Update profile API started");

    console.log("2. Connecting to database...");
    await connectDB();
    console.log("3. Database connected");

    console.log("4. Checking authentication...");
    const session = await auth();
    console.log("5. Authentication checked");

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "UNAUTHORIZED ACCESS",
        },
        {
          status: 401,
        },
      );
    }

    console.log("6. Authenticated user:", session.user.email);

    console.log("7. Reading form data...");
    const formData = await req.formData();
    console.log("8. Form data received");

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const file = formData.get("image") as File | null;

    console.log("9. Received data:", {
      name,
      phone,
      hasFile: !!file,
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
    });

    if (!name || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "MISSING DETAILS",
        },
        {
          status: 400,
        },
      );
    }

    const updateData: {
      name: string;
      phone: string;
      image?: string;
    } = {
      name,
      phone,
    };

    if (file && file.size > 0) {
      console.log("10. Image found");
      console.log("11. Starting Cloudinary upload...");

      try {
        const imageUrl = await uploadCloudinary(file);

        console.log("12. Cloudinary upload completed:", imageUrl);

        if (imageUrl) {
          updateData.image = imageUrl;
        }
      } catch (error) {
        console.error("Cloudinary upload failed:", error);

        return NextResponse.json(
          {
            success: false,
            message: "IMAGE UPLOAD FAILED",
          },
          {
            status: 502,
          },
        );
      }
    } else {
      console.log("10. No new image selected");
    }

    console.log("13. Updating user in database...");

    const updateUser = await User.findOneAndUpdate(
      { email: session.user.email },
      updateData,
      { new: true },
    );

    console.log("14. Database update completed");

    if (!updateUser) {
      return NextResponse.json(
        {
          success: false,
          message: "NO USER FOUND",
        },
        {
          status: 404,
        },
      );
    }

    console.log("15. Profile update successful");

    return NextResponse.json(
      {
        success: true,
        updateUser,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Update profile error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "INTERNAL SERVER ERROR",
      },
      {
        status: 500,
      },
    );
  }
}
