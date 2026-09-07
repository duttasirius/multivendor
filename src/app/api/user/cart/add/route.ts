import { auth } from "@/auth";
import connectDB from "@/lib/connectDB";
import Product from "@/model/product.model";
import User, { ICartItem } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB.
    await connectDB();

    // Get the currently logged-in user's session.
    const session = await auth();

    // Stop the request if the user is not authenticated.
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 },
      );
    }

    // Get the product ID and quantity from the request body.
    const { productId, quantity = 1 } = await req.json();

    // Check whether a product ID was provided.
    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 },
      );
    }

    // Check whether the quantity is valid.
    if (typeof quantity !== "number" || quantity < 1) {
      return NextResponse.json(
        { message: "Quantity must be at least 1" },
        { status: 400 },
      );
    }

    // Find the currently logged-in user.
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check whether the requested product exists.
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    // Check whether the product already exists in the user's cart.
    const existingProduct = user.cart.find((item: ICartItem) =>
      item.product.equals(product._id),
    );

    if (existingProduct) {
      // Increase the quantity if the product is already in the cart.
      existingProduct.quantity += quantity;
    } else {
      // Add the product to the cart if it does not already exist.
      user.cart.push({
        product: product._id,
        quantity,
      });
    }

    // Save the updated user document.
    await user.save();

    return NextResponse.json(
      {
        message: "Product added to cart",
        cart: user.cart,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Add to cart error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while adding the product to the cart",
      },
      { status: 500 },
    );
  }
}
