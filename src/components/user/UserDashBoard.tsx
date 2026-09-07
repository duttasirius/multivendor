"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Search,
  ShoppingBag,
  Store,
  Truck,
  ShieldCheck,
  Star,
} from "lucide-react";

function UserDashBoard() {
  // ==========================================
  // ELECTRONICS BACKGROUND SLIDES
  // ==========================================

  const productImages = [
    {
      src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=90&w=2000&auto=format&fit=crop",
      alt: "Wireless headphones",
      title: "Premium Audio",
      description: "Discover headphones, earbuds and speakers from trusted sellers.",
    },
    {
      src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=90&w=2000&auto=format&fit=crop",
      alt: "Modern smartphone",
      title: "Latest Smartphones",
      description: "Find the newest smartphones at competitive marketplace prices.",
    },
    {
      src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=90&w=2000&auto=format&fit=crop",
      alt: "Modern smartwatch",
      title: "Smart Technology",
      description: "Upgrade your everyday life with smartwatches and wearable tech.",
    },
    {
      src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=90&w=2000&auto=format&fit=crop",
      alt: "Modern laptop",
      title: "Powerful Computing",
      description: "Shop laptops, accessories and productivity essentials.",
    },
  ];

  // ==========================================
  // ACTIVE SLIDE
  // ==========================================

  const [activeIndex, setActiveIndex] = useState(0);

  // ==========================================
  // AUTO SLIDER
  // ==========================================

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((previousIndex) => {
        return (previousIndex + 1) % productImages.length;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [productImages.length]);

  // ==========================================
  // CURRENT SLIDE
  // ==========================================

  const currentSlide = productImages[activeIndex];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-white">
      {/* ==========================================
          BACKGROUND IMAGE SLIDER
      ========================================== */}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.src}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <Image
            src={currentSlide.src}
            alt={currentSlide.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* ==========================================
          DARK OVERLAY
      ========================================== */}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30" />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

      {/* ==========================================
          BACKGROUND GLOW
      ========================================== */}

      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl items-center px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          {/* ======================================
              SLIDE CATEGORY
          ======================================= */}

         

          {/* ======================================
              HEADLINE
          ======================================= */}

          <AnimatePresence mode="wait">
            <motion.div
              key={`heading-${currentSlide.title}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                Discover the
                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  latest technology.
                </span>
              </h1>

              <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                {currentSlide.title}
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {currentSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          

          {/* ======================================
              TRUST FEATURES
          ======================================= */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
            }}
            className="mt-10 flex  max-sm:flex-col gap-6 border-t border-white/10 pt-6"
          >
            {/* Fast Delivery */}

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20">
                <Truck className="h-5 w-5 text-indigo-400" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Fast Delivery
                </p>

                <p className="text-xs text-slate-400">
                  Across India
                </p>
              </div>
            </div>

            {/* Secure Payment */}

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Secure Payment
                </p>

                <p className="text-xs text-slate-400">
                  100% protected
                </p>
              </div>
            </div>

            {/* Rating */}

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/20">
                <Star className="h-5 w-5 text-yellow-400" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  4.8/5 Rating
                </p>

                <p className="text-xs text-slate-400">
                  Trusted by shoppers
                </p>
              </div>
            </div>
          </motion.div>

          {/* ======================================
              SLIDER CONTROLS
          ======================================= */}

         
        </div>
      </div>
    </section>
  );
}

export default UserDashBoard;