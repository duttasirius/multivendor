import { auth } from "@/auth";
import connectDB from "@/lib/connectDB";
import Order from "@/model/order.model";
import Product from "@/model/product.model";
import User, { ICartItem } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    const {
      productId,
      quantity,
      address,
      deliveryCharge,
      serviceCharge,
      amount,
    } = await req.json();

    // Validate product and quantity
    if (!productId || !quantity) {
      return NextResponse.json(
        { message: "Product ID and quantity are required" },
        { status: 400 },
      );
    }

    // Validate address
    if (
      !address?.name ||
      !address?.phone ||
      !address?.address ||
      !address?.city ||
      !address?.pincode
    ) {
      return NextResponse.json(
        { message: "Fill all the address details" },
        { status: 400 },
      );
    }

    // Validate numbers
    if (
      typeof amount !== "number" ||
      typeof deliveryCharge !== "number" ||
      typeof serviceCharge !== "number"
    ) {
      return NextResponse.json(
        { message: "Invalid amount, delivery charge or service charge" },
        { status: 400 },
      );
    }

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check cart
    const cartItem = user.cart.find(
      (item: ICartItem) => item.product._id.toString() === productId.toString(),
    );

    if (!cartItem) {
      return NextResponse.json(
        { message: "Product is not available in cart" },
        { status: 404 },
      );
    }

    // Find product
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    // Create products total
    const productsTotal = product.price * quantity;

    // Create order
    const order = await Order.create({
      buyer: userId,

      products: [
        {
          product: product._id,
          quantity,
          price: product.price,
        },
      ],

      productVendor: product.vendor,

      productsTotal,
      deliveryCharge,
      serviceCharge,
      totalAmount: amount,

      paymentMethod: "cod",
      isPaid: false,
      orderStatus: "pending",
      returnedAmount: 0,

      address,
    });

    // Update product stock
    await Product.findByIdAndUpdate(productId, {
      $inc: {
        stock: -quantity,
      },
    });

    // Remove purchased product from cart
    user.cart = user.cart.filter(
      (item: ICartItem) => item.product.toString() !== productId.toString(),
    );

    // Add order to user's orders
    user.orders.push(order._id);

    await user.save();

    return NextResponse.json(
      {
        order,
        message: "COD order placed successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("COD ORDER ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while placing the order",
      },
      { status: 500 },
    );
  }
}
