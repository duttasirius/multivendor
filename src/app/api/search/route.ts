import connectDB from "@/lib/connectDB";
import Product from "@/model/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Create a URL object from the incoming request URL and extract its search parameters.
    const { searchParams } = new URL(req.url);
    //new URL - This turns that URL string into a URL object:

    // Get the "query" value from the URL, or use an empty string when no search query was provided.
    // need to use same params name as frontend
    const query = searchParams.get("query") || "";

    // Get the "category" value from the URL, which will be null if no category was provided.
    const category = searchParams.get("category");

    // Start with the default filter so only active and verified products are returned.
    const filter: Record<string, any> = {
      isActive: true,
      verificationStatus: "approved",
    };

    // Only add search conditions when the user actually provides a search query.
    // this is from search bar section
    if (query) {
      // Search for mondoDB  database the query in the product title, description, or category.
      filter.$or = [
        // Match products whose title contains the query, ignoring uppercase/lowercase differences.
        { title: { $regex: query, $options: "i" } },

        // Match products whose description contains the query, ignoring uppercase/lowercase differences.
        { description: { $regex: query, $options: "i" } },

        // Match products whose category contains the query, ignoring uppercase/lowercase differences.
        { category: { $regex: query, $options: "i" } },
      ];
    }

    // Only filter by category when a specific category is selected from frontend  instead of "all".
    if (category && category !== "all") {
      // Add the selected category to the MongoDB filter object.
      filter.category = category;
    }

    // Find and return all products that match the combined search and category filters.
    const products = await Product.find(filter)
      .populate("vendor", "name email shopName")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: products.length,
        products,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    // Log the actual error on the server so it can be inspected during debugging.
    console.error("Error fetching products:", error);

    // Send a safe error response to the client without exposing internal server details.
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      {
        status: 500,
      },
    );
  }
}
