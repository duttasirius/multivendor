"use client";

import { IProduct } from "@/model/product.model";
import axios from "axios";
import {
  DollarSign,
  Minus,
  Plus,
  ShoppingBasket,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type CartItem = {
  product: IProduct;
  quantity: number;
};

function Page() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter()

  // getting cart items
  const getCart = async () => {
    try {
      const result = await axios.get("/api/user/cart/get");
      setCart(result.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // updating cart items
  const handleUpdateCart = async (
    productId: string,
    quantity: number
  ) => {
    try {
      const result = await axios.post("/api/user/cart/update", {
        productId,
        quantity,
      });

      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // remove product
  const handleRemove = async (productId: string) => {
    try {
      const result = await axios.post("/api/user/cart/remove", {
        productId,
      });

      console.log(result.data);

      setCart((prev) =>
        prev.filter(
          (item) => item.product._id?.toString() !== productId
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Main cart page container controls the full-screen background and spacing.
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 px-4 py-8 text-white sm:px-6 lg:px-10">

      {/* Main content container keeps the cart centered and limits its width. */}
      <div className="mx-auto max-w-6xl">

        {/* Cart page heading gives the page a clear title and polished introduction. */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 sm:text-sm">
            Shopping Cart
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your Cart
          </h1>

          <p className="mt-2 max-w-xl text-sm text-gray-400 sm:text-base">
            Review your selected products before checkout.
          </p>
        </motion.div>

        {/* Cart list contains every product currently inside the user's cart. */}
        <div className="space-y-4">

          {cart.map((item, index) => (

            // Each cart item gets its own animation and visual card styling.
            <motion.div
              key={item.product._id?.toString()}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{
                y: -3,
                scale: 1.005,
              }}
              className="group flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.08] sm:p-5 lg:flex-row lg:items-center"
            >

              {/* Product image section displays the selected product visually. */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl bg-gray-900 sm:h-60 lg:h-32 lg:w-32"
              >
                <Image
                  src={item.product.image1 || "/placeholder.png"}
                  alt={item.product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 128px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark image overlay appears subtly when the product card is hovered. */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>

              {/* Product information section displays title, price and quantity controls. */}
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-5">

                {/* Product title and pricing information are grouped together here. */}
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-400 sm:text-xs">
                    {item.product.category}
                  </p>

                  <h2 className="line-clamp-2 text-lg font-semibold leading-snug text-white sm:text-xl">
                    {item.product.title}
                  </h2>

                  <p className="mt-2 text-xl font-bold tracking-tight text-emerald-400">
                    ₹{item.product.price}
                  </p>
                </div>

                {/* Quantity control section allows the user to increase or decrease the product quantity. */}
                <div className="flex items-center gap-3">

                  {/* Quantity selector contains the minus button, quantity and plus button. */}
                  <div className="flex items-center overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-inner">

                    {/* Decrease quantity button. */}
                    <motion.button
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (!item.product._id) return;
                        
                        handleUpdateCart(
                          item.product._id.toString(),
                          item.quantity - 1
                        );
                      }}
                      className="flex h-10 w-10 items-center justify-center text-gray-300 transition-colors hover:text-white"
                    >
                      <Minus size={17} />
                    </motion.button>

                    {/* Current quantity is displayed between the two quantity buttons. */}
                    <span className="flex h-10 min-w-11 items-center justify-center border-x border-white/10 px-3 text-sm font-semibold text-white">
                      {item.quantity}
                    </span>

                    {/* Increase quantity button. */}
                    <motion.button
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (!item.product._id) return;

                        handleUpdateCart(
                          item.product._id.toString(),
                          item.quantity + 1
                        );
                      }}
                      className="flex h-10 w-10 items-center justify-center text-gray-300 transition-colors hover:text-white"
                    >
                      <Plus size={17} />
                    </motion.button>
                  </div>

                  {/* Remove button allows the user to remove the current product from the cart. */}
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: "rgba(239,68,68,0.1)",
                    }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      if (!item.product._id) return;

                      handleRemove(
                        item.product._id.toString()
                      );
                    }}
                    className="flex h-10 items-center gap-2 rounded-xl border border-red-500/20 px-4 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-500/40 hover:text-red-300"
                  >
                    <Trash2Icon size={16} />
                    <span className="hidden sm:inline">
                      Remove
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Checkout button section lets the user continue from this cart item. */}
              <motion.button
              onClick={()=>router.push(`/checkout/${item.product._id}`)}
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/10 transition-all duration-300 hover:bg-emerald-400 lg:self-center"
              >
                <ShoppingBasket size={18} />
                <span>Checkout</span>
              </motion.button>

              {/* Product total section shows the calculated total for this cart item. */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-center lg:min-w-32"
              >
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                  Total
                </p>

                <span className="flex items-center justify-center gap-1 text-lg font-bold text-white">
                  <DollarSign size={15} />
                  {item.product.price * item.quantity}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;

// useCase of (!item.product._id) -- we're mapping product inside userModel cart Items so "items" going through every product cart & inside product have every details about specific product:[{
    // product:{type:mongoose.Types.ObjectId, ref:"Product"},
    // quantity:{type:Number , default:1}}]

    // inside every  product have default ID by mondoDB so when need to select anything 