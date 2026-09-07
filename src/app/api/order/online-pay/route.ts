import { auth } from "@/auth";
import connectDB from "@/lib/connectDB";
import Order from "@/model/order.model";
import Product from "@/model/product.model";
import User, { ICartItem } from "@/model/user.model";
import { url } from "inspector";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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

      paymentMethod: "stripe",
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

    // opening payment window
    // Create a Stripe Checkout Session containing the payment details,
    // products, prices, customer information, and redirect URLs.

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      // Define the product that Stripe will display and charge the customer for on the Checkout page.
      line_items: [
        {
          // Create the product price dynamically instead of using a pre-created Stripe Price ID.
          price_data: {
            currency: "inr",

            // Provide the product information that will be displayed to the customer in Stripe Checkout.
            product_data: {
              // Use the current product's title as the name shown on the Stripe Checkout page.
              name: product.title,
            },

            // Convert the amount from rupees to paise because Stripe requires the smallest currency unit.
            unit_amount: Math.round(amount * 100),
          },

          // Specify that the customer is purchasing exactly one unit of this product.
          quantity: 1,
        },
      ],

      // Redirect the customer here after Stripe successfully completes the payment.
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-success`,

      // Redirect the customer here if they cancel or leave the Stripe Checkout payment process.
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-failed`,

      // Attach your internal order ID to the Stripe session so you can identify the correct order later.
      metadata: {
        // Convert MongoDB's ObjectId into a string because Stripe metadata values must be strings.
        orderId: order._id.toString(),
        productId: product._id.toString(),
      },
    });

    return NextResponse.json({ url: stripeSession.url }, { status: 200 });
  } catch (error) {
    console.error("Stripe ORDER ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while placing the order",
      },
      { status: 500 },
    );
  }
}
