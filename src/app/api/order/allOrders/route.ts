import { auth } from "@/auth";
import connectDB from "@/lib/connectDB";
import Order from "@/model/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 },
      );
    }

    const orders = await Order.find()
      .populate("buyer", "name , email , phone , image")
      .populate("productVendor", "name , shopName email")
      .populate({
        // `path` is used when the field you want to populate is nested inside another field.
        // Here, `product` is inside the `products` array, so we write `products.product`.
        // Use `path` when you need to tell Mongoose the exact nested/reference field to populate.
        path: "products.product",
        model: "Product",
        select:
          "title , image1 , price category , stock vendor replacementDays",

        //       if --- order inside└── products inside └── product then need path --.populate({
        //   path: "products.product",
        //   select: "title price image1",
        // })
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
