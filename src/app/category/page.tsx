"use client";

import { RootState } from "@/redux/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Star, Store } from "lucide-react";

function Page() {
  const { allVendorsData } = useSelector((state: RootState) => state.vendor);

  // Store all product categories that can be selected from the sidebar.
  const categoryList = [
    { label: "all", icon: "🗂️" },
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

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [selectedShop, setSelectedShop] = useState("all");
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  const [search, setSearch] = useState("");

  // Store the products that should currently be rendered in the product grid.
  const [displayProducts, setDisplayProducts] = useState<any[]>([]);

  // for getting data from frontend category Slider
  useEffect(() => {
    // search from frontend URL
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
    setIsReady(true);
  }, []);

  // Fetch products API
  const fetchProduct = async () => {
    try {
      // Create a URLSearchParams object for safely constructing the API query string.
      const params = new URLSearchParams();

      // Add the search text as the "query" parameter only when the input is not empty.
      if (search.trim()) {
        // need to kept parameter name same at frontend & backend
        params.append("query", search.trim());
      }

      // Add the category as the "category" parameter only when a specific category is selected.
      if (selectedCategory !== "all") {
        // need to kept parameter name same at frontend & backend
        params.append("category", selectedCategory);
      }

      // Send a GET request to the search API with the generated query parameters.
      const result = await axios.get(`/api/search?${params.toString()}`);
      console.log(result.data);
      // Store the complete API result inside apiProducts for possible later processing.

      // Display all products returned from the API by default.
      setDisplayProducts(result.data.products || []);
    } catch (error) {
      // Print the API error in the browser console for debugging.
      console.error("Error fetching products:", error);

      // Clear the product states when the API request fails.

      setDisplayProducts([]);
    }
  };

  // Fetch products when the component first loads and whenever search or category changes.
  useEffect(() => {
    // Call the API using the latest search and category values.
    if (!isReady) return;
    fetchProduct();
  }, [selectedCategory, search, isReady]);

  // review section

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white md:px-6 lg:px-8">
      {/* Header container that keeps the page title centered and limits its maximum width. */}
      <div className="mx-auto mb-8 max-w-7xl">
        {/* Animated page heading that fades in and moves down slightly when the component loads. */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold tracking-tight md:text-4xl"
        >
          Browse Products by Categories
        </motion.h1>

        {/* Supporting text explaining that products can be searched or filtered by category. */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-2 text-sm text-white/60 md:text-base"
        >
          Find the perfect product by searching or selecting a category.
        </motion.p>
      </div>

      {/* Main content container that places the filter sidebar beside the product results on large screens. */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left sidebar containing search controls and category filters. */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className=" rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-xl backdrop-blur-xl lg:col-span-1"
        >
          {/* Search section containing the search label and controlled input field. */}
          <div className="mb-6">
            {/* Label explaining that the input searches the available products. */}
            <p className="mb-2 text-sm font-medium text-white/80">
              Search Products
            </p>

            {/* Controlled search input that stores every typed value inside the search state. */}
            <input
              type="text"
              value={search}
              placeholder="Search products..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/30 focus:border-white/30 focus:bg-white/10"
            />
          </div>

          {/* Category filter section containing the complete list of available product categories. */}
          <div>
            {/* Label identifying the category selection section. */}
            <p className="mb-3 text-sm font-medium text-white/80">Categories</p>

            {/* Scrollable category container that prevents the sidebar from becoming unnecessarily tall. */}
            <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
              {categoryList.map((cat) => {
                // Determine whether the current category is selected so it can receive active styling.
                const isSelected = selectedCategory === cat.label;

                return (
                  <motion.button
                    key={cat.label}
                    type="button"
                    onClick={() => setSelectedCategory(cat.label)}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                      isSelected
                        ? "bg-white text-black shadow-lg"
                        : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {/* Display the emoji associated with the current category. */}
                    <span className="text-lg">{cat.icon}</span>

                    {/* Display the human-readable category name. */}
                    <span>{cat.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right content area containing the selected-category information and product grid. */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-3"
        >
          {/* Result header showing the selected category and number of matching products. */}
          <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Container displaying information about the currently selected category. */}
            <div>
              {/* Small descriptive label placed above the selected category name. */}
              <p className="text-sm text-white/50">Showing results for</p>

              {/* Display the selected category or "All Categories" when all categories are active. */}
              <h2 className="mt-1 text-xl font-semibold">
                {selectedCategory === "all"
                  ? "All Categories"
                  : selectedCategory}
              </h2>
            </div>

            {/* Product count badge showing how many products are currently displayed. */}
            <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-white/70">
              {displayProducts.length}{" "}
              {displayProducts.length === 1 ? "Product" : "Products"}
            </div>
          </div>

          {/* Responsive product grid that changes the number of columns based on screen size. */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {displayProducts.length > 0 ? (
              displayProducts.map((product, index) => {
                // Work out stock status once so it can drive both the image treatment and the badge below.
                const inStock = product.stock > 0;

                // review section
                const totalReview = product?.reviews?.length || 0;

                const avgRating =
                  totalReview > 0
                    ? product.reviews.reduce(
                        (sum: number, r: { rating: number }) => sum + r.rating,
                        0,
                      ) / totalReview
                    : 0;

                return (
                  <motion.div
                    key={product._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(index * 0.05, 0.3),
                    }}
                    whileHover={{ y: -4 }}
                    onClick={() => router.push(`/viewProduct/${product._id}`)}
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_16px_50px_-16px_rgba(212,175,143,0.25)]"
                  >
                    {/* Product image container keeping every product image at the same card height. */}
                    <div className="relative h-56 w-full overflow-hidden bg-white/5">
                      {/* Display the first image stored in the product database document. */}
                      <Image
                        src={product.image1}
                        alt={product.title || "Product image"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                          inStock ? "" : "opacity-40 grayscale"
                        }`}
                      />

                      {/* Soft gradient at the base of the image so it blends cleanly into the card body below. */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

                      {/* Out-of-stock overlay label shown directly on the image when nothing is left. */}
                      {!inStock && (
                        <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/70 backdrop-blur-sm">
                          Out of stock
                        </div>
                      )}
                    </div>

                    {/* Product information container holding the main product details. */}
                    <div className="p-5">
                      {/* Category shown as a small tracked-out eyebrow above the title. */}
                      <p className="text-[11px] font-medium uppercase tracking-widest text-[#D4AF8F]/70">
                        {product.category || "Uncategorized"}
                      </p>

                      {/* Product title displayed prominently and limited to two lines. */}
                      <h3 className="mt-1.5 line-clamp-2 text-lg font-semibold text-white">
                        {product.title || "Untitled Product"}
                      </h3>

                      {/* Product description displayed with a two-line limit to keep cards consistent in height. */}
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/50">
                        {product.description || "No description available."}
                      </p>

                      {/* review section  */}
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}

                          <Star className="h-4 w-4 text-yellow-400/40" />
                        </div>

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1.5 text-xs font-semibold text-yellow-300 shadow-sm">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          <span>{avgRating.toFixed(1)}</span>
                          <span className="text-yellow-200/40">•</span>
                          <span className="text-white/45">
                            {totalReview} reviews
                          </span>
                        </span>
                      </div>

                      <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/60 shadow-sm backdrop-blur-md">
                        <Store className="h-3.5 w-3.5 text-white/35" />
                        <span>Sold by</span>
                        <span className="font-semibold text-white/90">
                          {product.vendor.name}
                        </span>
                      </span>

                      {/* Hairline divider separating the description from the price/stock row. */}
                      <div className="mt-4 border-t border-white/10" />

                      {/* Bottom product information row containing price and stock information. */}
                      <div className="mt-4 flex items-center justify-between gap-3">
                        {/* Display the product price using Indian Rupee formatting, in a warm accent tone as the card's one highlight. */}
                        <span className="text-xl font-semibold tracking-tight text-[#53db1d]">
                          ₹{product.price ?? 0}
                        </span>

                        {/* Display the available stock count or an out-of-stock message, using a status dot instead of a filled pill. */}
                        <span className="flex items-center gap-1.5 text-xs text-white/50">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              inStock ? "bg-emerald-400" : "bg-white/30"
                            }`}
                          />
                          {inStock ? `${product.stock} left` : "Unavailable"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-10 text-center sm:col-span-2 xl:col-span-3"
              >
                {/* Empty-state heading shown when no products match the current filters. */}
                <h3 className="text-lg font-semibold text-white">
                  No products found
                </h3>

                {/* Empty-state message suggesting that the user change the current search or category. */}
                <p className="mt-2 text-sm text-white/50">
                  Try changing your search text or selecting another category.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Page;
