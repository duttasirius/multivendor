"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  XCircle,
  RefreshCw,
  CreditCard,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";

export default function OrderFailedPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full rounded-2xl bg-white p-6 text-center shadow-sm sm:p-10"
        >
          {/* Failed Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 180,
            }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100"
          >
            <XCircle className="h-12 w-12 text-red-600" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            Order Failed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-500"
          >
            We&apos;re sorry, but we couldn&apos;t complete your order.
            Something went wrong while processing your request.
          </motion.p>

          {/* What You Can Do */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-left"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              What can you do?
            </h2>

            <div className="mt-5 space-y-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <RefreshCw className="h-5 w-5 text-gray-700" />
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">
                    Try placing your order again
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Check your cart and try submitting the order again. The
                    issue may only be temporary.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <CreditCard className="h-5 w-5 text-gray-700" />
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">
                    Check your payment method
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Make sure your payment details are correct and your payment
                    method is available.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <HelpCircle className="h-5 w-5 text-gray-700" />
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">
                    Still having trouble?
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Our support team can help you resolve any issue with your
                    order.
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
            className="mt-8 rounded-xl bg-gray-50 p-5"
          >
            <p className="text-sm leading-6 text-gray-500">
              Don&apos;t worry — your cart is still available, so you can try
              again without losing your selected items.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Link>

            <Link
              href="/cart"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-7 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
