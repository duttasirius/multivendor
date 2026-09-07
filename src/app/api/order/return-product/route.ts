import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/connectDB";

import Order from "@/model/order.model";

import Product from "@/model/product.model";

import { IOrder } from "@/model/order.model";

export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB before reading or changing any order data.
    await connectDB();

    const { orderId, productId } = await req.json();

    if (!orderId || !productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID and Product ID are required",
        },
        { status: 400 },
      );
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 },
      );
    }

    if (order.orderStatus !== "delivered") {
      return NextResponse.json(
        {
          success: false,
          message: "Product can only be returned after delivery",
        },
        { status: 400 },
      );
    }

    // Search inside order.products to find the product the customer wants to return.
    // item = one product entry from the order.products array.
    const orderProduct = order.products.find(
      (item: IOrder["products"][number]) =>
        item.product.toString() === productId.toString(),
    );

    // Stop if the requested product does not exist inside this order.
    if (!orderProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found in this order",
        },
        { status: 404 },
      );
    }

    // Get the actual Product document from the Product collection.
    // We need the Product document because replacementDays belongs to the product.
    const product = await Product.findById(productId);

    // Stop if the product itself no longer exists in the Product collection.
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    // Get the number of days this product allows for replacement/return.
    // Example: replacementDays = 7 means the customer gets 7 days after delivery.
    const replacementDays = product.replacementDays || 0;

    // A product with 0 return days means returning this product is not allowed.
    if (replacementDays <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "This product cannot be returned",
        },
        { status: 400 },
      );
    }

    // Make sure the order has a deliveryDate because the return period starts from delivery.
    if (!order.deliveryDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Delivery date is missing",
        },
        { status: 400 },
      );
    }

    // Make a copy of the delivery date so we can calculate the return deadline.
    // Example: deliveredDate = August 20.
    const returnDate = new Date(order.deliveryDate);

    // Add the product's allowed replacement days to the delivery date.
    // Example: August 20 + 7 days = August 27.
    returnDate.setDate(returnDate.getDate() + replacementDays);

    // Get the current date and time.
    const today = new Date();

    // Check whether today's date has already passed the return deadline.
    // Today before deadline → allowed.
    // Today exactly on deadline → allowed.
    // Today after deadline → expired.
    if (today > returnDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Return period has expired",
        },
        { status: 400 },
      );
    }

    // Calculate the amount of money belonging to the returned product.
    // Product price × quantity = product refund amount.
    // Delivery and service charges are not included.
    const returnedAmount = orderProduct.price * orderProduct.quantity;

    // Mark the complete order as returned.
    // IMPORTANT: your current IOrder has only one orderStatus,
    // so this changes the status of the whole order, not just one product.
    order.orderStatus = "returned";

    // Save the amount calculated for the returned product.
    order.returnedAmount = returnedAmount;

    // Save all changes to MongoDB.
    await order.save();

    // Send a successful response back to the frontend.
    return NextResponse.json(
      {
        success: true,
        message: "Product returned successfully",
        returnedAmount,
        returnDate,
        order,
      },
      { status: 200 },
    );
  } catch (error) {
    // Print the actual error in the server terminal so you can debug it.
    console.error("Return Product API Error:", error);

    // Send a safe error message back to the frontend.
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while returning the product",
      },
      { status: 500 },
    );
  }
}
