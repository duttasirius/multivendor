import connectDB from "@/lib/connectDB";
import { sendDeliveryOtpEmail } from "@/lib/mailer";
import Order from "@/model/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { message: "all inputs required" },
        { status: 404 },
      );
    }

    const order = await Order.findById(orderId).populate("buyer");
    if (!order) {
      return NextResponse.json({ message: "No order found" }, { status: 404 });
    }

    if (status === "confirmed" || status === "shipped") {
      order.orderStatus = status;

      order.save();

      return NextResponse.json(
        { message: "Order status updated" },
        { status: 200 },
      );
    }

    if (status === "delivered") {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      order.deliveryOtp = otp;
      // OTP will expire  10 minutes from sending
      order.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await order.save();

      const email = order.buyer.email;

      if (!email) {
        return NextResponse.json(
          { message: "No email found" },
          { status: 404 },
        );
      }

      await sendDeliveryOtpEmail({
        to: email,
        otp,
        customerName: order.address?.name || "Customer",
        orderId: String(order._id),
      });
      return NextResponse.json({ message: "OTP send to buyer email" });
    }
  } catch (error) {
    console.log(error);
  }
}
