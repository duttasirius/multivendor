"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

function CategorySlider() {
  const categoryList = [
    { label: "All", icon: "🗂️" },
    { label: "Fashion & Lifestyle", icon: "👗" },
    { label: "Electronics & Gadgets", icon: "📱" },
    { label: "Home & Living", icon: "🏠" },
    { label: "Beauty & Personal Care", icon: "💄" },
    { label: "Toys, Kids & Baby", icon: "🧸" },
    { label: "Food & Grocery", icon: "🛒" },
    { label: "Sports & Fitness", icon: "🏀" },
    { label: "Automotive Accessories", icon: "🚗" },
    { label: "Gifts & Handcrafts", icon: "🎁" },
    { label: "Books & Stationery", icon: "📚" },
  ];

  const sliderRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-neutral-950 py-12">
      {/* Main container keeps the category section centered and responsive. */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header introduces the category section with a smooth entrance animation. */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          {/* Heading area contains the section label, title, and description. */}
          <div className="flex items-end justify-between gap-5">
            {/* Left side contains the main category heading content. */}
            <div>
              {/* Small premium eyebrow label above the main heading. */}
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-9 bg-gradient-to-r from-[#D4AF8F] to-transparent" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF8F]/80">
                  Explore
                </span>
              </div>

              {/* Main section heading. */}
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Shop By Category
              </h2>

              {/* Supporting description below the heading. */}
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/45 sm:text-base">
                Discover products curated for every part of your lifestyle.
              </p>
            </div>

            {/* Selected category indicator shown on larger screens. */}
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: 12, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs shadow-lg backdrop-blur-xl sm:flex"
            >
              <span className="text-white/35">Selected</span>

              <span className="h-1 w-1 rounded-full bg-[#D4AF8F]" />

              <span className="font-semibold text-white/80">
                {selectedCategory}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Slider wrapper positions the navigation buttons and edge gradients. */}
        <div className="relative w-full">
          {/* Left fade blends the beginning of the slider into the dark background. */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-black via-black/70 to-transparent" />

          {/* Right fade blends the end of the slider into the dark background. */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-black via-black/70 to-transparent" />

          {/* Button used to scroll the category slider toward the left. */}
          <motion.button
            type="button"
            onClick={scrollLeft}
            whileHover={{ scale: 1.08, x: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            aria-label="Scroll categories left"
            className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF8F]/40 hover:bg-white/[0.1] hover:text-white"
          >
            <ChevronLeft size={19} />
          </motion.button>

          {/* Horizontal category track that can be scrolled using the navigation buttons. */}
          <div
            ref={sliderRef}
            className="flex w-full gap-4 overflow-x-auto px-16 py-5 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categoryList.map((category, index) => {
              const isActive = selectedCategory === category.label;

              return (
                <motion.button
                  type="button"
                  key={category.label}
                  onClick={() => {
                    setSelectedCategory(category.label);

                    // Sends the selected category to the category page through the URL.
                    router.push(
                      `/category?category=${encodeURIComponent(category.label)}`,
                    );
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.045, 0.35),
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -7,
                    scale: 1.015,
                  }}
                  whileTap={{ scale: 0.97 }}
                  className={`group relative flex min-w-[175px] flex-shrink-0 flex-col items-center justify-center gap-3 overflow-hidden rounded-[24px] border px-6 py-7 text-center transition-all duration-300 ${
                    isActive
                      ? "border-[#D4AF8F]/40 bg-gradient-to-br from-[#D4AF8F]/20 via-white/[0.08] to-transparent text-white shadow-[0_18px_50px_rgba(212,175,143,0.12)]"
                      : "border-white/10 bg-white/[0.035] text-white/70 shadow-[0_12px_35px_rgba(0,0,0,0.25)] backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.06] hover:text-white hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
                  }`}
                >
                  {/* Decorative glow adds depth to the category card. */}
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-3xl transition-opacity duration-500 ${
                      isActive
                        ? "bg-[#D4AF8F]/20 opacity-100"
                        : "bg-white/10 opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  {/* Subtle highlight appears when the category card is hovered. */}
                  <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Category icon container. */}
                  <motion.div
                    whileHover={{
                      rotate: 4,
                      scale: 1.08,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 15,
                    }}
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border text-2xl shadow-inner ${
                      isActive
                        ? "border-white/15 bg-white/[0.1]"
                        : "border-white/10 bg-black/20 group-hover:border-[#D4AF8F]/20 group-hover:bg-white/[0.06]"
                    }`}
                  >
                    {category.icon}
                  </motion.div>

                  {/* Category name displayed below the icon. */}
                  <span
                    className={`relative text-sm font-semibold leading-5 ${
                      isActive
                        ? "text-white"
                        : "text-white/70 group-hover:text-white"
                    }`}
                  >
                    {category.label}
                  </span>

                  {/* Animated indicator highlights the currently selected category. */}
                  <motion.div
                    animate={{
                      width: isActive ? 30 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="h-0.5 rounded-full bg-[#D4AF8F]"
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Button used to scroll the category slider toward the right. */}
          <motion.button
            type="button"
            onClick={scrollRight}
            whileHover={{ scale: 1.08, x: 2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            aria-label="Scroll categories right"
            className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF8F]/40 hover:bg-white/[0.1] hover:text-white"
          >
            <ChevronRight size={19} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

export default CategorySlider;
