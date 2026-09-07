"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  CalendarDays,
  CreditCard,
  Mail,
  MapPin,
  Package,
  Phone,
  Store,
  User,
  WalletCards,
} from "lucide-react";

import { RootState } from "@/redux/store";
import { IOrder } from "@/model/order.model";

function AllOrdersDataPage() {
  const { allOrdersData } = useSelector((state: RootState) => state.user);

  return (
    // Main page container creates the premium dark background, full viewport height, responsive padding, and white text used throughout the order-management screen.
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.04),transparent_22%),radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.06),transparent_26%),linear-gradient(135deg,#010101_0%,#050505_40%,#020202_70%,#090909_100%)] px-3 py-5 text-white sm:px-6 sm:py-7 lg:px-8">
      {/* Main wrapper keeps the orders content centered, limits the maximum width, and provides consistent spacing between the page header and order listing. */}
      <div className="mx-10 max-sm:mx-5 space-y-6">
        {/* Header section introduces the page and explains that the information below contains complete customer order details. */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          {/* Page title area contains the main heading and supporting description for the order list. */}
          <div>
            {/* Small eyebrow label identifies the section as an order-management area. */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/40 backdrop-blur-xl">
              <Package className="h-3.5 w-3.5 text-blue-400" />
              Order Management
            </div>

            {/* Main page heading gives the user a clear title for the current screen. */}
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              All Orders
            </h1>

            {/* Supporting description explains what information is available for each order. */}
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/35">
              View buyer information, purchased products, vendor details,
              payment information, purchase date, and current order status.
            </p>
          </div>

          {/* Order count badge displays the total number of orders currently available in Redux state. */}
          <div className="w-fit rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 shadow-xl shadow-black/20 backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">
              Total Orders
            </p>

            <p className="mt-1 text-2xl font-semibold text-white">
              {allOrdersData.length}
            </p>
          </div>
        </motion.div>

        {/* Desktop orders table is displayed on medium and larger screens and provides a compact overview of all order information in columns. */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="hidden overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-2xl md:block"
        >
          {/* Horizontal table wrapper keeps the table usable if the content becomes wider than the available viewport. */}
          <div className="overflow-x-auto">
            {/* Orders table displays one order per row and separates customer, product, vendor, payment, date, and status information into dedicated columns. */}
            <table className="w-full min-w-[1100px] text-left">
              {/* Table header defines the meaning of every column shown in the desktop order overview. */}
              <thead className="border-b border-white/10 bg-white/[0.025]">
                {/* Header row contains the labels used for each order-information category. */}
                <tr>
                  {/* Order column identifies the order using the last portion of its MongoDB ID. */}
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    Order
                  </th>

                  {/* Buyer column contains the buyer name, email address, and phone number associated with the order. */}
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    Buyer
                  </th>

                  {/* Product column contains every product included in the current order together with its ordered quantity. */}
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    Products
                  </th>

                  {/* Vendor column identifies the seller responsible for the products in the order. */}
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    Vendor
                  </th>

                  {/* Date column displays when the order was created and therefore represents the purchase date. */}
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    Purchase Date
                  </th>

                  {/* Payment column displays the selected payment method and whether the payment has been completed. */}
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    Payment
                  </th>

                  {/* Status column displays the current lifecycle state of the order. */}
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30">
                    Status
                  </th>
                </tr>
              </thead>

              {/* Table body renders every order from Redux state as an individually animated table row. */}
              <tbody className="divide-y divide-white/[0.06]">
                {/* Loop through every stored order so each order can be displayed as its own table row. */}
                {allOrdersData.map((order: IOrder, index: number) => (
                  // Animated desktop row starts slightly transparent and shifted, then smoothly appears in sequence to create a polished order-list animation.
                  <motion.tr
                    key={String(order._id) || index}
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
                    {/* Order ID cell displays a shortened version of the MongoDB ObjectId to keep the table compact and readable. */}
                    <td className="px-5 py-5 align-top">
                      <div className="flex items-center gap-2">
                        {/* Order icon provides a quick visual indicator for the order identifier section. */}
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035]">
                          <Package className="h-4 w-4 text-blue-400" />
                        </div>

                        {/* Order identifier text contains the shortened order ID. */}
                        <div>
                          <p className="text-sm font-semibold text-white">
                            #{String(order._id).slice(-8)}
                          </p>

                          <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/25">
                            Order ID
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Buyer details cell displays the buyer name from the shipping address, email from the buyer document, and phone from the saved address. */}
                    <td className="px-5 py-5 align-top">
                      {/* Buyer information wrapper groups all customer identity details together. */}
                      <div className="min-w-[180px]">
                        {/* Buyer name is taken from order.address because that represents the name used for this specific order. */}
                        <div className="flex items-center gap-2">
                          <User className="h-3.5 w-3.5 text-white/25" />

                          <p className="text-sm font-semibold text-white">
                            {order.address?.name ||
                              order.buyer?.name ||
                              "Unknown Buyer"}
                          </p>
                        </div>

                        {/* Buyer email is taken from the populated buyer User object. */}
                        <div className="mt-2 flex items-center gap-2">
                          <Mail className="h-3 w-3 text-white/20" />

                          <p className="text-xs text-white/40">
                            {order.buyer?.email || "No email"}
                          </p>
                        </div>

                        {/* Buyer phone number is taken from the address saved with the specific order. */}
                        <div className="mt-1 flex items-center gap-2">
                          <Phone className="h-3 w-3 text-white/20" />

                          <p className="text-xs text-white/40">
                            {order.address?.phone || "No phone"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Products cell loops through every product stored inside the current order and displays its title, quantity, and price. */}
                    <td className="px-5 py-5 align-top">
                      {/* Product list keeps multiple purchased products visually separated within the same order row. */}
                      <div className="min-w-[220px] space-y-2">
                        {order.products?.map((item, productIndex) => (
                          // Individual product row displays the purchased product's title, quantity, and saved purchase price.
                          <div
                            key={productIndex}
                            className="rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5"
                          >
                            {/* Product title identifies which item was purchased in this order. */}
                            <p className="line-clamp-1 text-xs font-medium text-white/75">
                              {item.product?.title || "Product unavailable"}
                            </p>

                            {/* Product metadata displays the quantity and price recorded at the time of purchase. */}
                            <div className="mt-1 flex items-center justify-between gap-3">
                              <span className="text-[11px] text-white/30">
                                Qty: {item.quantity}
                              </span>

                              <span className="text-base font-medium text-green-400">
                                ₹{item.price}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Vendor cell identifies the business that supplied the products contained in the order. */}
                    <td className="px-5 py-5 align-top">
                      {/* Vendor information block groups shop name and vendor account name together. */}
                      <div className="min-w-[150px]">
                        {/* Vendor shop icon visually identifies the seller information section. */}
                        <div className="flex items-center gap-2">
                          <Store className="h-3.5 w-3.5 text-blue-400" />

                          <p className="text-sm font-semibold text-white/80">
                            {order.productVendor?.shopName ||
                              order.productVendor?.name ||
                              "Unknown Vendor"}
                          </p>
                        </div>

                        {/* Vendor account name provides an additional fallback/identity reference beneath the shop name. */}
                        <p className="mt-1 text-xs text-white/30">
                          {order.productVendor?.name || "Vendor"}
                        </p>
                      </div>
                    </td>

                    {/* Purchase date cell converts the order creation timestamp into a readable local date and time. */}
                    <td className="px-5 py-5 align-top">
                      {/* Date information wrapper keeps the calendar icon and formatted purchase date together. */}
                      <div className="flex items-start gap-2">
                        {/* Calendar icon visually identifies the purchase-date field. */}
                        <CalendarDays className="mt-0.5 h-4 w-4 text-white/25" />

                        {/* Formatted date displays exactly when the order was created. */}
                        <div>
                          <p className="text-sm text-white/70">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleDateString()
                              : "Date unavailable"}
                          </p>

                          {/* Formatted time provides the exact purchase time beneath the date. */}
                          <p className="mt-1 text-[11px] text-white/25">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )
                              : ""}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Payment cell shows whether the order was paid using Stripe or COD and whether payment is currently complete. */}
                    <td className="px-5 py-5 align-top">
                      {/* Payment information wrapper groups method and payment state together. */}
                      <div className="min-w-[110px]">
                        {/* Payment method uses a human-readable label instead of the raw database value. */}
                        <div className="flex items-center gap-2">
                          {order.paymentMethod === "stripe" ? (
                            <CreditCard className="h-4 w-4 text-purple-400" />
                          ) : (
                            <WalletCards className="h-4 w-4 text-amber-400" />
                          )}

                          <p className="text-sm font-medium capitalize text-white/75">
                            {order.paymentMethod === "stripe"
                              ? "Stripe"
                              : "Cash on Delivery"}
                          </p>
                        </div>

                        {/* Payment status indicates whether the order has already been marked as paid. */}
                        <p
                          className={`mt-1 text-[11px] font-medium ${
                            order.isPaid ? "text-emerald-300" : "text-amber-300"
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Payment Pending"}
                        </p>
                      </div>
                    </td>

                    {/* Status cell displays the order's current state with a color-coded badge for quick visual recognition. */}
                    <td className="px-5 py-5 align-top">
                      {/* Status badge visually communicates the current order lifecycle state using different styling for different statuses. */}
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium capitalize ${
                          order.orderStatus === "delivered"
                            ? "border-emerald-400/15 bg-emerald-500/[0.07] text-emerald-300"
                            : order.orderStatus === "cancelled"
                              ? "border-red-400/15 bg-red-500/[0.07] text-red-300"
                              : order.orderStatus === "returned"
                                ? "border-amber-400/15 bg-amber-500/[0.07] text-amber-300"
                                : order.orderStatus === "shipped"
                                  ? "border-blue-400/15 bg-blue-500/[0.07] text-blue-300"
                                  : "border-white/10 bg-white/[0.04] text-white/55"
                        }`}
                      >
                        {/* Small status indicator dot provides a quick visual cue next to the order state. */}
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            order.orderStatus === "delivered"
                              ? "bg-emerald-400"
                              : order.orderStatus === "cancelled"
                                ? "bg-red-400"
                                : order.orderStatus === "returned"
                                  ? "bg-amber-400"
                                  : order.orderStatus === "shipped"
                                    ? "bg-blue-400"
                                    : "bg-white/30"
                          }`}
                        />

                        {order.orderStatus}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile order grid is displayed below the desktop breakpoint and converts every order into a readable stacked card for narrow screens. */}
        <div className="grid gap-4 md:hidden">
          {/* Loop through every order and render it as a mobile-friendly card containing the same order information as the desktop table. */}
          {allOrdersData.map((order: IOrder, index: number) => (
            // Animated mobile card introduces each order with a subtle upward motion and fade effect while keeping the content easy to scan on small screens.
            <motion.div
              key={String(order._id) || index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              whileTap={{ scale: 0.99 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-2xl"
            >
              {/* Mobile card header displays the shortened order ID, purchase date, and status together for quick identification. */}
              <div className="border-b border-white/10 bg-white/[0.02] px-4 py-4">
                {/* Card header information aligns the order identifier and current status on opposite sides. */}
                <div className="flex items-start justify-between gap-3">
                  {/* Order identity block shows the order ID and purchase date. */}
                  <div>
                    {/* Order number identifies the current order using the final characters of its MongoDB ID. */}
                    <p className="text-sm font-semibold text-white">
                      #{String(order._id).slice(-8)}
                    </p>

                    {/* Purchase date provides the date when this specific order was created. */}
                    <p className="mt-1 flex items-center gap-1.5 text-[11px] text-white/30">
                      <CalendarDays className="h-3 w-3" />

                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "Date unavailable"}
                    </p>
                  </div>

                  {/* Mobile status badge displays the current order state using the same color system as the desktop version. */}
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium capitalize ${
                      order.orderStatus === "delivered"
                        ? "border-emerald-400/15 bg-emerald-500/[0.07] text-emerald-300"
                        : order.orderStatus === "cancelled"
                          ? "border-red-400/15 bg-red-500/[0.07] text-red-300"
                          : order.orderStatus === "returned"
                            ? "border-amber-400/15 bg-amber-500/[0.07] text-amber-300"
                            : order.orderStatus === "shipped"
                              ? "border-blue-400/15 bg-blue-500/[0.07] text-blue-300"
                              : "border-white/10 bg-white/[0.04] text-white/55"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* Mobile card body contains buyer, vendor, products, and payment information arranged in vertically stacked sections. */}
              <div className="space-y-5 p-4">
                {/* Buyer information section displays the customer's name, email address, and phone number for the current order. */}
                <div>
                  {/* Section label identifies the following information as buyer details. */}
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
                    Buyer Details
                  </p>

                  {/* Buyer information card groups the customer identity fields into a single compact block. */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-3.5">
                    {/* Buyer name row displays the shipping/customer name stored with the order. */}
                    <div className="flex items-center gap-2.5">
                      <User className="h-4 w-4 text-white/25" />

                      <p className="text-sm font-medium text-white/80">
                        {order.address?.name ||
                          order.buyer?.name ||
                          "Unknown Buyer"}
                      </p>
                    </div>

                    {/* Buyer email row displays the customer's email from the populated buyer object. */}
                    <div className="mt-2.5 flex items-center gap-2.5">
                      <Mail className="h-3.5 w-3.5 text-white/20" />

                      <p className="break-all text-xs text-white/40">
                        {order.buyer?.email || "No email"}
                      </p>
                    </div>

                    {/* Buyer phone row displays the phone number saved specifically for this order. */}
                    <div className="mt-2 flex items-center gap-2.5">
                      <Phone className="h-3.5 w-3.5 text-white/20" />

                      <p className="text-xs text-white/40">
                        {order.address?.phone || "No phone"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vendor information section identifies which vendor supplied the products in the current order. */}
                <div>
                  {/* Section label identifies the next information block as vendor details. */}
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
                    Vendor Details
                  </p>

                  {/* Vendor card displays the shop name and vendor account name in a compact premium container. */}
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3.5">
                    {/* Vendor icon visually identifies the seller information. */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/[0.06]">
                      <Store className="h-4 w-4 text-blue-400" />
                    </div>

                    {/* Vendor names are displayed side by side with the corresponding shop/account information. */}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white/80">
                        {order.productVendor?.shopName ||
                          order.productVendor?.name ||
                          "Unknown Vendor"}
                      </p>

                      <p className="mt-1 truncate text-xs text-white/30">
                        {order.productVendor?.name || "Vendor"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Products information section lists every product contained in the current order with quantity and saved purchase price. */}
                <div>
                  {/* Section label identifies the following cards as the purchased products. */}
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
                    Purchased Products
                  </p>

                  {/* Product list contains one compact product card for every product stored inside this order. */}
                  <div className="space-y-2">
                    {order.products?.map((item, productIndex) => (
                      // Individual mobile product card keeps product title, quantity, and price easy to read without requiring horizontal scrolling.
                      <div
                        key={productIndex}
                        className="rounded-2xl border border-white/10 bg-white/[0.025] p-3.5"
                      >
                        {/* Product title identifies the purchased product. */}
                        <p className="text-sm font-medium text-white/75">
                          {item.product?.title || "Product unavailable"}
                        </p>

                        {/* Product metadata shows quantity and price on opposite sides of the row. */}
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-white/30">
                            Quantity: {item.quantity}
                          </span>

                          <span className="text-sm font-semibold text-white/70">
                            ₹{item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Purchase and payment section groups the order creation date, payment method, and current payment state into one final information block. */}
                <div>
                  {/* Section label identifies the next information as purchase/payment information. */}
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
                    Purchase & Payment
                  </p>

                  {/* Payment information card uses a two-column grid so date and payment method remain compact on small screens. */}
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {/* Purchase date card displays the date and time of the order creation event. */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-3.5">
                      {/* Calendar icon identifies the date field. */}
                      <CalendarDays className="mb-2 h-4 w-4 text-white/25" />

                      <p className="text-[10px] uppercase tracking-wider text-white/25">
                        Purchased
                      </p>

                      <p className="mt-1 text-sm text-white/70">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "Unavailable"}
                      </p>
                    </div>

                    {/* Payment card displays the selected payment method and current payment status. */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-3.5">
                      {/* Payment icon changes based on whether Stripe or Cash on Delivery was selected. */}
                      {order.paymentMethod === "stripe" ? (
                        <CreditCard className="mb-2 h-4 w-4 text-purple-400" />
                      ) : (
                        <WalletCards className="mb-2 h-4 w-4 text-amber-400" />
                      )}

                      <p className="text-[10px] uppercase tracking-wider text-white/25">
                        Payment
                      </p>

                      <p className="mt-1 text-sm font-medium capitalize text-white/70">
                        {order.paymentMethod === "stripe"
                          ? "Stripe"
                          : "Cash on Delivery"}
                      </p>

                      {/* Payment state communicates whether the order has actually been paid. */}
                      <p
                        className={`mt-1 text-[11px] ${
                          order.isPaid ? "text-emerald-300" : "text-amber-300"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Payment Pending"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Delivery address section displays the address associated with the specific order for convenient customer/order identification. */}
                <div>
                  {/* Section label identifies the following information as the delivery location. */}
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
                    Delivery Address
                  </p>

                  {/* Address card displays the full saved delivery address and location details. */}
                  <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3.5">
                    {/* Location icon visually identifies the delivery address field. */}
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/25" />

                    {/* Address text combines street address, city, and pincode into one readable block. */}
                    <p className="text-xs leading-5 text-white/40">
                      {order.address?.address || "Address unavailable"}
                      {order.address?.city ? `, ${order.address.city}` : ""}
                      {order.address?.pincode
                        ? ` - ${order.address.pincode}`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty-state container is shown when Redux does not currently contain any orders, preventing the page from looking broken or blank. */}
        {allOrdersData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.025] px-6 text-center"
          >
            {/* Empty-state icon visually communicates that there are currently no order records available. */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035]">
              <Package className="h-6 w-6 text-white/20" />
            </div>

            {/* Empty-state heading clearly tells the user that no orders have been found. */}
            <h2 className="text-base font-semibold text-white/70">
              No orders found
            </h2>

            {/* Empty-state description explains that order records will appear once available. */}
            <p className="mt-1 max-w-sm text-sm leading-6 text-white/30">
              Orders will appear here once they are available in your account.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AllOrdersDataPage;
