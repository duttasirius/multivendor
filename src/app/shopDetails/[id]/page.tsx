"use client";

import ProductCard from "@/components/ProductCard";
import useGetAllProducts from "@/hooks/useGetAllProducts";
import useGetAllVendors from "@/hooks/useGetAllVendors";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  MapPin,
  Package,
  ShieldCheck,
  Store,
} from "lucide-react";
import { IProduct } from "@/model/product.model";

function ShopDetails() {
  const params = useParams();
  const vendorId = params.id as string;

  useGetAllProducts();
  useGetAllVendors();

  const { allVendorsData } = useSelector((state: RootState) => state.vendor);

  const { allProductsData } = useSelector((state: RootState) => state.vendor);

  const vendor = allVendorsData.find((v: any) => v._id === vendorId);

  const vendorProducts = Array.isArray(allProductsData)
    ? allProductsData.filter((p: any) => p.vendor._id === vendor?._id)
    : [];

  return (
    // Main page container providing a premium dark background, full viewport height, responsive spacing, and white text for the entire shop details screen.
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.04),transparent_22%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.06),transparent_28%),linear-gradient(135deg,#010101_0%,#050505_40%,#020202_70%,#090909_100%)] px-4 py-6 text-white sm:px-6 lg:px-8">
      {/* Wrapper keeps the complete shop content centered, limits the maximum width, and provides consistent vertical spacing between the vendor information and product sections. */}
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero section displays the vendor image and business information inside a premium glass-style card with responsive two-column layout on medium and larger screens. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/40 backdrop-blur-2xl md:grid-cols-2"
        >
          {/* Vendor image container centers the shop profile image inside a large responsive area with subtle borders, gradients, and premium background treatment. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative flex min-h-[320px] items-center justify-center overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_55%)] p-8 md:min-h-[420px] md:border-b-0 md:border-r"
          >
            {/* Decorative background glow gives the vendor image area depth without changing the actual page logic or data. */}
            <div className="absolute h-72 w-72 rounded-full bg-blue-500/[0.04] blur-3xl" />

            {/* Vendor avatar wrapper keeps the image centered, rounded, bordered, and visually elevated above the dark background. */}
            <div className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/50 ring-1 ring-white/5 sm:h-56 sm:w-56">
              {vendor?.image ? (
                <Image
                  src={vendor.image}
                  alt={vendor?.shopName || "Vendor image"}
                  fill
                  className="object-cover"
                />
              ) : (
                <Store className="h-16 w-16 text-white/20" />
              )}
            </div>
          </motion.div>

          {/* Vendor details section displays the shop name, address, GST information, verification state, and other business metadata in a clean premium layout. */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-col justify-center p-6 sm:p-8 lg:p-10"
          >
            {/* Small category badge identifies the section as a verified store profile and gives the heading area a more polished visual hierarchy. */}
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-400/10 bg-blue-500/[0.07] px-3 py-1.5 text-xs font-medium text-blue-300">
              <Store className="h-3.5 w-3.5" />
              Vendor Store
            </div>

            {/* Shop title displays the vendor's actual shop name as the primary heading for the page. */}
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {vendor?.shopName || "Shop Details"}
            </h1>

            {/* Vendor name provides the business owner/store identity directly beneath the main shop heading. */}
            <p className="mt-2 text-sm text-white/40">
              {vendor?.name || "Vendor"}
            </p>

            {/* Business information container groups the address, GST number, and verification information into separate readable rows. */}
            <div className="mt-7 space-y-4">
              {/* Shop address row displays the physical business location associated with the vendor account. */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035]">
                  <MapPin className="h-4 w-4 text-blue-400" />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/25">
                    Shop Address
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/70">
                    {vendor?.shopAddress || "Address not available"}
                  </p>
                </div>
              </div>

              {/* GST information row displays the vendor's registered GST number when it exists in the vendor document. */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035]">
                  <Building2 className="h-4 w-4 text-purple-400" />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/25">
                    GST Number
                  </p>

                  <p className="mt-1 text-sm text-white/70">
                    {vendor?.gstNumber || "Not available"}
                  </p>
                </div>
              </div>

              {/* Verification status row communicates whether the vendor is currently approved, pending, or rejected. */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035]">
                  {vendor?.verificationStatus === "approved" ? (
                    <BadgeCheck className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <ShieldCheck className="h-4 w-4 text-amber-400" />
                  )}
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/25">
                    Verification Status
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`text-sm font-medium capitalize ${
                        vendor?.verificationStatus === "approved"
                          ? "text-emerald-300"
                          : vendor?.verificationStatus === "rejected"
                            ? "text-red-300"
                            : "text-amber-300"
                      }`}
                    >
                      {vendor?.verificationStatus || "Pending"}
                    </span>

                    {vendor?.verificationStatus === "approved" && (
                      <BadgeCheck className="h-4 w-4 text-emerald-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Products section contains the vendor's product count heading and either an empty state or the responsive product card grid. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-7"
        >
          {/* Products header identifies the current vendor and gives the product section a clear visual hierarchy. */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-white/25">
                <Package className="h-3.5 w-3.5" />
                Store Products
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Products by{" "}
                <span className="text-blue-400">
                  {vendor?.shopName || "this vendor"}
                </span>
              </h2>
            </div>

            {/* Product count badge displays how many products were found for the selected vendor. */}
            <div className="w-fit rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-white/45">
              {vendorProducts.length}{" "}
              {vendorProducts.length === 1 ? "Product" : "Products"}
            </div>
          </div>

          {vendorProducts.length === 0 ? (
            // Empty state is displayed when no products belonging to the selected vendor were found in allProductsData after filtering by the vendor ID.
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/10 px-6 text-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                <Package className="h-6 w-6 text-white/25" />
              </div>

              <p className="text-sm font-medium text-white/60">
                No products available
              </p>

              <p className="mt-1 max-w-sm text-xs leading-5 text-white/30">
                This vendor has not added any products to their store yet.
              </p>
            </motion.div>
          ) : (
            // Product grid renders the products that were actually found in allProductsData for the selected vendor.
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {vendorProducts.map((p: IProduct, i: number) => (
                // Each product is animated into the page individually while preserving the existing ProductCard component and its product data.
                <motion.div
                  key={String(p._id) || i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.05,
                  }}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default ShopDetails;
