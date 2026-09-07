"use client";

import React from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import axios from "axios";

import { AppDispatch, RootState } from "@/redux/store";
import { setAllProductsData } from "@/redux/vendorSlice";

function VendorProducts() {
  // Router is used to navigate between pages.
  const router = useRouter();

  // Typed Redux dispatch.
  const dispatch = useDispatch<AppDispatch>();

  // Get the current logged-in user.
  const currentUser = useSelector(
    (state: RootState) => state.user.userData
  );

  // Get all products from Redux.
  const { allProductsData } = useSelector(
    (state: RootState) => state.vendor
  );

  // Only show products belonging to the current vendor.
  const myProducts =
    currentUser?._id && allProductsData.length > 0
      ? allProductsData.filter(
          (product) =>
            product.vendor?._id?.toString() ===
            currentUser._id?.toString()
        )
      : [];

  // Toggle product Active / Inactive status.
  const toggleIsActive = async (
    productId: string,
    currentIsActive: boolean
  ) => {
    try {
      // Send the opposite of the current status to the backend.
      const result = await axios.post(
        "/api/vendor/isActiveProduct",
        {
          productId,
          isActive: !currentIsActive,
        }
      );

      // Update only the changed product inside Redux.
      const updatedProducts = allProductsData.map((product) =>
        product._id?.toString() === productId
          ? {
              ...product,
              isActive: result.data.product.isActive,
            }
          : product
      );

      // Save the updated products back into Redux.
      dispatch(setAllProductsData(updatedProducts));
    } catch (error) {
      // Show API errors in the browser console.
      if (axios.isAxiosError(error)) {
        console.error(
          "TOGGLE ACTIVE ERROR:",
          error.response?.data || error.message
        );
      } else {
        console.error("TOGGLE ACTIVE ERROR:", error);
      }
    }
  };

  // Get verification status text color.
  const getVerificationColor = (status?: string) => {
    if (status === "approved") {
      return "text-green-400";
    }

    if (status === "rejected") {
      return "text-red-400";
    }

    return "text-yellow-400";
  };

  // Get verification status label.
  const getVerificationLabel = (status?: string) => {
    if (!status) {
      return "Pending";
    }

    return status;
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 p-4 text-white md:p-6">
      {/* ========================================================= */}
      {/* HEADER                                                    */}
      {/* ========================================================= */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Page title and description. */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Products
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Manage all products added by you.
          </p>
        </div>

        {/* Add Product button. */}
        <motion.button
          type="button"
          onClick={() => router.push("/addVendorProduct")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 font-medium shadow-lg shadow-blue-500/20 transition hover:bg-blue-600"
        >
          <PlusCircle size={20} />

          <span>Add Product</span>
        </motion.button>
      </div>

      {/* ========================================================= */}
      {/* MOBILE VIEW                                               */}
      {/* ========================================================= */}

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {myProducts.map((product, index) => {
          // Product can only be enabled or disabled after approval.
          const isApproved =
            product.verificationStatus === "approved";

          return (
            <motion.div
              key={product._id?.toString() || index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                duration: 0.3,
              }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg"
            >
              {/* Product image. */}
              <div className="relative h-56 w-full bg-white/5">
                <Image
                  src={product.image1}
                  alt={product.title || "Product image"}
                  fill
                  className="object-cover"
                  sizes="90vw"
                />
              </div>

              {/* Product details. */}
              <div className="p-4">
                {/* Product title and price. */}
                <div className="mb-5">
                  <h3 className="text-lg font-semibold text-white">
                    {product.title}
                  </h3>

                  <p className="mt-1 text-lg font-bold text-blue-400">
                    ₹{product.price}
                  </p>
                </div>

                {/* Product status information. */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Verification status. */}
                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-xs text-slate-500">
                      Verification
                    </p>

                    <p
                      className={`mt-1 text-sm font-semibold ${getVerificationColor(
                        product.verificationStatus
                      )}`}
                    >
                      {getVerificationLabel(
                        product.verificationStatus
                      )}
                    </p>
                  </div>

                  {/* Active status. */}
                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-xs text-slate-500">
                      Status
                    </p>

                    <p
                      className={`mt-1 text-sm font-semibold ${
                        product.isActive
                          ? "text-green-400"
                          : "text-slate-400"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>

                {/* Action buttons. */}
                <div className="mt-5 grid grid-cols-1 gap-2">
                  {/* Edit button. */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    Edit
                  </motion.button>

                  {/* Enable / Disable button. */}
                  <motion.button
                    type="button"
                    onClick={() =>
                      toggleIsActive(
                        String(product._id),
                        Boolean(product.isActive)
                      )
                    }
                    disabled={!isApproved}
                    whileHover={
                      isApproved ? { scale: 1.02 } : {}
                    }
                    whileTap={
                      isApproved ? { scale: 0.97 } : {}
                    }
                    className={`rounded-xl px-3 py-3 text-sm font-medium transition ${
                      isApproved
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "cursor-not-allowed bg-gray-600 text-gray-300"
                    }`}
                  >
                    {product.isActive ? "Disable" : "Enable"}
                  </motion.button>
                </div>

                {/* Rejected reason. */}
                {product.verificationStatus === "rejected" && (
                  <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-3">
                    <p className="text-xs font-semibold text-red-400">
                      Rejected
                    </p>

                    <p className="mt-1 text-sm leading-5 text-slate-400">
                      {product.rejectedReason ||
                        "No reason provided"}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Mobile empty state. */}
        {myProducts.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <p className="font-semibold text-white">
              No products found
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Add your first product to see it here.
            </p>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* DESKTOP VIEW                                              */}
      {/* ========================================================= */}

      <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            {/* Table header. */}
            <thead className="border-b border-white/10 bg-white/[0.04]">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Image
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Title
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Price
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Verification
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table body. */}
            <tbody className="divide-y divide-white/5">
              {myProducts.map((product, index) => {
                // Product must be approved before enabling/disabling.
                const isApproved =
                  product.verificationStatus === "approved";

                return (
                  <motion.tr
                    key={product._id?.toString() || index}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.35,
                    }}
                    whileHover={{
                      backgroundColor:
                        "rgba(255,255,255,0.03)",
                    }}
                  >
                    {/* Product image. */}
                    <td className="px-5 py-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                        <Image
                          src={product.image1}
                          alt={
                            product.title || "Product image"
                          }
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                    </td>

                    {/* Product title. */}
                    <td className="px-5 py-4 font-medium">
                      {product.title}
                    </td>

                    {/* Product price. */}
                    <td className="px-5 py-4">
                      ₹{product.price}
                    </td>

                    {/* Verification status. */}
                    <td className="px-5 py-4">
                      <span
                        className={`text-sm font-semibold ${getVerificationColor(
                          product.verificationStatus
                        )}`}
                      >
                        {getVerificationLabel(
                          product.verificationStatus
                        )}
                      </span>
                    </td>

                    {/* Active status. */}
                    <td className="px-5 py-4">
                      <span
                        className={
                          product.isActive
                            ? "font-semibold text-green-400"
                            : "font-semibold text-slate-400"
                        }
                      >
                        {product.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    {/* Action buttons. */}
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        {/* Edit button. */}
                        <button
                          type="button"
                          className="rounded-lg bg-white/5 px-3 py-2 text-sm transition hover:bg-white/10"
                        >
                          Edit
                        </button>

                        {/* Enable / Disable button. */}
                        <button
                          type="button"
                          onClick={() =>
                            toggleIsActive(
                              String(product._id),
                              Boolean(product.isActive)
                            )
                          }
                          disabled={!isApproved}
                          className={`rounded-lg px-3 py-2 text-sm transition ${
                            isApproved
                              ? "bg-green-500 hover:bg-green-600"
                              : "cursor-not-allowed bg-gray-600 text-gray-300"
                          }`}
                        >
                          {product.isActive
                            ? "Disable"
                            : "Enable"}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}

              {/* Desktop empty state. */}
              {myProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-16 text-center"
                  >
                    <p className="font-semibold text-white">
                      No products found
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Add your first product to see it here.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VendorProducts;