import { auth } from "@/auth";
import uploadCloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/connectDB";
import Product from "@/model/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.email || !session?.user?.id) {
      return NextResponse.json(
        { message: "UNAUTHORIZED USER" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const productId = formData.get("productId")?.toString();
    const ratingValue = formData.get("rating")?.toString();
    const comment = formData.get("comment")?.toString();
    const file = formData.get("image");

    const rating = Number(ratingValue);

  

    if (!productId) {
      return NextResponse.json(
        { message: "No valid Product found" },
        { status: 400 }
      );
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Need Proper rating" },
        { status: 400 }
      );
    }

    if (!comment?.trim()) {
      return NextResponse.json(
        { message: "Comment Required" },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "NO PRODUCT FOUND" },
        { status: 404 }
      );
    }

    let imageUrl: string | undefined;

    // Only upload if the received value is actually a File
    if (file instanceof File && file.size > 0) {
      console.log("Uploading review image...");

      imageUrl = await uploadCloudinary(file);

      
    }

    product.reviews.push({
      rating,
      comment: comment.trim(),
      user: session.user.id,
      image: imageUrl,
    });

    await product.save();

   

    return NextResponse.json(
      {
        message: "Review submitted successfully",
        product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("========== ADD REVIEW ERROR ==========");

   
    return NextResponse.json(
      {
        message: "Failed to submit review",
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      { status: 500 }
    );
  }
}