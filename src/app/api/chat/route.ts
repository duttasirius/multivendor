import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/connectDB";
import searchProducts from "@/lib/ai/searchProducts";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "openai/gpt-oss-20b";

const tools = [
  {
    type: "function" as const,
    function: {
      name: "search_products",
      description:
        "Search real products from the MultiCart MongoDB database. Use this when the user wants to find, search, recommend, or get product information.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Product name or search keyword.",
          },
          category: {
            type: "string",
            description: "Product category.",
          },
          minPrice: {
            type: "number",
            description: "Minimum price in INR.",
          },
          maxPrice: {
            type: "number",
            description: "Maximum price in INR.",
          },
          payOnDelivery: {
            type: "boolean",
            description: "Whether pay on delivery is required.",
          },
          freeDelivery: {
            type: "boolean",
            description: "Whether free delivery is required.",
          },
        },
        required: [],
        additionalProperties: false,
      },
    },
  },
];

const systemInstruction = `
You are MultiCart AI.

You help users find products from the MultiCart store.

Rules:

1. Never invent products.
2. When the user asks to find, search, recommend, or compare products, use search_products.
3. Product information must come from the database tool.
4. For normal conversation, answer normally.
5. Be concise and helpful.
6. Prices are in INR.
`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const userMessage = body?.message;

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Message is required.",
        },
        { status: 400 },
      );
    }

    const message = userMessage.trim();

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Message cannot be empty.",
        },
        { status: 400 },
      );
    }

    // ---------------------------------------------------------
    // FIRST AI REQUEST
    // ---------------------------------------------------------

    const firstResponse = await groq.chat.completions.create({
      model: MODEL,

      messages: [
        {
          role: "system",
          content: systemInstruction,
        },
        {
          role: "user",
          content: message,
        },
      ],

      tools,

      tool_choice: "auto",

      parallel_tool_calls: false,

      temperature: 0.2,

      max_completion_tokens: 1000,
    });

    const firstMessage = firstResponse.choices[0]?.message;

    if (!firstMessage) {
      return NextResponse.json(
        {
          success: false,
          message: "No AI response received.",
        },
        { status: 500 },
      );
    }

    // ---------------------------------------------------------
    // NORMAL MESSAGE
    // ---------------------------------------------------------

    if (!firstMessage.tool_calls || firstMessage.tool_calls.length === 0) {
      return NextResponse.json({
        success: true,
        reply: firstMessage.content || "Sorry, I couldn't generate a response.",
        products: [],
      });
    }

    // ---------------------------------------------------------
    // DATABASE SEARCH
    // ---------------------------------------------------------

    let products: any[] = [];

    const toolCall = firstMessage.tool_calls[0];

    if (
      toolCall.type === "function" &&
      toolCall.function.name === "search_products"
    ) {
      let args: {
        query?: string;
        category?: string;
        minPrice?: number;
        maxPrice?: number;
        payOnDelivery?: boolean;
        freeDelivery?: boolean;
      } = {};

      try {
        args = JSON.parse(toolCall.function.arguments || "{}");
      } catch (error) {
        console.error("Tool argument parsing error:", error);
      }

      console.log("MultiCart AI search:", args);

      await connectDB();

      products = await searchProducts({
        query: args.query,
        category: args.category,
        minPrice: args.minPrice,
        maxPrice: args.maxPrice,
        payOnDelivery: args.payOnDelivery,
        freeDelivery: args.freeDelivery,
      });
    }

    // ---------------------------------------------------------
    // NO PRODUCTS
    // ---------------------------------------------------------

    if (products.length === 0) {
      return NextResponse.json({
        success: true,
        reply:
          "Sorry, I couldn't find any products matching your request. Try a different product, category, or price range.",
        products: [],
      });
    }

    // ---------------------------------------------------------
    // CREATE SIMPLE AI REPLY
    // ---------------------------------------------------------
    //
    // IMPORTANT:
    // We DO NOT send the tool call back to GPT-OSS.
    // This completely avoids the tool_choice error.
    //

    let reply = `I found ${products.length} ${
      products.length === 1 ? "product" : "products"
    } for you.`;

    // Helpful context based on the actual search results
    const firstProduct = products[0];

    if (products.length === 1) {
      reply = `I found this product for you: ${firstProduct.title}.`;
    } else {
      reply = `I found ${products.length} products that match your request.`;
    }

    return NextResponse.json({
      success: true,
      reply,
      products,
    });
  } catch (error: any) {
    console.error("MultiCart AI error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Something went wrong while processing your request.",
      },
      {
        status: 500,
      },
    );
  }
}
