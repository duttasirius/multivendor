"use client";

import { IProduct } from "@/model/product.model";
import { ShoppingBag, Star, ShieldCheck } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";

function ProductCard({ product }: { product: IProduct }) {
  // Create an array from all available product images.
  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean);

  const router = useRouter();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await axios.post("/api/user/cart/add", {
        productId: product._id,
        quantity: 1,
      });

      alert("Added to Cart");
      router.push("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  const totalReview = product?.reviews?.length ?? 0;

  const avgRating =
    totalReview > 0
      ? (product.reviews ?? []).reduce(
          (sum: number, r: { rating: number }) =>
            // Defines the function used by `reduce()`; `sum` is the accumulated total so far,
            // while `r` is the current review object and TypeScript is told that it contains a numeric `rating`.
            sum + r.rating,
          // This is the initial value for `sum`; the calculation starts from zero before the first review is processed.
          0,
        ) / totalReview
      : 0;

  return (
    // Card motion: starts slightly lower and transparent, then smoothly appears.
    <motion.div
      onClick={() => router.push(`/viewProduct/${product._id}`)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -7 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative w-full cursor-pointer"
    >
      {/* Premium outer glow */}
      <div className="pointer-events-none absolute -inset-px rounded-[1.6rem] bg-gradient-to-b from-gray-200 via-transparent to-transparent opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative overflow-hidden rounded-[1.5rem] border border-gray-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-500 group-hover:border-gray-300 group-hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]">
        {/* Image section: displays the first available product image and zooms slightly on hover. */}
        <motion.div
          className="relative h-60 w-full overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 sm:h-64"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src={images[0] || "/placeholder.png"}
            alt={product.title || "Product image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Soft image overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />

          {/* Top-left category badge */}
          <div className="absolute left-4 top-4">
            <div className="rounded-full border border-white/40 bg-black/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
              {product.category || "Collection"}
            </div>
          </div>

          {/* Stock status badge */}
          <div className="absolute right-4 top-4">
            <div
              className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md ${
                product.stock
                  ? "border-emerald-300/30 bg-emerald-500/15 text-emerald-50"
                  : "border-red-300/30 bg-red-500/15 text-red-50"
              }`}
            >
              {product.stock ? "In Stock" : "Out of Stock"}
            </div>
          </div>
        </motion.div>

        {/* Product content section */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.45,
            ease: "easeOut",
          }}
          className="relative flex flex-col p-4 sm:p-5"
        >
          {/* Product information header */}
          <div className="space-y-2">
            {/* Product category */}
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                {product.category || "Premium Collection"}
              </p>

              <span className="h-px flex-1 bg-gray-100" />
            </div>

            {/* Product title */}
            <h2 className="line-clamp-2 min-h-[48px] text-[17px] font-semibold leading-6 tracking-[-0.02em] text-gray-950 sm:text-lg">
              {product.title}
            </h2>
          </div>

          {/* Rating section: combines stars, score, and review count into one polished row. */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => {
                const filled = i <= Math.round(avgRating);

                return (
                  <Star
                    key={i}
                    size={14}
                    strokeWidth={1.8}
                    className={
                      filled
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    }
                  />
                );
              })}
            </div>

            <span className="text-sm font-semibold text-gray-800">
              {avgRating.toFixed(1)}
            </span>

            <span className="text-gray-300">•</span>

            <span className="text-xs text-gray-500">
              {totalReview} {totalReview === 1 ? "Review" : "Reviews"}
            </span>
          </div>

          {/* Price section: makes the product price the main visual focus while keeping the layout clean. */}
          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                Price
              </p>

              <div className="mt-1 flex items-end gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                  ₹{product.price}
                </span>
              </div>
            </div>

            {/* Product availability indicator */}
            <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  product.stock ? "bg-emerald-500" : "bg-red-500"
                }`}
              />

              <span className="text-[10px] font-medium text-gray-500">
                {product.stock ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-5 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Vendor section: shows the seller in a subtle marketplace-style information block. */}
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 px-3.5 py-3">
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
                Sold by
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                {product.vendor?.shopName || "Unknown Seller"}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-100 bg-white px-2.5 py-1.5 shadow-sm">
              <ShieldCheck
                size={12}
                strokeWidth={2}
                className="text-emerald-600"
              />

              <span className="text-[9px] font-semibold uppercase tracking-wide text-emerald-700">
                Verified
              </span>
            </div>
          </div>

          {/* Action section: provides a large premium CTA with hover and press animation. */}
          <motion.div
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            <button
              onClick={handleAddToCart}
              type="button"
              disabled={!product.stock}
              className={`group mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl px-4 py-3.5 text-sm font-semibold shadow-lg transition-all duration-300 sm:text-base ${
                product.stock
                  ? "bg-gray-950 text-white shadow-gray-200 hover:bg-emerald-600 hover:shadow-emerald-200/50"
                  : "cursor-not-allowed bg-gray-200 text-gray-400 shadow-none"
              }`}
            >
              <ShoppingBag
                size={18}
                strokeWidth={2}
                className={`transition-transform duration-300 ${
                  product.stock ? "group-hover:-translate-y-0.5" : ""
                }`}
              />

              <span>{product.stock ? "Add to Cart" : "Out of Stock"}</span>
            </button>
          </motion.div>

          {/* Small trust message */}
          <p className="mt-3 text-center text-[10px] text-gray-400">
            Secure checkout • Trusted marketplace
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
