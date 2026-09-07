'use client'

import React from "react";
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Globe,
  Send,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-slate-300">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              MULTICART
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              A modern marketplace built to connect customers,
              vendors, and great products in one simple platform.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-white/5 text-sm font-bold text-slate-400 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-white/5 text-sm font-bold text-slate-400 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-white"
              >
                ◎
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-white/5 text-sm font-bold text-slate-400 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-white"
              >
                X
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-white/5 text-sm font-bold text-slate-400 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-white"
              >
                GH
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <div className="mt-5 space-y-3">

              <a
                href="#"
                className="group flex items-center justify-between text-sm text-slate-400 transition hover:text-white"
              >
                <span>Home</span>

                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>

              <a
                href="#"
                className="group flex items-center justify-between text-sm text-slate-400 transition hover:text-white"
              >
                <span>Products</span>

                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>

              <a
                href="#"
                className="group flex items-center justify-between text-sm text-slate-400 transition hover:text-white"
              >
                <span>Categories</span>

                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>

              <a
                href="#"
                className="group flex items-center justify-between text-sm text-slate-400 transition hover:text-white"
              >
                <span>About Us</span>

                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>

              <a
                href="#"
                className="group flex items-center justify-between text-sm text-slate-400 transition hover:text-white"
              >
                <span>Contact</span>

                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>

            </div>
          </div>

          {/* Vendor */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              For Vendors
            </h3>

            <div className="mt-5 space-y-3">

              <a
                href="#"
                className="group flex items-center justify-between text-sm text-slate-400 transition hover:text-white"
              >
                <span>Vendor Dashboard</span>

                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>

              <a
                href="#"
                className="group flex items-center justify-between text-sm text-slate-400 transition hover:text-white"
              >
                <span>Add Product</span>

                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>

              <a
                href="#"
                className="group flex items-center justify-between text-sm text-slate-400 transition hover:text-white"
              >
                <span>Manage Products</span>

                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>

              <a
                href="#"
                className="group flex items-center justify-between text-sm text-slate-400 transition hover:text-white"
              >
                <span>Orders</span>

                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>

              <a
                href="#"
                className="group flex items-center justify-between text-sm text-slate-400 transition hover:text-white"
              >
                <span>Seller Support</span>

                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4">

              {/* Location */}
              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-indigo-400">
                  <MapPin size={17} />
                </div>

                <p className="text-sm leading-6 text-slate-400">
                  Kolkata, West Bengal,
                  <br />
                  India
                </p>

              </div>

              {/* Email */}
              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-indigo-400">
                  <Mail size={17} />
                </div>

                <a
                  href="mailto:support@xoxo.com"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  support@xoxo.com
                </a>

              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-indigo-400">
                  <Phone size={17} />
                </div>

                <p className="text-sm text-slate-400">
                  +91 98765 43210
                </p>

              </div>

            </div>
          </div>

        </div>

        {/* Newsletter */}
        <div className="mt-14 rounded-2xl border border-slate-700/60 bg-white/5 p-6 backdrop-blur-md">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h3 className="text-lg font-semibold text-white">
                Stay in the loop
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Get updates about new products and offers.
              </p>
            </div>

            <div className="flex w-full max-w-md">

              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-l-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-500"
              />

              <button className="flex items-center gap-2 rounded-r-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-500">
                Subscribe
                <Send size={16} />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-700/60">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8">

          <p>
            © 2026 XOXO. All rights reserved.
          </p>

          <div className="flex gap-5">

            <a
              href="#"
              className="transition hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;