"use client";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileQuestion,
  Headphones,
  HelpCircle,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

function SupportPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.045),transparent_22%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.06),transparent_25%),linear-gradient(135deg,#010101_0%,#050505_40%,#020202_70%,#090909_100%)] px-4 py-8 text-white sm:px-6 lg:px-10">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[5%] top-[10%] h-72 w-72 rounded-full bg-white/[0.02] blur-3xl" />
        <div className="absolute right-[8%] top-[25%] h-96 w-96 rounded-full bg-blue-500/[0.025] blur-3xl" />
        <div className="absolute bottom-[5%] left-[40%] h-80 w-80 rounded-full bg-purple-500/[0.015] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-1.5 text-xs font-medium text-white/50 shadow-lg shadow-black/20 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            Customer Support Center
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            We're here to help.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            Whether you have a question about your order, payment, account, or
            anything else, our support team is ready to help.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            whileHover={{ y: -4 }}
            className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.045]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/10 bg-blue-500/10">
              <Phone className="h-5 w-5 text-blue-400" />
            </div>

            <p className="mb-1 text-xs uppercase tracking-[0.16em] text-white/25">
              Call us
            </p>

            <h2 className="text-lg font-semibold text-white">
              +91 1800 123 4567
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/35">
              Speak directly with our customer support team.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              Available now
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl transition-all duration-300 hover:border-purple-400/20 hover:bg-white/[0.045]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-400/10 bg-purple-500/10">
              <Mail className="h-5 w-5 text-purple-400" />
            </div>

            <p className="mb-1 text-xs uppercase tracking-[0.16em] text-white/25">
              Email us
            </p>

            <h2 className="break-all text-lg font-semibold text-white">
              support@example.com
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/35">
              Send us your question and we'll get back to you shortly.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-white/35">
              <Clock3 className="h-3.5 w-3.5 text-purple-400" />
              Response within 24 hours
            </div>
          </motion.div>

          {/* Help Center */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl transition-all duration-300 hover:border-emerald-400/20 hover:bg-white/[0.045]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/10 bg-emerald-500/10">
              <BookOpen className="h-5 w-5 text-emerald-400" />
            </div>

            <p className="mb-1 text-xs uppercase tracking-[0.16em] text-white/25">
              Help center
            </p>

            <h2 className="text-lg font-semibold text-white">
              Browse our guides
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/35">
              Find answers to common questions and learn how everything works.
            </p>

            <button className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 transition hover:text-emerald-200">
              Explore guides
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Main Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-5 grid gap-5 lg:grid-cols-12"
        >
          {/* Left */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl lg:col-span-7 sm:p-8">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <Headphones className="h-5 w-5 text-blue-400" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Contact our support team
                </h2>

                <p className="text-xs text-white/30">
                  Choose the option that works best for you.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left transition-all duration-300 hover:border-blue-400/20 hover:bg-blue-500/[0.04]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-white/80">
                    Customer Care
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    +91 1800 123 4567
                  </p>
                </div>

                <ArrowRight className="h-4 w-4 text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-white/50" />
              </button>

              <button className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left transition-all duration-300 hover:border-purple-400/20 hover:bg-purple-500/[0.04]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                  <Mail className="h-4 w-4 text-purple-400" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-white/80">
                    Email Support
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    support@example.com
                  </p>
                </div>

                <ArrowRight className="h-4 w-4 text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-white/50" />
              </button>

              <button className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left transition-all duration-300 hover:border-emerald-400/20 hover:bg-emerald-500/[0.04]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-white/80">
                    Submit a Request
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    Create a support ticket
                  </p>
                </div>

                <ArrowRight className="h-4 w-4 text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-white/50" />
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5 lg:col-span-5">
            {/* Business Hours */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                  <Clock3 className="h-4 w-4 text-blue-400" />
                </div>

                <h3 className="text-sm font-semibold text-white">
                  Business hours
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/35">Monday — Friday</span>
                  <span className="text-white/70">9:00 AM — 8:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/35">Saturday</span>
                  <span className="text-white/70">10:00 AM — 6:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/35">Sunday</span>
                  <span className="text-white/30">Closed</span>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                  <HelpCircle className="h-4 w-4 text-purple-400" />
                </div>

                <h3 className="text-sm font-semibold text-white">
                  Common questions
                </h3>
              </div>

              <div className="space-y-2">
                <button className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left text-xs text-white/50 transition hover:bg-white/[0.04] hover:text-white/80">
                  <FileQuestion className="h-3.5 w-3.5 shrink-0" />
                  How can I track my order?
                </button>

                <button className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left text-xs text-white/50 transition hover:bg-white/[0.04] hover:text-white/80">
                  <FileQuestion className="h-3.5 w-3.5 shrink-0" />
                  How do I request a replacement?
                </button>

                <button className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left text-xs text-white/50 transition hover:bg-white/[0.04] hover:text-white/80">
                  <FileQuestion className="h-3.5 w-3.5 shrink-0" />
                  How long does a refund take?
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-xs sm:flex-row"
        >
          <div className="flex items-center gap-2 text-white/30">
            <ShieldCheck className="h-4 w-4 text-blue-400" />
            Your information is secure and protected.
          </div>

          <div className="flex items-center gap-2 text-white/25">
            <MapPin className="h-3.5 w-3.5" />
            India
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SupportPage;
