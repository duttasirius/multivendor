import connectDB from "@/lib/connectDB";
import Order from "@/model/order.model";
import { connect } from "http2";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  // receiving stripe signature from frotend stripe popup
  const rawBody = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOKS_SECRET!,
    );
  } catch (error) {
    console.log(error);
  }

  if (event?.type === "checkout.session.completed") {
    // this is stripe session
    const session = event.data.object;

    await connectDB();

    await Order.findByIdAndUpdate(session.metadata?.orderId, {
      isPaid: true,
      orderStatus: "confirmed",
    });
  }
}
