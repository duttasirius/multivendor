import { auth } from "@/auth";
import uploadCloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/connectDB";
import Product from "@/model/product.model";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();

    if (!session || !session.user?.id || !session.user?.email) {
      return NextResponse.json(
        { message: "UNAUTHORIZED USER" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const priceValue = Number(formData.get("price"));
    const stockValue = Number(formData.get("stock"));
    const replacementDaysValue = Number(
      formData.get("replacementDays")
    );

    const price = Number.isFinite(priceValue) ? priceValue : 0;
    const stock = Number.isFinite(stockValue) ? stockValue : 0;
    const replacementDays = Number.isFinite(replacementDaysValue)
      ? replacementDaysValue
      : 0;

    const category = formData.get("category") as string;

    const isWearable = formData.get("isWearable") === "true";

    const sizes = formData.getAll("sizes");

    const freeDelivery =
      formData.get("freeDelivery") === "true";

    const warranty =
      (formData.get("warranty") as string) || "No Warranty";

    const payOnDelivery =
      formData.get("payOnDelivery") === "true";

    const detailsPoints = formData.getAll("detailsPoints");

    const img1 = formData.get("image1") as File;
    const img2 = formData.get("image2") as File;
    const img3 = formData.get("image3") as File;
    const img4 = formData.get("image4") as File;

    if (
      !title ||
      !description ||
      !price ||
      !stock ||
      !category ||
      !img1 ||
      !img2 ||
      !img3 ||
      !img4
    ) {
      return NextResponse.json(
        { message: "All fields & 4 images required" },
        { status: 400 }
      );
    }

    if (isWearable && sizes.length === 0) {
      return NextResponse.json(
        { message: "Sizes required" },
        { status: 400 }
      );
    }

    // Upload images
    // const image1 = await uploadCloudinary(img1);
    // const image2 = await uploadCloudinary(img2);
    // const image3 = await uploadCloudinary(img3);
    // const image4 = await uploadCloudinary(img4);

    // for good practice 
    const [image1, image2, image3, image4] = await Promise.all([
  uploadCloudinary(img1),
  uploadCloudinary(img2),
  uploadCloudinary(img3),
  uploadCloudinary(img4),
]);

    // Make sure Cloudinary returned URLs
    if (!image1 || !image2 || !image3 || !image4) {
      return NextResponse.json(
        { message: "Image upload failed" },
        { status: 500 }
      );
    }

    const product = await Product.create({
      title,
      description,
      price,
      stock,
      category,
      image1,
      image2,
      image3,
      image4,
      isStockAvailable: stock > 0,
      vendor: session.user.id,
      isWearable,
      sizes: isWearable ? sizes : [],
      replacementDays,
      warranty,
      payOnDelivery,
      freeDelivery,
      detailsPoints,
      verificationStatus: "pending",
      isActive: false,
    });

    await User.findByIdAndUpdate(
      session.user.id,
      {
        $push: {
          VendorProducts: product._id,
        },
      },
      { new: true }
    );

    return NextResponse.json(
      { product },
      { status: 201 }
    );
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to add product",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}