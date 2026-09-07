"use client";

import React from "react";

import { motion, Variants } from "framer-motion";

import { ArrowRight, PackageSearch, Sparkles } from "lucide-react";

import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

import ProductCard from "../ProductCard";

import { useRouter } from "next/navigation";

function ProductCardPage() {
  const { allProductsData } = useSelector((state: RootState) => state.vendor);

  const router = useRouter();

  // Only show active and approved products.
  const products = allProductsData.filter(
    (product) => product.isActive && product.verificationStatus === "approved",
  );

  // Animation for the entire page.
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,

      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  // Animation for each product card.
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.97,
    },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,

      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-[#111111] px-4 py-10 sm:px-6 lg:px-8">
      {/* ================================
          HERO / PAGE HEADING
      ================================= */}
      <motion.section
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto mb-10 max-w-7xl text-center sm:mb-14"
      >
        {/* Small badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.4,
          }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm"
        >
          <Sparkles size={16} />
          <span>Discover Something Amazing</span>
        </motion.div>

        {/* Main title */}
        <h1 className="bg-gradient-to-r py-6 from-slate-900 via-blue-700 to-slate-900 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
          Explore Verified & Trending Products
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base lg:text-lg">
          Discover quality products from trusted vendors. Every product shown
          here is approved and ready for you to explore.
        </p>

        {/* Product count */}
      </motion.section>

      {/* ================================
          PRODUCT SECTION
      ================================= */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl"
      >
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
            {products.slice(0, 8).map((product) => (
              <motion.div
                key={product._id?.toString()}
                variants={itemVariants}
                whileHover={{
                  y: -6,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}

            <div className="col-span-1 mt-6 flex w-full justify-center sm:col-span-2 md:col-span-3 lg:col-span-4">
              <motion.button
                onClick={() => router.push("/category")}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 ring-1 ring-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-black/30"
              >
                {/* Shine effect */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative z-10">Browse More Products</span>

                <ArrowRight
                  size={18}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>
            </div>
          </div>
        ) : (
          /* ================================
              EMPTY STATE
          ================================= */
          <motion.div
            variants={itemVariants}
            className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center shadow-sm"
          >
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <PackageSearch size={38} className="text-slate-400" />
            </div>

            <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
              No Products Available
            </h2>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500 sm:text-base">
              There are currently no approved and active products available.
              Please check back later for new products.
            </p>
          </motion.div>
        )}
      </motion.section>
    </main>
  );
}

export default ProductCardPage;
