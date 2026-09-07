import { auth } from "@/auth";
import connectDB from "@/lib/connectDB";
import User, { ICartItem } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get logged-in user
    const session = await auth();

    // Check authentication
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Get request data
    const { productId } = await req.json();

    // Validate productId
    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

   
   

    // Find user
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Find product inside user's cart
    user.cart = user.cart.filter(
      (item: ICartItem) =>
        item.product.toString() !== productId.toString()
    );

   

    // Save user
    await user.save();

    return NextResponse.json(
      {
        message: "Cart item removed",
        cart: user.cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update cart error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while updating the cart",
      },
      { status: 500 }
    );
  }
}