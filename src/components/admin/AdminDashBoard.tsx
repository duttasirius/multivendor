"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Store,
  CircleCheck,
  Package,
  Menu,
  X,
  User,
  LogIn,
  LogOut,
} from "lucide-react";

import AdminDashboardPage from "./AdminDashboardPage";
import VendorDetails from "./VendorDetails";
import AllOrdersPage from "./AllOrdersPage";
import VendorRequest from "./VendorRequest";
import ProductRequest from "./ProductRequest";

export default function AdminDashbord() {
  // Stores which page is currently active
  const [activePage, setActivePage] = useState("dashboard");

  // Controls the mobile sidebar
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  // Changes the main page based on the selected menu item
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <AdminDashboardPage />;

      case "vendors":
        return <VendorDetails />;

      case "orders":
        return <AllOrdersPage />;

      case "vendor-approval":
        return <VendorRequest />;

      case "product-approval":
        return <ProductRequest />;

      default:
        return <AdminDashboardPage />;
    }
  };

  return (
    // Main admin layout
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      {/* ==========================================
          MOBILE TOP BAR
          Visible only below lg breakpoint
      ========================================== */}
      <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-gray-800 bg-black px-5 py-4 lg:hidden">
        {/* Mobile title */}
        <h1 className="text-xl font-bold">Admin Panel</h1>

        {/* Open mobile menu */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="rounded-lg p-2 transition hover:bg-gray-800"
        >
          <Menu size={25} />
        </button>
      </div>

      {/* ==========================================
          DESKTOP SIDEBAR
          Visible only on lg and larger screens
      ========================================== */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="hidden w-72 shrink-0 border-r border-gray-800 bg-gray-900/70 p-6 backdrop-blur-xl lg:block"
      >
        {/* Sidebar title */}
        <h1 className="mb-8 text-xl font-bold">Admin Panel</h1>

        {/* Sidebar menu */}
        <div className="flex flex-col gap-2">
          {/* Dashboard */}
          <button
            type="button"
            onClick={() => setActivePage("dashboard")}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all ${
              activePage === "dashboard"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <LayoutDashboard size={21} />
            <span>Dashboard</span>
          </button>

          {/* Vendor Details */}
          <button
            type="button"
            onClick={() => setActivePage("vendors")}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all ${
              activePage === "vendors"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Store size={21} />
            <span>Vendor Details</span>
          </button>

          {/* User Orders */}
          <button
            type="button"
            onClick={() => setActivePage("orders")}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all ${
              activePage === "orders"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <ShoppingBag size={21} />
            <span>User Orders</span>
          </button>

          {/* Vendor Approval */}
          <button
            type="button"
            onClick={() => setActivePage("vendor-approval")}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all ${
              activePage === "vendor-approval"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <CircleCheck size={21} />
            <span>Vendor Approval</span>
          </button>

          {/* Product Requests */}
          <button
            type="button"
            onClick={() => setActivePage("product-approval")}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all ${
              activePage === "product-approval"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Package size={21} />
            <span>Product Requests</span>
          </button>
        </div>
      </motion.aside>

      {/* ==========================================
          MOBILE SIDEBAR
          Slides in from the left
      ========================================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 z-[60] h-full w-72 border-r border-gray-700 bg-gray-900/95 p-6 backdrop-blur-xl lg:hidden"
          >
            {/* Mobile sidebar header */}
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-xl font-bold">Admin Panel</h1>

              {/* Close mobile menu */}
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg p-2 transition hover:bg-gray-800"
              >
                <X size={25} />
              </button>
            </div>

            {/* Mobile menu */}
            <div className="flex h-[calc(100%-70px)] flex-col">
              {/* Admin navigation */}
              <div className="flex flex-col gap-2">
                {/* Dashboard */}
                <button
                  type="button"
                  onClick={() => {
                    setActivePage("dashboard");
                    setMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all ${
                    activePage === "dashboard"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <LayoutDashboard size={21} />
                  <span>Dashboard</span>
                </button>

                {/* Vendor Details */}
                <button
                  type="button"
                  onClick={() => {
                    setActivePage("vendors");
                    setMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all ${
                    activePage === "vendors"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Store size={21} />
                  <span>Vendor Details</span>
                </button>

                {/* User Orders */}
                <button
                  type="button"
                  onClick={() => {
                    setActivePage("orders");
                    setMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all ${
                    activePage === "orders"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <ShoppingBag size={21} />
                  <span>User Orders</span>
                </button>

                {/* Vendor Approval */}
                <button
                  type="button"
                  onClick={() => {
                    setActivePage("vendor-approval");
                    setMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all ${
                    activePage === "vendor-approval"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <CircleCheck size={21} />
                  <span>Vendor Approval</span>
                </button>

                {/* Product Requests */}
                <button
                  type="button"
                  onClick={() => {
                    setActivePage("product-approval");
                    setMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all ${
                    activePage === "product-approval"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Package size={21} />
                  <span>Product Requests</span>
                </button>
              </div>

              {/* ==========================================
                  MOBILE ONLY ACCOUNT OPTIONS
                  Hidden on lg and larger screens
              ========================================== */}
              <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-5">
                {/* Profile */}
                <button
                  type="button"
                  onClick={() => {
                    router.push("/profile");
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg bg-[#6a69693c] px-4 py-3 text-left transition-colors hover:bg-white/10"
                >
                  <User size={20} />
                  <span>Profile</span>
                </button>

                {/* Login */}
                <button
                  type="button"
                  onClick={() => {
                    router.push("/login");
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg bg-[#6a69693c] px-4 py-3 text-left transition-colors hover:bg-white/10"
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </button>

                {/* Sign Out */}
                <button
                  type="button"
                  onClick={async () => {
                    await signOut();
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg bg-[#6a69693c] px-4 py-3 text-left transition-colors hover:bg-white/10"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}
      <motion.main
        key={activePage}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-16 min-w-0 flex-1 p-5 sm:p-6 lg:mt-0 lg:p-10"
      >
        {renderPage()}
      </motion.main>
    </div>
  );
}
