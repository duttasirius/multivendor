"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import {
  LayoutDashboard,
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

import VendorOrders from "./VendorOrders";
import VendorProducts from "./VendorProducts";
import VenBoard from "./VenBoard";

export default function VendorDashBoardLayout() {
  // Stores which page is currently active
  const [activePage, setActivePage] = useState("dashboard");

  // Controls the mobile sidebar
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  // Changes the main page based on the selected menu item
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <VenBoard />;

      case "orders":
        return <VendorOrders />;

      case "product":
        return <VendorProducts />;

      default:
        return <VenBoard />;
    }
  };

  // Sidebar menu items
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "orders",
      label: "User Orders",
      icon: ShoppingBag,
    },
    {
      id: "product",
      label: "Product Requests",
      icon: Package,
    },
  ];

  return (
    // Main vendor layout
    <div className="flex min-h-screen mt-16 w-full overflow-hidden bg-[#050816] text-white">
      {/* ==========================================
          MOBILE TOP BAR
          Visible only below lg breakpoint
      ========================================== */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 backdrop-blur-xl lg:hidden"
      >
        {/* Mobile title */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Store size={18} />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Vendor
            </p>

            <h1 className="text-sm font-bold text-white">Vendor Panel</h1>
          </div>
        </div>

        {/* Open mobile menu */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.04 }}
          onClick={() => setMenuOpen(true)}
          className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
        >
          <Menu size={22} />
        </motion.button>
      </motion.header>

      {/* ==========================================
          DESKTOP SIDEBAR
          Visible only on lg and larger screens
      ========================================== */}
      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative hidden w-72 shrink-0 border-r border-white/10 bg-slate-950/80 p-5 backdrop-blur-2xl lg:block"
      >
        {/* Sidebar brand area */}
        <div className="mb-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Store size={21} />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Workspace
            </p>

            <h1 className="text-lg font-bold text-white">Vendor Panel</h1>
          </div>
        </div>

        {/* Sidebar section title */}
        <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Navigation
        </p>

        {/* Sidebar menu */}
        <div className="flex flex-col gap-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.07 }}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActivePage(item.id)}
                className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3.5 text-sm font-medium transition-all ${
                  isActive
                    ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-500/5"
                    : "border border-transparent text-slate-400 hover:border-white/5 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {/* Active item indicator */}
                {isActive && (
                  <motion.span
                    layoutId="activeSidebarIndicator"
                    className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-cyan-400"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}

                <Icon
                  size={20}
                  className={`transition-colors ${
                    isActive
                      ? "text-cyan-300"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                />

                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Sidebar bottom status */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="absolute bottom-5 left-5 right-5 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
              <CircleCheck size={18} />
            </div>

            <div>
              <p className="text-xs font-semibold text-emerald-300">
                Vendor Account
              </p>

              <p className="mt-1 text-[11px] text-slate-500">
                Dashboard active
              </p>
            </div>
          </div>
        </motion.div>
      </motion.aside>

      {/* ==========================================
          MOBILE SIDEBAR OVERLAY
          Appears when mobile menu is open
      ========================================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ==========================================
          MOBILE SIDEBAR
          Slides in from the left
      ========================================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="fixed bottom-0 left-0 top-0 z-[60] flex w-[85%] max-w-sm flex-col border-r border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-black/50 backdrop-blur-2xl lg:hidden"
          >
            {/* Mobile sidebar header */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Store size={19} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    Workspace
                  </p>

                  <h1 className="text-base font-bold text-white">
                    Vendor Panel
                  </h1>
                </div>
              </div>

              {/* Close mobile menu */}
              <motion.button
                type="button"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={21} />
              </motion.button>
            </div>

            {/* Mobile menu section */}
            <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Navigation
            </p>

            <div className="flex flex-1 flex-col">
              {/* Existing vendor navigation */}
              <div className="flex flex-col gap-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActivePage(item.id);
                        setMenuOpen(false);
                      }}
                      className={`relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all ${
                        isActive
                          ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                          : "border border-transparent text-slate-400 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeMobileIndicator"
                          className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-cyan-400"
                        />
                      )}

                      <Icon
                        size={20}
                        className={
                          isActive ? "text-cyan-300" : "text-slate-500"
                        }
                      />

                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* ==========================================
                  MOBILE ONLY ACCOUNT OPTIONS
              ========================================== */}
              <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-5">
                {/* Profile */}
                <button
                  type="button"
                  onClick={() => {
                    router.push("/profile");
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg bg-[#6a69693c] px-4 py-2 text-left hover:bg-white/10"
                >
                  <User size={20} />
                  Profile
                </button>

                {/* Login */}
                <button
                  type="button"
                  onClick={() => {
                    router.push("/login");
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg bg-[#6a69693c] px-4 py-2 text-left hover:bg-white/10"
                >
                  <LogIn size={20} />
                  Login
                </button>

                {/* Sign Out */}
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg bg-[#6a69693c] px-4 py-2 text-left hover:bg-white/10"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ==========================================
          MAIN CONTENT
          Changes whenever activePage changes
      ========================================== */}
      <motion.main
        key={activePage}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="min-w-0 flex-1 pt-16 lg:pt-0"
      >
        {/* Responsive content container */}
        <div className="min-h-screen p-3 sm:p-5 lg:p-8">
          {/* Render selected vendor page */}
          {renderPage()}
        </div>
      </motion.main>
    </div>
  );
}
