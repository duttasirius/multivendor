"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  BadgeCheck,
  Truck,
  RotateCcw,
  Headphones,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";

const WhyMultiCart = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Trusted Marketplace",
      description:
        "Shop from verified sellers and discover products with confidence across multiple categories.",
    },
    {
      icon: BadgeCheck,
      title: "Quality You Can Trust",
      description:
        "We focus on reliable sellers, authentic listings, and a better shopping experience.",
    },
    {
      icon: LockKeyhole,
      title: "Secure Payments",
      description:
        "Your transactions are protected with secure payment processing and trusted checkout options.",
    },
    {
      icon: Truck,
      title: "Reliable Delivery",
      description:
        "Track your orders from checkout to doorstep with clear delivery updates along the way.",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description:
        "Eligible products come with a straightforward return and replacement experience.",
    },
    {
      icon: Headphones,
      title: "Support When You Need It",
      description:
        "Get help with orders, payments, products, and account-related questions whenever you need it.",
    },
  ];

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 md:py-32">
      {/* Background glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[150px]"
        initial={{ opacity: 0, scale: 0.75 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      <motion.div
        className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-[140px]"
        animate={{
          x: [0, 35, 0],
          y: [0, -20, 0],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-orange-500/5 blur-[130px]"
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-2 backdrop-blur-sm">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-orange-500"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-400">
              Why MultiCart
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
            Shopping should feel
            <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300 bg-clip-text text-transparent">
              simple & trustworthy.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-400 md:text-base">
            MultiCart brings products, sellers, secure payments, reliable
            delivery, and customer-first service together in one marketplace.
          </p>
        </motion.div>

        {/* Main Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-neutral-800 bg-neutral-950 p-1 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
            <div className="relative overflow-hidden rounded-[1.8rem] border border-neutral-800/80 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black px-6 py-12 md:px-12 md:py-16">
              {/* Grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                }}
              />

              {/* Glow */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[100px]" />

              <div className="relative flex flex-col items-center text-center">
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-20 w-20 items-center justify-center rounded-3xl border border-orange-500/20 bg-orange-500/10 shadow-[0_0_50px_rgba(249,115,22,0.12)]"
                >
                  <span className="text-3xl font-bold text-orange-400">M</span>
                </motion.div>

                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  One marketplace.
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                  Thousands of products, trusted sellers, secure checkout, and
                  everything you need for a smoother shopping journey.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  {[
                    "Trusted Sellers",
                    "Secure Checkout",
                    "Easy Returns",
                    "Reliable Delivery",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.4 + index * 0.08,
                        duration: 0.45,
                      }}
                      className="rounded-full border border-neutral-800 bg-neutral-900/70 px-4 py-2 text-xs text-neutral-300 backdrop-blur-sm"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                variants={cardVariants}
                whileHover={{
                  y: -7,
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                className="group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/80 p-6 transition-colors duration-300 hover:border-neutral-700"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-orange-500/0 blur-3xl transition-all duration-500 group-hover:bg-orange-500/10" />

                <div className="relative">
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 2,
                    }}
                    transition={{ duration: 0.25 }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 transition-colors duration-300 group-hover:border-orange-500/20 group-hover:bg-orange-500/10"
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.7}
                      className="text-neutral-300 transition-colors duration-300 group-hover:text-orange-400"
                    />
                  </motion.div>

                  <h3 className="mt-5 text-base font-semibold text-white">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    {benefit.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-medium text-neutral-600 transition-colors duration-300 group-hover:text-orange-400">
                    Learn more
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 flex flex-col items-center text-center"
        >
          <p className="text-sm text-neutral-500">
            Ready to discover a better way to shop?
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group mt-4 flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-orange-500 hover:text-white"
          >
            Explore MultiCart
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyMultiCart;
