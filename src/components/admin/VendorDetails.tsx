"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  BadgeCheck,
  Building2,
  Mail,
  MapPin,
  Package,
  ShieldCheck,
  Store,
  User,
  XCircle,
} from "lucide-react";

import { RootState } from "@/redux/store";
import { IUser } from "@/model/user.model";
import Image from "next/image";

function VendorDetails() {
  const { allVendorsData } = useSelector((state: RootState) => state.vendor);

  return (
    // Main page container provides the premium dark background, responsive spacing, full viewport height, and white typography for the complete vendor-management screen.
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.04),transparent_22%),radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.06),transparent_26%),linear-gradient(135deg,#010101_0%,#050505_40%,#020202_70%,#090909_100%)] px-3 py-5 text-white sm:px-6 sm:py-7 lg:px-8">
      {/* Main wrapper keeps the vendor content centered, limits its maximum width, and separates the page header from the vendor listing. */}
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header section introduces the vendor-management page and provides a compact summary of the vendors currently stored in Redux state. */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          {/* Page title and description area explains what information is displayed for every vendor. */}
          <div>
            {/* Small eyebrow label identifies the page as a vendor administration section. */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/40 backdrop-blur-xl">
              <Store className="h-3.5 w-3.5 text-blue-400" />
              Vendor Management
            </div>

            {/* Main heading displays the title of the vendor listing page. */}
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              All Vendors
            </h1>

            {/* Supporting text explains the vendor information available in the table and cards below. */}
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/35">
              Review vendor names, shop information, contact details, GST
              registration, and approval status.
            </p>
          </div>

          {/* Summary badge displays the total number of vendors currently available in the Redux vendor state. */}
          <div className="w-fit rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 shadow-xl shadow-black/20 backdrop-blur-xl">
            {/* Summary label identifies the number shown below as the total vendor count. */}
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">
              Total Vendors
            </p>

            {/* Vendor count displays the current number of vendors in allVendorsData. */}
            <p className="mt-1 text-2xl font-semibold text-white">
              {allVendorsData.length}
            </p>
          </div>
        </motion.div>

        {/* Desktop table is displayed from medium screens upward and organizes every vendor into a structured row containing identity, shop, contact, GST, and approval information. */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="hidden overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-2xl md:block"
        >
          {/* Horizontal table wrapper prevents the table from breaking when vendor information becomes wider than the available screen. */}
          <div className="overflow-x-auto">
            {/* Vendor table displays one vendor per row and separates business information into clearly labeled columns. */}
            <table className="w-full min-w-[1000px] text-left">
              {/* Table header defines the information represented by each vendor column. */}
              <thead className="border-b border-white/10 bg-white/[0.025]">
                {/* Header row contains the labels for vendor identity, shop, address, email, GST, and approval status. */}
                <tr>
                  {/* Vendor column identifies the vendor account using their name and role. */}
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    Vendor
                  </th>

                  {/* Shop column displays the registered shop/business name. */}
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    Shop
                  </th>

                  {/* Address column displays the physical shop address associated with the vendor. */}
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    Shop Address
                  </th>

                  {/* Email column displays the vendor's registered email address. */}
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    Email
                  </th>

                  {/* GST column displays the registered GST number or an unavailable state. */}
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    GST Number
                  </th>

                  {/* Approval column displays whether the vendor account has been approved. */}
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    Approval
                  </th>
                </tr>
              </thead>

              {/* Table body renders every vendor from Redux state as a separate animated row. */}
              <tbody className="divide-y divide-white/[0.06]">
                {/* Loop through every vendor so each IUser object can be displayed as an individual table row. */}
                {allVendorsData.map((vendor: IUser, index: number) => (
                  // Animated vendor row smoothly fades and slides into place while preserving the original vendor data and display logic.
                  <motion.tr
                    key={String(vendor._id) || index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.04,
                    }}
                    whileHover={{
                      backgroundColor: "rgba(255,255,255,0.025)",
                    }}
                    className="transition-colors"
                  >
                    {/* Vendor identity cell displays the vendor's profile name and confirms that the record belongs to a vendor account. */}
                    <td className="px-5 py-5 align-top">
                      {/* Vendor identity wrapper keeps the avatar icon, name, and role together in one compact area. */}
                      <div className="flex items-center gap-3">
                        {/* Vendor avatar container displays the vendor image when available or a user icon otherwise. */}
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                          {vendor.image ? (
                            <Image
                              src={vendor.image}
                              alt={vendor.name}
                              width={100}
                              height={100}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <User className="h-4 w-4 text-white/30" />
                          )}
                        </div>

                        {/* Vendor identity text contains the vendor name and role. */}
                        <div>
                          {/* Vendor name displays the person's registered account name. */}
                          <p className="text-sm font-semibold text-white">
                            {vendor.name}
                          </p>

                          {/* Vendor role confirms that the account is a vendor account. */}
                          <p className="mt-1 text-[11px] capitalize text-white/30">
                            {vendor.role}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Shop cell displays the vendor's registered business/shop name. */}
                    <td className="px-5 py-5 align-top">
                      {/* Shop information wrapper groups the store icon with the shop name for quick identification. */}
                      <div className="flex items-center gap-2">
                        {/* Store icon visually identifies the business information. */}
                        <Store className="h-4 w-4 text-blue-400" />

                        {/* Shop name displays the vendor's registered store name. */}
                        <p className="text-sm font-medium text-white/75">
                          {vendor.shopName || "No shop name"}
                        </p>
                      </div>
                    </td>

                    {/* Address cell displays the vendor's shop address and falls back to a readable placeholder when unavailable. */}
                    <td className="px-5 py-5 align-top">
                      {/* Address wrapper groups the location icon and address text together. */}
                      <div className="flex max-w-[230px] items-start gap-2">
                        {/* Location icon identifies the following text as the shop location. */}
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/25" />

                        {/* Address text displays the registered shop location. */}
                        <p className="text-xs leading-5 text-white/45">
                          {vendor.shopAddress || "Address not available"}
                        </p>
                      </div>
                    </td>

                    {/* Email cell displays the vendor's registered account email. */}
                    <td className="px-5 py-5 align-top">
                      {/* Email wrapper groups the email icon and address together. */}
                      <div className="flex items-center gap-2">
                        {/* Email icon visually identifies the contact field. */}
                        <Mail className="h-4 w-4 text-white/25" />

                        {/* Vendor email displays the user's registered email address. */}
                        <p className="max-w-[190px] break-all text-xs text-white/50">
                          {vendor.email}
                        </p>
                      </div>
                    </td>

                    {/* GST cell displays the vendor's GST registration number if available. */}
                    <td className="px-5 py-5 align-top">
                      {/* GST information container keeps the GST label and value together. */}
                      <div>
                        {/* Small label explains that the value below is the GST registration number. */}
                        <p className="text-[10px] uppercase tracking-wider text-white/20">
                          GSTIN
                        </p>

                        {/* GST value displays the vendor's registered GST number or a fallback state. */}
                        <p className="mt-1 text-sm font-medium text-white/60">
                          {vendor.gstNumber || "Not provided"}
                        </p>
                      </div>
                    </td>

                    {/* Approval cell displays the current vendor approval state using a visual status badge. */}
                    <td className="px-5 py-5 align-top">
                      {/* Approval badge switches between approved and not-approved visual states based on the isApproved boolean. */}
                      {vendor.isApproved ? (
                        // Approved state communicates that the vendor has been successfully approved.
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-500/[0.07] px-3 py-1.5 text-xs font-medium text-emerald-300">
                          {/* Approved indicator visually reinforces the positive account state. */}
                          <BadgeCheck className="h-3.5 w-3.5" />
                          Approved
                        </span>
                      ) : (
                        // Not-approved state communicates that the vendor has not yet been approved.
                        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/15 bg-amber-500/[0.07] px-3 py-1.5 text-xs font-medium text-amber-300">
                          {/* Pending/not-approved icon visually identifies the vendor as requiring attention or approval. */}
                          <XCircle className="h-3.5 w-3.5" />
                          Not Approved
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile vendor grid is displayed below the desktop breakpoint and converts each vendor record into a vertically stacked card for easier reading on small screens. */}
        <div className="grid gap-4 md:hidden">
          {/* Loop through every vendor and create a mobile-friendly vendor card containing the same core information shown in the desktop table. */}
          {allVendorsData.map((vendor: IUser, index: number) => (
            // Animated mobile vendor card fades upward into the viewport and slightly compresses when pressed.
            <motion.div
              key={String(vendor._id) || index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              whileTap={{ scale: 0.99 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-2xl"
            >
              {/* Mobile card header contains the vendor identity, shop name, and approval badge so the most important information is visible immediately. */}
              <div className="border-b border-white/10 bg-white/[0.02] p-4">
                {/* Vendor header aligns profile information on the left and approval state on the right. */}
                <div className="flex items-start justify-between gap-3">
                  {/* Vendor profile wrapper contains avatar, name, and shop name. */}
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Mobile vendor avatar displays the vendor profile image or fallback user icon. */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                      {vendor.image ? (
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-white/30" />
                      )}
                    </div>

                    {/* Vendor identity text contains the person's name and their registered shop name. */}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {vendor.name}
                      </p>

                      <p className="mt-1 truncate text-xs text-white/35">
                        {vendor.shopName || "No shop name"}
                      </p>
                    </div>
                  </div>

                  {/* Mobile approval badge provides an immediate visual indication of the vendor's current approval state. */}
                  {vendor.isApproved ? (
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-500/[0.07] px-2.5 py-1.5 text-[10px] font-medium text-emerald-300">
                      <BadgeCheck className="h-3 w-3" />
                      Approved
                    </span>
                  ) : (
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-400/15 bg-amber-500/[0.07] px-2.5 py-1.5 text-[10px] font-medium text-amber-300">
                      <XCircle className="h-3 w-3" />
                      Not Approved
                    </span>
                  )}
                </div>
              </div>

              {/* Mobile card body contains address, email, GST, and vendor-account information using vertically stacked detail rows. */}
              <div className="space-y-4 p-4">
                {/* Shop address row displays the physical location registered by the vendor. */}
                <div className="flex items-start gap-3">
                  {/* Address icon identifies the business-location information. */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <MapPin className="h-4 w-4 text-blue-400" />
                  </div>

                  {/* Address content contains a small label and the actual address value. */}
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-white/20">
                      Shop Address
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/45">
                      {vendor.shopAddress || "Address not available"}
                    </p>
                  </div>
                </div>

                {/* Email row displays the vendor's registered contact email address. */}
                <div className="flex items-start gap-3">
                  {/* Email icon identifies the vendor contact information. */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <Mail className="h-4 w-4 text-purple-400" />
                  </div>

                  {/* Email content contains the registered vendor email. */}
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-white/20">
                      Email
                    </p>

                    <p className="mt-1 break-all text-xs text-white/45">
                      {vendor.email}
                    </p>
                  </div>
                </div>

                {/* GST row displays the vendor's GST registration information. */}
                <div className="flex items-start gap-3">
                  {/* GST icon identifies the business-registration information section. */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <Building2 className="h-4 w-4 text-emerald-400" />
                  </div>

                  {/* GST content displays the registered GST number or an unavailable state. */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-white/20">
                      GST Number
                    </p>

                    <p className="mt-1 text-xs font-medium text-white/55">
                      {vendor.gstNumber || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Vendor account row displays the role and current verification status so the administrator can distinguish the account state. */}
                <div className="flex items-start gap-3">
                  {/* Security icon represents the vendor account and verification information. */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <ShieldCheck className="h-4 w-4 text-amber-400" />
                  </div>

                  {/* Verification content displays role and verification status from the vendor IUser object. */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-white/20">
                      Verification
                    </p>

                    <p className="mt-1 text-xs capitalize text-white/50">
                      {vendor.verificationStatus}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty-state container is shown when there are currently no vendors in Redux and prevents the page from appearing blank or broken. */}
        {allVendorsData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.025] px-6 text-center"
          >
            {/* Empty-state icon visually communicates that there are currently no vendor records available. */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035]">
              <Store className="h-6 w-6 text-white/20" />
            </div>

            {/* Empty-state heading communicates that no vendors have been loaded into the current Redux state. */}
            <h2 className="text-base font-semibold text-white/70">
              No vendors found
            </h2>

            {/* Empty-state description tells the administrator what the screen will contain once vendor records are available. */}
            <p className="mt-1 max-w-sm text-sm leading-6 text-white/30">
              Vendor accounts will appear here once they are available.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default VendorDetails;
