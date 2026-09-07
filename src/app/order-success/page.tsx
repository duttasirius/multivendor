"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  PackageCheck,
  Truck,
  Headphones,
  ArrowRight,
} from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-12 text-zinc-100">
      <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full rounded-2xl border border-white/10 bg-[#111113] p-6 text-center shadow-2xl shadow-black/30 sm:p-10"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 180,
            }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10"
          >
            <CheckCircle2 className="h-12 w-12 text-emerald-400" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Order Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-4 max-w-lg text-sm leading-6 text-zinc-400"
          >
            Thank you for shopping with us. Your order has been received
            successfully and we&apos;re getting everything ready for you.
          </motion.p>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-left"
          >
            <h2 className="text-lg font-semibold text-white">
              What happens next?
            </h2>

            <div className="mt-5 space-y-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <PackageCheck className="h-5 w-5 text-zinc-300" />
                </div>

                <div>
                  <h3 className="font-medium text-zinc-100">
                    We&apos;ll prepare your order
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-zinc-500">
                    Our team will carefully pack your items and get everything
                    ready for delivery.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Truck className="h-5 w-5 text-zinc-300" />
                </div>

                <div>
                  <h3 className="font-medium text-zinc-100">
                    Your order will be delivered
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-zinc-500">
                    Once your order is ready, it will be sent out for delivery.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Headphones className="h-5 w-5 text-zinc-300" />
                </div>

                <div>
                  <h3 className="font-medium text-zinc-100">
                    We&apos;re here to help
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-zinc-500">
                    Have a question? Our support team is always available to
                    assist you.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Static Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-5"
          >
            <p className="text-sm leading-6 text-zinc-400">
              Your order is now in our system. Sit back, relax, and let us take
              care of the rest. 💚
            </p>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-7 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
