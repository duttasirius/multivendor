"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  Home,
  LayoutGrid,
  Phone,
  Store,
  LogIn,
  LogOut,
  List,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png"
import { signOut } from "next-auth/react";
import { IUser } from "@/model/user.model";




export default function Navbar({ user }: { user: IUser }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <motion.div whileHover={{ rotate: 10, scale: 1.1 }}>
            <Image
              src={logo}
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </motion.div>
          <span className="text-xl font-semibold hidden sm:inline">
            MultiCart
          </span>
        </div>

        {/* Desktop Links home, category, shop & orders */}
        {user.role === "user" && (
          <div className="hidden md:flex gap-8">
            <button onClick={() => router.push("/")} className="hover:text-gray-300">
              Home
            </button>
            <button onClick={() => router.push("/category")} className="hover:text-gray-300">
              Categories
            </button>
            <button onClick={() => router.push("/shop")} className="hover:text-gray-300">
              Shop
            </button>
            <button onClick={() => router.push("/orders")} className="hover:text-gray-300">
              Orders
            </button>
          </div>
        )}

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-6">
          {user?.role === "user" && (
            <motion.button whileHover={{ scale: 1.1 }} onClick={() => router.push("/category")}>
              <Search size={24} />
            </motion.button>
          )}

          <motion.button whileHover={{ scale: 1.1 }} onClick={() => router.push("/support")}>
            <Phone size={24} />
          </motion.button>


           {/* profile icon & dropdown menu  */}
          <div className="relative">
            {user?.image ? (
              <Image
                src={user.image}
                alt="user"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border border-gray-700 cursor-pointer"
                onClick={() => setOpenMenu(!openMenu)}
              />
            ) : (
              <motion.button whileHover={{ scale: 1.1 }} onClick={() => setOpenMenu(!openMenu)}>
                <User size={24} />
              </motion.button>
            )}

            <AnimatePresence>
              {openMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-3 w-48 backdrop-blur-lg rounded-xl shadow-lg border bg-[#6a69693c]"
                >
                  <button
                    onClick={() => {
                      router.push("/profile");
                      setOpenMenu(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 hover:bg-white/10 text-left"
                  >
                    <User size={18} /> Profile
                  </button>

                  <button
                    onClick={() => {
                      router.push("/login");
                      setOpenMenu(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 hover:bg-white/10 text-left"
                  >
                    <LogIn size={18} /> Sign In
                  </button>

                  <button
                    onClick={() => {
                      signOut();
                      setOpenMenu(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 hover:bg-white/10 text-left"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

                {/* cart icon section for user  */}
          {user?.role === "user" && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => router.push("/cart")}
              className="relative"
            >
              <ShoppingCart size={24} />
              
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
                  {user.cart.length}
                </span>
              
            </motion.button>
          )}
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-8">
          {user?.role === "admin" || user?.role === "vendor" ? (
            <>
              <motion.button whileHover={{ scale: 1.1 }} onClick={() => router.push("/support")}>
                <Phone size={24} />
              </motion.button>
              
<Menu size={28} className="cursor-pointer" onClick={() => setSidebarOpen(true)} />
              <div className="relative">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="user"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover border border-gray-700 cursor-pointer"
                    onClick={() => setOpenMenu(!openMenu)}
                  />
                ) : (
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => setOpenMenu(!openMenu)}>
                    <User size={24} />
                    
                  </motion.button>
                )}
  
                <AnimatePresence>
                  {openMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-3 w-48 backdrop-blur-lg rounded-xl shadow-lg border bg-[#6a69693c]"
                    >
                      <button
                        onClick={() => {
                          router.push("/profile");
                          setOpenMenu(false);
                        }}
                        className="flex items-center gap-5 w-full px-4 py-2 hover:bg-white/10 text-left"
                      >
                        <User size={18} /> Profile
                      </button>

                      <button
                        onClick={() => {
                          router.push("/login");
                          setOpenMenu(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-white/10 text-left"
                      >
                        <LogIn size={18} /> Sign In
                      </button>

                      <button
                        onClick={() => {
                          signOut();
                          setOpenMenu(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-white/10 text-left"
                      >
                        <LogOut size={18} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <motion.button whileHover={{ scale: 1.1 }} onClick={() => router.push("/category")}>
                <Search size={24} />
              </motion.button>

              <motion.button whileHover={{ scale: 1.1 }} onClick={() => router.push("/support")}>
                <Phone size={24} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => router.push("/cart")}
                className="relative"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              <Menu size={28} className="cursor-pointer" onClick={() => setSidebarOpen(true)} />
            </>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="fixed top-0 left-0  h-screen w-[75%] bg-black/90 backdrop-blur-lg p-6 text-white"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Menu</h2>
              <X size={28} className="cursor-pointer" onClick={() => setSidebarOpen(false)} />
            </div>

            <div className="flex flex-col gap-4 text-lg">
              <button
                onClick={() => {
                  router.push("/");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#6a69693c] hover:bg-white/10 text-left"
              >
                <Home size={20} /> Home
              </button>

              <button
                onClick={() => {
                  router.push("/category");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#6a69693c] hover:bg-white/10 text-left"
              >
                <LayoutGrid size={20} /> Categories
              </button>

              <button
                onClick={() => {
                  router.push("/shop");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#6a69693c] hover:bg-white/10 text-left"
              >
                <Store size={20} /> Shop
              </button>

              <button
                onClick={() => {
                  router.push("/orders");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#6a69693c] hover:bg-white/10 text-left"
              >
                <List size={20} /> Order
              </button>

              <button
                onClick={() => {
                  router.push("/profile");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#6a69693c] hover:bg-white/10 text-left"
              >
                <User size={20} /> Profile
              </button>

              <button
                onClick={() => {
                  router.push("/login");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#6a69693c] hover:bg-white/10 text-left"
              >
                <LogIn size={20} /> Login
              </button>

              <button
                onClick={() => {
                  signOut();
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#6a69693c] hover:bg-white/10 text-left"
              >
                <LogOut size={20} /> Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}