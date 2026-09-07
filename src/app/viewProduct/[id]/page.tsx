"use client";

import ProductCard from "@/components/ProductCard";
import useGetAllProducts from "@/hooks/useGetAllProducts";
import { IProduct } from "@/model/product.model";
import { RootState } from "@/redux/store";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Loader2,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  User,
} from "lucide-react";
import { IoIosStar } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function ViewProduct() {
  // Get all products and store them in Redux.
  useGetAllProducts();

  // Get the product id from the URL.
  const params = useParams();
  const productId = params.id as string;

  // Review state.
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Get all products from Redux.
  const { allProductsData } = useSelector((state: RootState) => state.vendor);

  // Find the current product.
  const product: IProduct | undefined = allProductsData.find(
    (p: IProduct) => String(p._id) === String(productId),
  );

  // Find products from the same category.
  const relatedProducts = allProductsData.filter(
    (p) =>
      p.category === product?.category &&
      String(p._id) !== String(product?._id),
  );

  // Create a clean array of available product images.
  const images: string[] = [
    product?.image1,
    product?.image2,
    product?.image3,
    product?.image4,
  ].filter((img): img is string => Boolean(img?.trim()));

  // Store the currently selected product image.
  const [activeImage, setActiveImage] = useState(0);

  // Store selected size for wearable products.
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // review section
  const totalReview = product?.reviews?.length;

  const avgRating =
    product && totalReview! > 0
      ? (product.reviews ?? []).reduce(
          (sum: number, r: { rating: number }) => sum + r.rating,
          // Defines the function used by `reduce()`; `sum` is the accumulated total so far, while `r` is the current review object and TypeScript is told that it contains a numeric `rating`.
          0,
          // This is the initial value for `sum`; the calculation starts from zero before the first review is processed.
        ) / totalReview!
      : 0;

  // review submit api
  const handleReviewSubmit = async () => {
    if (!reviewRating) {
      alert("Please select a rating");
      return;
    }

    if (!reviewComment.trim()) {
      alert("Please write a review");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("productId", String(productId));
      formData.append("comment", reviewComment.trim());
      formData.append("rating", String(reviewRating));

      // Send the actual File, NOT the preview URL
      if (reviewImage) {
        formData.append("image", reviewImage);
      }

      const result = await axios.post("/api/vendor/addReview", formData);

      console.log("Review response:", result.data);

      alert("Review Submitted Successfully ✅");

      setReviewComment("");
      setReviewImage(null);
      setPreview(null);
      setReviewRating(0);
    } catch (error) {
      console.error("Review submission failed:", error);

      if (axios.isAxiosError(error)) {
        console.error("API response:", error.response?.data);

        alert(error.response?.data?.message || "Failed to submit review");
      } else {
        alert("Something went wrong");
      }
    } finally {
      // Always stop loading
      setLoading(false);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const result = await axios.post("/api/user/cart/add", {
        productId: productId,
        quantity: 1,
      });
      console.log(result.data);
      alert("Added to Cart");
      router.push("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Main page with dark gradient background.
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 px-4 py-8 text-white sm:px-6 lg:px-8">
      {/* Main page container keeps everything centered. */}
      <div className="mx-auto max-w-7xl">
        {/* Main product area contains images and product information. */}
        <div className="grid grid-cols-1 items-start gap-8 pt-4 lg:grid-cols-2 lg:gap-10">
          {/* Left side: product gallery */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex w-full items-start gap-4"
          >
            {/* Product thumbnails */}
            <div
              className="
        order-2 flex shrink-0 gap-3 overflow-x-auto pb-2
        lg:order-1 lg:w-20 lg:flex-col lg:overflow-visible
      "
            >
              {images.map((img, index) => (
                <motion.button
                  key={`${img}-${index}`}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveImage(index)}
                  className={`
            relative h-16 w-16 shrink-0 overflow-hidden rounded-xl
            border-2 transition-all duration-300
            sm:h-20 sm:w-20
            ${
              activeImage === index
                ? "border-blue-500 ring-2 ring-blue-500/20"
                : "border-white/10 hover:border-white/40"
            }
          `}
                >
                  <Image
                    src={img}
                    alt={`Product image ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </div>

            {/* Main product image */}
            <div
              className="
        order-1 relative min-w-0 flex-1 overflow-hidden
        rounded-3xl border border-white/10
        bg-white/[0.03] shadow-2xl backdrop-blur-sm
        h-[350px]
        sm:h-[450px]
        lg:order-2 lg:h-[520px]
      "
            >
              {images[activeImage] ? (
                <motion.div
                  key={images[activeImage]}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[activeImage]}
                    alt={product?.title || "Product image"}
                    fill
                    priority
                    sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 90vw,
              45vw
            "
                    className="object-cover"
                  />
                </motion.div>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-neutral-500">
                  No image available
                </div>
              )}
            </div>
          </motion.div>

          {/* Right side: product information */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex w-full flex-col lg:pt-0"
          >
            {/* Product category */}
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
              {product?.category ?? "Product"}
            </p>

            {/* Product title */}
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {product?.title ?? "Product"}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-400"
                    fill="currentColor"
                  />
                ))}
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-sm font-medium text-white/60 backdrop-blur-sm">
                <span className="text-amber-400">★</span>
                {/* toFixed(1)` formats the number to exactly 1 digit after the decimal point; for example, 4.33333 becomes "4.3", while 5 becomes "5.0". */}
                <span className="text-white/80">{avgRating.toFixed(1)}</span>
                <span className="text-white/30">·</span>
                <span>{totalReview} Reviews</span>
              </span>
            </div>

            {/* Product price */}
            <p className="mt-6 text-3xl font-bold text-white">
              ₹{product?.price ?? 0}
            </p>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-400 sm:text-base">
              {product?.description ?? "No product description available."}
            </p>

            {/* Stock status */}
            <div className="mt-5">
              <span
                className={`
          inline-flex rounded-full px-4 py-2 text-sm font-semibold
          ${
            (product?.stock ?? 0) > 0
              ? "bg-green-500/10 text-green-400 ring-1 ring-green-500/20"
              : "bg-red-500/10 text-red-400 ring-1 ring-red-500/20"
          }
        `}
              >
                {(product?.stock ?? 0) > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Size selection */}
            {product?.isWearable && (
              <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="mb-4 text-sm font-semibold text-white">
                  Select Size
                </p>

                <div className="flex flex-wrap gap-3">
                  {product.sizes?.map((size) => (
                    <motion.button
                      key={size}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`
                rounded-xl border px-4 py-2 text-sm font-medium
                transition-all
                ${
                  selectedSize === size
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-white/10 bg-white/5 text-neutral-300 hover:border-white/30"
                }
              `}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={(product?.stock ?? 0) <= 0}
              className="
        mt-7 flex w-full items-center justify-center gap-2
        rounded-2xl bg-blue-600 px-6 py-4
        font-semibold transition-all
        hover:bg-blue-500
        disabled:cursor-not-allowed
        disabled:bg-neutral-800
        disabled:text-neutral-500
      "
            >
              <ShoppingCart size={20} />

              {(product?.stock ?? 0) > 0 ? "Add To Cart" : "Out of Stock"}
            </motion.button>
          </motion.div>
        </div>

        {/* Product service information cards. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Replacement information. */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.05]">
            <div className="mb-3 flex items-center gap-3">
              <RotateCcw size={21} className="text-blue-400" />
              <h3 className="font-semibold">Replacement</h3>
            </div>

            <p className="text-sm text-neutral-400">
              Within {product?.replacementDays ?? 0} days
            </p>
          </div>

          {/* Delivery information. */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.05]">
            <div className="mb-3 flex items-center gap-3">
              <Truck size={21} className="text-green-400" />
              <h3 className="font-semibold">Delivery</h3>
            </div>

            <p className="text-sm text-neutral-400">
              {product?.freeDelivery
                ? "Free delivery available"
                : "Standard delivery"}
            </p>
          </div>

          {/* Payment information. */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.05]">
            <div className="mb-3 flex items-center gap-3">
              <ShoppingCart size={21} className="text-yellow-400" />
              <h3 className="font-semibold">Payment</h3>
            </div>

            <p className="text-sm text-neutral-400">
              {product?.payOnDelivery
                ? "Cash on Delivery available"
                : "Online payment only"}
            </p>
          </div>

          {/* Warranty information. */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.05]">
            <div className="mb-3 flex items-center gap-3">
              <ShieldCheck size={21} className="text-purple-400" />
              <h3 className="font-semibold">Warranty</h3>
            </div>

            <p className="text-sm text-neutral-400">
              {product?.warranty ?? "Warranty Not Available"}
            </p>
          </div>
        </motion.div>

        {/* Product details section. */}
        {(product?.detailsPoints?.length ?? 0) > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl sm:p-8"
          >
            {/* Product details heading. */}
            <h2 className="text-2xl font-bold">Product Details</h2>

            {/* Product key points. */}
            <ul className="mt-6 space-y-4">
              {product?.detailsPoints?.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-6 text-neutral-400"
                >
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Related products section. */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-14"
          >
            {/* Related products heading. */}
            <div className="mb-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
                You may also like
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Related Products
              </h2>
            </div>

            {/* Related products grid. */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.slice(0, 4).map((rp) => (
                <motion.div
                  key={rp._id?.toString()}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard product={rp} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Customer review section. */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 pb-12"
        >
          {/* Review section heading. */}
          <div className="mb-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
              Customer feedback
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Customer Reviews
            </h2>
          </div>

          {/* Review form card. */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl sm:p-8">
            {/* Review title. */}
            <h3 className="text-lg font-semibold">Add Your Review</h3>

            {/* Review rating selection. */}
            <div className="mt-5">
              <p className="mb-3 text-sm text-neutral-400">Your Rating</p>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.button
                    key={i}
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setReviewRating(i)}
                    className="text-yellow-400"
                  >
                    <Star
                      size={25}
                      fill={i <= reviewRating ? "currentColor" : "none"}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Review comment textarea. */}
            <div className="mt-6">
              <label
                htmlFor="review"
                className="mb-2 block text-sm text-neutral-400"
              >
                Your Review
              </label>

              <textarea
                id="review"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Write a Review..."
                rows={5}
                className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-blue-500"
              />
            </div>

            {/* Image upload area. */}
            <div className="mt-6">
              {/* Image upload label. */}
              <label
                htmlFor="img"
                className="mb-3 block text-sm text-neutral-400"
              >
                Select Image for Review
              </label>

              {/* Image file input. */}
              <input
                type="file"
                id="img"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setReviewImage(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                className="block  cursor-pointer rounded-xl border border-white/10 bg-black/30 text-sm text-neutral-400 file:mr-4 file:border-0 file:bg-blue-600 file:px-4 file:py-3 file:text-white hover:file:bg-blue-500"
              />

              {/* Show the selected image preview. */}
              {preview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4"
                >
                  <Image
                    src={preview}
                    alt="Review image preview"
                    width={120}
                    height={120}
                    className="h-28 w-28 rounded-xl border border-white/10 object-cover"
                  />
                </motion.div>
              )}

              {/* Submit review button. */}
              <motion.button
                onClick={handleReviewSubmit}
                type="button"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : undefined}
                whileTap={!loading ? { scale: 0.98 } : undefined}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </motion.button>
            </div>

            {/* PRODUCT  REVIEWS SECTION FROM USER  */}
            {/* Product Reviews Section */}
            {product?.reviews && product.reviews.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="mt-12"
              >
                {/* Reviews heading */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    Product Reviews
                  </h3>

                  <p className="mt-2 text-sm text-neutral-400">
                    See what customers are saying about this product.
                  </p>
                </div>

                {/* Reviews grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {product.reviews.map((r, index) => (
                    <motion.article
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.08,
                      }}
                      whileHover={{
                        y: -5,
                        transition: { duration: 0.2 },
                      }}
                      className="
            group flex h-full flex-col
            rounded-2xl
            border border-white/10
            bg-white/[0.04]
            p-5
            shadow-lg
            backdrop-blur-sm
            transition-all
            duration-300
            hover:border-white/20
            hover:bg-white/[0.06]
            hover:shadow-2xl
          "
                    >
                      {/* User information */}
                      <div className="flex items-center gap-3">
                        {/* User avatar */}
                        <div
                          className="
                relative flex h-12 w-12 shrink-0
                items-center justify-center
                overflow-hidden
                rounded-full
                border-2 border-blue-500/40
                bg-neutral-900
              "
                        >
                          {r.user?.image ? (
                            <Image
                              src={r.user.image}
                              alt={r.user.name || "User"}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <User size={22} className="text-neutral-400" />
                          )}
                        </div>

                        {/* User name + rating */}
                        <div className="min-w-0 flex-1">
                          {/* User name */}
                          <p className="truncate text-sm font-semibold text-white">
                            {r.user?.name || "Anonymous User"}
                          </p>

                          {/* Rating stars */}
                          <div className="mt-1 flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) =>
                              star <= r.rating ? (
                                <IoIosStar
                                  key={star}
                                  size={16}
                                  className="text-yellow-400"
                                />
                              ) : (
                                <FaStar
                                  key={star}
                                  size={14}
                                  className="text-neutral-600"
                                />
                              ),
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Review comment */}
                      <p
                        className="
              mt-5
              text-sm
              leading-7
              text-neutral-300
            "
                      >
                        {r.comment}
                      </p>

                      {/* Review image */}
                      {r.image && (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                          className="
                relative
                mt-5
                aspect-square
                w-full
                overflow-hidden
                rounded-xl
                border border-white/10
                bg-neutral-900
              "
                        >
                          <Image
                            src={r.image}
                            alt="Customer review image"
                            fill
                            sizes="
                  (max-width: 640px) 100vw,
                  (max-width: 1024px) 50vw,
                  33vw
                "
                            className="
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
                          />
                        </motion.div>
                      )}
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </motion.section>
      </div>
    </main>
  );
}

export default ViewProduct;
