import connectDB from "@/lib/connectDB";
import Order from "@/model/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { orderId } = await req.json();
    if (!orderId) {
      return NextResponse.json(
        { message: "order id required" },
        { status: 404 },
      );
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ message: "order not found" }, { status: 404 });
    }

    order.orderStatus === "cancelled";

    order.cancelledAt = new Date();

    await order.save();

    return NextResponse.json({ message: "order cancelled" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
