"use client";

import useGetAllOrders from "@/hooks/useGetAllOrders";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { IOrder } from "@/model/order.model";
import { IProduct } from "@/model/product.model";
import { AppDispatch, RootState } from "@/redux/store";
import { setAllOrdersData } from "@/redux/userSlice";
import axios from "axios";
import { motion } from "framer-motion";
import { IndianRupee } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page() {
  useGetAllOrders();
  useGetCurrentUser();

  const { userData } = useSelector((state: RootState) => state.user);
  const { allOrdersData } = useSelector((state: RootState) => state.user);

  const [selectOrder, setSelectOrder] = useState<IOrder | null>(null);
  const [trackOrder, setTrackOrder] = useState<IOrder | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const orders = allOrdersData.filter(
    (o) => String(o.buyer?._id) === String(userData?._id),
  );

  const formatDate = (date: Date) => {
    if (!date) return;
    // showing the time in dd/mm//yy format
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isCancelDisable = (order: IOrder) => {
    return order.isPaid === true && order.paymentMethod === "stripe";
  };

  const status = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
    "returned",
  ];

  // track order API

  const renderTrackStep = (currentStatus: string) => {
    // status coming from trackOrder state(called inside track-Order button) & it  saved inside params as currentStatus
    const currentIndex = status.indexOf(currentStatus);

    return (
      <div className="relative pl-2 sm:pl-4">
        {/* Vertical line (base, dim) */}
        <div className="absolute bottom-5 left-[19px] top-5 w-px bg-white/[0.06] sm:left-[27px]"></div>
        {/* Vertical line (progress, glowing up to current step) */}
        <div
          className="absolute left-[19px] top-5 w-px bg-gradient-to-b from-blue-400 via-blue-500/70 to-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-700 sm:left-[27px]"
          style={{
            height:
              currentIndex <= 0
                ? "0px"
                : `${(currentIndex / (status.length - 1)) * 100}%`,
          }}
        ></div>
        {status.map((stat, i) => {
          const active = currentStatus === stat;
          const completed = currentIndex > -1 && i < currentIndex;
          return (
            <div key={i} className="relative mb-5 flex items-center last:mb-0">
              {/* Dot */}
              <div
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                  active
                    ? "border-blue-400/60 bg-gradient-to-br from-blue-500/25 to-blue-600/10 text-blue-200 shadow-[0_0_25px_rgba(59,130,246,0.4)]"
                    : completed
                      ? "border-blue-400/30 bg-blue-500/10 text-blue-300/80"
                      : "border-white/10 bg-white/[0.04] text-white/30 shadow-inner"
                }`}
              >
                {/* Active glow behind the number */}
                {active && (
                  <div className="absolute inset-1 rounded-full bg-blue-500/10 blur-md"></div>
                )}
                {/* Step number, or a checkmark once the step is completed */}
                {completed ? (
                  <svg
                    className="relative h-4 w-4 text-blue-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="relative text-xs font-bold">{i + 1}</span>
                )}
              </div>
              {/* Label */}
              <div className="ml-4 flex-1">
                {/* Status name */}
                <div
                  className={`text-sm font-semibold capitalize transition-all duration-300 ${
                    active
                      ? "text-blue-300"
                      : completed
                        ? "text-white/60"
                        : "text-white/45"
                  }`}
                >
                  {stat}
                </div>
                {/* Active status description */}
                {active && (
                  <div className="mt-1 text-xs text-white/35">
                    Current order status
                  </div>
                )}
              </div>
              {/* Active status indicator */}
              {active && (
                <div className="mr-1 hidden items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]"></span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-300">
                    Current
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  /// cancel order api
  const handleCancel = async (orderId: string) => {
    try {
      // Call the API to cancel the selected order using its orderId.
      const result = await axios.post("/api/order/cancel-order", {
        orderId,
      });

      // Loop through all orders, find the matching order by ID, and create a new copy with its status changed to "cancelled".
      const updateOrder = allOrdersData.map((o: IOrder) =>
        o._id?.toString() === orderId.toString()
          ? { ...o, orderStatus: "cancelled" }
          : o,
      );

      alert("order cancelled");

      // Update Redux with the newly modified orders array.
      dispatch(setAllOrdersData(updateOrder));

      setSelectOrder(null);
    } catch (error) {
      console.log(error);
    }
  };

  // return product API
  const handleOrderreturned = async (orderId: string, productId: string) => {
    try {
      // Call the return-product API and send the order ID and product ID to the backend.
      const result = await axios.post("/api/order/return-product", {
        orderId,
        productId,
      });

      // Get the updated order returned by the API after the product was returned.
      const updatedOrder = result.data.order;
      console.log(result.data);

      // Loop through all Redux orders and replace the old order with the updated order.
      const updateOrder = allOrdersData.map((o: IOrder) =>
        o._id?.toString() === orderId.toString() ? updatedOrder : o,
      );

      // Update Redux so the UI immediately gets the new order information.
      dispatch(setAllOrdersData(updateOrder));

      // Update the currently selected order shown inside the modal.
      setSelectOrder(updatedOrder);

      // Show a simple success message to the user.
      alert("Product returned successfully");
    } catch (error) {
      // Show the backend error message if the API sends one.
      alert(
        error?.response?.data?.message ||
          "Something went wrong while returning the product",
      );

      // Print the actual error in the browser console for debugging.
      console.log("Return Product Error:", error);
    }
  };

  return (
    // Main page container that covers the screen and adds the overall background/padding.
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/40 to-black px-4 py-8 text-white sm:px-6 lg:px-8">
      {/* Main content wrapper keeps the orders page centered and prevents it from becoming too wide. */}
      <div className="mx-auto max-w-7xl">
        {/* Header section displays the page title, description, and total number of orders. */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Left side contains the title and short description of the orders page. */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              My Orders
            </h1>

            <p className="mt-1 text-sm text-white/60 sm:text-base">
              All orders placed by you
            </p>
          </div>

          {/* Right side shows how many orders the current user has placed. */}
          <div className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 shadow-lg backdrop-blur-md">
            {orders.length} Orders
          </div>
        </motion.div>

        {/* Large device section — this table is visible only on lg and larger screens. */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur-md lg:block"
        >
          {/* Horizontal scrolling allows the table to remain usable when the content becomes wide. */}
          <div className="overflow-x-auto">
            {/* Orders table displays all important order information in separate columns. */}
            <table className="w-full min-w-[1000px]">
              {/* Table heading contains the names of each order column. */}
              <thead className="border-b border-white/10 bg-white/5">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-white/80">
                    Order ID
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-white/80">
                    Date
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-white/80">
                    Products
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-white/80">
                    Vendor
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-white/80">
                    Payments
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-white/80">
                    Status
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-white/80">
                    Total
                  </th>

                  <th className="px-4 py-4 text-left text-sm font-semibold text-white/80">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table body contains one row for every order belonging to the current user. */}
              <tbody>
                {orders.length !== 0 ? (
                  orders.map((order, index) => (
                    // Each motion row represents one complete order and animates into view with a small delay.
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                      }}
                      className="border-b border-white/10 transition-colors duration-300 hover:bg-white/5"
                    >
                      {/* Displays the unique MongoDB order ID. */}
                      <td className="px-4 py-5 text-sm font-medium text-white">
                        #{String(order._id)}
                      </td>

                      {/* Displays the formatted order creation date and time. */}
                      <td className="px-4 py-5 text-sm text-white/70">
                        {formatDate(order.createdAt)}
                      </td>

                      {/* Displays all products contained inside this order. */}
                      <td className="px-4 py-5">
                        {/*
                          `order.products` is an array of product objects, so `.map()` loops
                          through each product and creates a separate JSX element for every item.
                        */}
                        <div className="space-y-1">
                          {order.products.map((p, i) => (
                            // Each div represents one individual product from the order.
                            <div
                              key={i}
                              className="text-sm font-medium text-white/90"
                            >
                              {p.product.title} × {p.quantity}
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Displays the shop/vendor name associated with the order. */}
                      <td className="px-4 py-5 text-sm text-white/80">
                        {order.productVendor.shopName}
                      </td>

                      {/* Displays the payment method and whether the payment has been completed. */}
                      <td className="px-4 py-5">
                        <div className="text-sm font-medium text-white/90">
                          {order.paymentMethod.toLocaleUpperCase()}
                        </div>

                        <div
                          className={`mt-1 text-xs font-medium ${
                            order.isPaid ? "text-emerald-400" : "text-amber-400"
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Pending"}
                        </div>
                      </td>

                      {/* Displays the current status of the order. */}
                      <td className="px-4 py-5">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium capitalize text-white/80">
                          {order.orderStatus}
                        </span>
                      </td>

                      {/* Displays the complete order amount with the Indian Rupee icon. */}
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-1 text-sm font-semibold text-white">
                          <IndianRupee size={15} />
                          {order.totalAmount}
                        </div>
                      </td>

                      {/* Contains buttons for future order-detail and tracking functionality. */}
                      <td className="px-4 py-5">
                        {/* Action buttons allow the user to inspect or track the current order. */}
                        <div className="flex flex-col gap-2">
                          <button
                            disabled={order.orderStatus === "cancelled"}
                            onClick={() => setSelectOrder(order)}
                            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-white/20"
                          >
                            Check Details
                          </button>

                          <button
                            disabled={
                              order.orderStatus === "delivered" ||
                              order.orderStatus === "cancelled"
                            }
                            onClick={() => setTrackOrder(order)}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white"
                          >
                            Track Order
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  // Empty-state row shown when the current user has not placed any orders.
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-14 text-center text-white/50"
                    >
                      No orders to show
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Small and medium device section — replaces the table with responsive order cards. */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {orders.length !== 0 ? (
            orders.map((order, index) => (
              // Each mobile card represents one complete order in a compact responsive layout.
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/20 backdrop-blur-md"
              >
                {/* Top section displays the order ID and current status. */}
                <div className="flex items-start justify-between gap-4">
                  {/* Displays the order ID and order creation date. */}
                  <div>
                    <p className="text-sm font-semibold text-white">
                      #{String(order._id)}
                    </p>

                    <p className="mt-1 text-xs text-white/50">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  {/* Displays the current order status. */}
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium capitalize text-white/80">
                    {order.orderStatus}
                  </span>
                </div>

                {/* Divider separates the order header from the order details. */}
                <div className="my-4 h-px bg-white/10" />

                {/* Product section displays every product included in this order. */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                    Products
                  </p>

                  {/*
                    `order.products` is an array, so `.map()` is used to loop through
                    each product and render its title and quantity inside the order card.
                  */}
                  <div className="space-y-2">
                    {order.products.map((p, i) => (
                      // Each div represents one product from the current order.
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2 text-sm"
                      >
                        <span className="text-white/90">{p.product.title}</span>

                        <span className="font-medium text-white/60">
                          × {p.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vendor section displays the shop that is fulfilling the order. */}
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Vendor
                  </p>

                  <p className="mt-1 text-sm text-white/80">
                    {order.productVendor.shopName}
                  </p>
                </div>

                {/* Payment section displays payment method and payment completion status. */}
                <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 p-3">
                  {/* Displays the selected payment method. */}
                  <div>
                    <p className="text-xs text-white/40">Payment</p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      {order.paymentMethod.toLocaleUpperCase()}
                    </p>
                  </div>

                  {/* Displays whether the payment has been completed. */}
                  <span
                    className={`text-sm font-medium ${
                      order.isPaid ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </div>

                {/* Bottom section displays total amount and available actions. */}
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {/* Displays the final order total. */}
                  <div>
                    <p className="text-xs text-white/40">Total Amount</p>

                    <div className="mt-1 flex items-center gap-1 text-lg font-bold text-white ">
                      <IndianRupee size={18} />
                      {order.totalAmount}
                    </div>
                  </div>

                  {/* Action buttons provide access to order details and tracking. */}
                  <div className="flex gap-2">
                    <button
                      disabled={order.orderStatus === "cancelled"}
                      onClick={() => setSelectOrder(order)}
                      className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-white/20"
                    >
                      Check Details
                    </button>

                    <button
                      disabled={order.orderStatus === "delivered"}
                      onClick={() => setTrackOrder(order)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // Empty-state card shown when there are no orders on small and medium screens.
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-14 text-center shadow-xl backdrop-blur-md"
            >
              {/* Simple message informing the user that there are currently no orders. */}
              <h1 className="text-lg font-semibold text-white">
                No Orders To Show
              </h1>

              <p className="mt-2 text-sm text-white/40">
                Your placed orders will appear here.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* selectOrder popUp section  */}
      {selectOrder && (
        // Full-screen overlay that appears when an order is selected.
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
        >
          {/* Main modal container that holds all selected order information. */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-zinc-900 to-black p-5 text-white shadow-2xl shadow-black/60 sm:p-6"
          >
            {/* Header section displays the order ID and order creation date. */}
            <div className="flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              {/* Order title displays which order the user is currently viewing. */}
              <div>
                <h2 className="text-lg font-semibold sm:text-xl">
                  Order Details -- #{String(selectOrder._id)}
                </h2>

                {/* Displays when the order was created. */}
                <p className="mt-1 text-sm text-white/50">
                  {formatDate(selectOrder.createdAt)}
                </p>
              </div>

              {/* Displays the current order status. */}
              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium capitalize text-white/70">
                {selectOrder.orderStatus}
              </span>
            </div>

            {/* Invoice section displays the individual charges that make up the order total. */}
            <div className="mt-6">
              {/* Invoice heading identifies the following section as the order invoice. */}
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
                Invoice
              </h3>

              {/* Invoice rows are grouped together with spacing and a subtle background. */}
              <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                {/* Product total row displays the combined price of all ordered products. */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">Products Amount</span>

                  <span className="font-medium text-white">
                    ₹{selectOrder.productsTotal}
                  </span>
                </div>

                {/* Delivery charge row displays the amount charged for delivery. */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">Delivery Charge</span>

                  <span className="font-medium text-white">
                    ₹{selectOrder.deliveryCharge}
                  </span>
                </div>

                {/* Service charge row displays the service fee applied to the order. */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/60">Service Charge</span>

                  <span className="font-medium text-white">
                    ₹{selectOrder.serviceCharge}
                  </span>
                </div>
              </div>
            </div>

            {/* Final total section highlights the complete amount the customer paid or needs to pay. */}
            <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-4">
              {/* Total amount label explains what the highlighted value represents. */}
              <span className="text-sm font-semibold text-white/70">
                Total Amount
              </span>

              {/* Final order total is highlighted in green. */}
              <span className="text-lg font-bold text-emerald-400">
                ₹{selectOrder.totalAmount}
              </span>
            </div>

            {/* // Show the delivery date only when the selected order has been successfully delivered. */}
            {selectOrder.orderStatus === "delivered" &&
              selectOrder.deliveryDate && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 px-4 py-2.5 text-sm shadow-[0_0_20px_rgba(16,185,129,0.06)] backdrop-blur-sm">
                  <span className="font-medium text-slate-400">
                    Delivered On
                  </span>

                  <span className="font-semibold tracking-wide text-emerald-300">
                    {new Date(selectOrder.deliveryDate).toLocaleString(
                      "en-IN",
                      // if wanna show details timing
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      },
                    )}
                  </span>
                </div>
              )}

            {/* This warning is shown only when the order was already paid through Stripe. */}
            {selectOrder.isPaid === true &&
              selectOrder.paymentMethod === "stripe" && (
                // Important payment note explaining the cancellation and return rules.
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-xs leading-5 text-yellow-200"
                >
                  {/* Warning heading tells the user this section contains an important payment note. */}
                  <p className="mb-2 font-semibold text-yellow-300">
                    Important Note
                  </p>

                  {/* List contains the refund and cancellation restrictions for Stripe orders. */}
                  <ul className="list-disc space-y-1.5 pl-5">
                    {/* Explains that Stripe-paid orders cannot be cancelled directly. */}
                    <li>
                      Order cancellation feature is{" "}
                      <b>
                        not available if payment is done using Online Payment
                        (Stripe)
                      </b>
                      .
                    </li>

                    {/* Explains that the customer can request a return after delivery. */}
                    <li>
                      You can only <b>return the product</b> after delivery.
                    </li>

                    {/* Explains which amount is refunded when a product is returned. */}
                    <li>
                      On return, you will receive only the <b>product amount</b>
                      .
                    </li>

                    {/* Explains that delivery and service charges are not refunded. */}
                    <li>
                      <b>Delivery & service charges are non-refundable.</b>
                    </li>
                  </ul>
                </motion.div>
              )}

            {/* Bottom action section contains controls for closing, tracking, and cancelling the order. */}
            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
              {/* Close button removes the selected order and closes the modal. */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectOrder(null)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                Close
              </motion.button>

              {/* Track button will later be used to open the order tracking interface. */}
              <motion.button
                disabled={selectOrder.orderStatus === "delivered"}
                onClick={() => setTrackOrder(selectOrder)}
                whileHover={{
                  scale: selectOrder.orderStatus === "delivered" ? 1 : 1.02,
                }}
                whileTap={{
                  scale: selectOrder.orderStatus === "delivered" ? 1 : 0.97,
                }}
                className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-2.5 text-sm font-medium text-blue-300 transition-all duration-300 hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-blue-500/10"
              >
                Track Order
              </motion.button>

              {/* Cancel button is disabled for already-paid Stripe orders. */}
              {selectOrder.orderStatus !== "delivered" ? (
                <motion.button
                  // Cancelling the order
                  onClick={() => handleCancel(String(selectOrder._id))}
                  whileHover={
                    !isCancelDisable(selectOrder) ? { scale: 1.02 } : undefined
                  }
                  whileTap={
                    !isCancelDisable(selectOrder) ? { scale: 0.97 } : undefined
                  }
                  disabled={
                    selectOrder.orderStatus === "cancelled" ||
                    isCancelDisable(selectOrder)
                  }
                  className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-300 transition-all duration-300 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-red-500/10"
                >
                  Cancel Order
                </motion.button>
              ) : (
                <>
                  {/* ============================== product return section ========================          */}
                  {/* if product delivered then shows the returned button option */}
                  {/* inside product model object where data stored each product return date */}

                  {selectOrder.products.map((p, i) => {
                    // p = the current item/product being processed by .map(); i = its array index (0, 1, 2, ...)

                    // p.product = the actual product document/details stored inside this order item
                    // Example: p.product could contain name, price, image, replacementDays, etc.
                    // replacementDays = number of days after delivery during which this product can be returned
                    // Example: replacementDays = 7 means the product has a 7-day return/replacement period
                    // || 0 = if replacementDays is missing, undefined, null, or otherwise falsy, use 0 days
                    const replacementDays = p.product.replacementDays || 0;

                    // selectOrder.deliveryDate = the date when the complete order was delivered
                    // Example: "2026-08-20T10:30:00.000Z"
                    // ? = check whether selectOrder.deliveryDate actually exists
                    // new Date(...) = convert the stored date value/string into a JavaScript Date object
                    // : null = if there is no delivery date, store null instead of trying to create a Date
                    const deliveredDate = selectOrder.deliveryDate
                      ? new Date(selectOrder.deliveryDate)
                      : null;

                    // returnDate = the final/last date on which this product can be returned
                    // We don't know this date yet, so initially we store null ("no return date calculated yet")
                    let returnDate = null;

                    // Only calculate the return deadline if the order has a delivery date
                    // Without a delivery date, we don't know when the return period should start
                    if (deliveredDate) {
                      // Create a copy of deliveredDate so we can modify the copy without changing the original delivery date
                      // Example: deliveredDate = Aug 20 → returnDate initially becomes another separate Aug 20 Date object
                      returnDate = new Date(deliveredDate);

                      // Calculate the final return date by adding replacementDays to the delivery date
                      // getDate() = gets only the day number from the Date (example: Aug 20 → 20)
                      // + replacementDays = adds the allowed return period (example: 20 + 7 = 27)
                      // setDate(...) = updates returnDate with the new day
                      // Example: Delivery = Aug 20 + 7 return days → Return deadline = Aug 27
                      returnDate.setDate(
                        returnDate.getDate() + replacementDays,
                      );
                    }

                    // Create a Date object containing the current date and current time
                    // Example: if today is Aug 25 at 3:30 PM, today represents Aug 25 at 3:30 PM
                    const today = new Date();

                    // Start by assuming the product cannot be returned
                    // false = NO, return is currently not allowed
                    // We will change it to true only when every return condition passes
                    let canReturn = false;

                    // Check all rules that must be true before allowing the Return Product button
                    // The if block changes canReturn from false → true only when ALL conditions below are satisfied
                    if (
                      // deliveredDate must exist, meaning the order was successfully delivered
                      // Example: Date object ✅ | null ❌
                      deliveredDate &&
                      // returnDate must exist, meaning we successfully calculated the last return date
                      // Example: Aug 27 ✅ | null ❌
                      returnDate &&
                      // replacementDays must be greater than 0, meaning the product actually has a return period
                      // Example: 7 > 0 ✅ | 0 > 0 ❌
                      replacementDays > 0 &&
                      // today must be before OR exactly equal to returnDate
                      // Example: Today Aug 25, Return Date Aug 27 → 25 <= 27 ✅
                      // Example: Today Aug 27, Return Date Aug 27 → 27 <= 27 ✅
                      // Example: Today Aug 28, Return Date Aug 27 → 28 <= 27 ❌
                      // <= means "less than or equal to"
                      today <= returnDate
                    ) {
                      // Every condition above passed, so this product is still inside its return period
                      // true = YES, this product can currently be returned
                      canReturn = true;
                    }

                    // Return the JSX UI for this particular product
                    // key={i} gives React a unique key for each product being created by .map()
                    return (
                      <div key={i}>
                        {canReturn ? (
                          // Return period is still active, so show the Return Product button
                          <motion.button
                            // When the user clicks the button, call handleOrderreturned()
                            // String(selectOrder._id) = sends the current order ID
                            // String(p.product._id) = sends the current product ID
                            // The API uses both IDs to know which product from which order is being returned
                            onClick={() =>
                              handleOrderreturned(
                                String(selectOrder._id),
                                String(p.product._id),
                              )
                            }
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="rounded-lg border border-orange-500/20 bg-orange-500/10 px-4 py-2.5 text-sm font-medium text-orange-300 transition-all duration-300 hover:bg-orange-500/20"
                          >
                            Return Product
                          </motion.button>
                        ) : (
                          // Return period is no longer active, so don't show a working return button
                          // Instead show a disabled-looking message telling the customer the return window is over
                          <span className="cursor-not-allowed rounded-lg border border-gray-500/20 bg-gray-500/10 px-4 py-2.5 text-sm font-medium text-gray-400">
                            Return Period Expired
                          </span>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {trackOrder && (
        // Full-screen tracking modal overlay that covers the current page.
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
        >
          {/* Main tracking modal that contains the buyer and delivery information. */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-zinc-900 to-black p-5 text-white shadow-2xl shadow-black/60 sm:p-6"
          >
            {/* Header section displays the tracking title and a short description. */}
            <div className="border-b border-white/10 pb-5">
              {/* Tracking modal title tells the user what information is being displayed. */}
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Track Order
              </h2>

              {/* Short text explains that the following information is related to delivery. */}
              <p className="mt-1 text-sm text-white/50">
                Delivery and order information
              </p>
            </div>

            {/* Buyer details section displays the customer's delivery information. */}
            <div className="mt-6 space-y-3">
              {/* Section heading identifies the following rows as delivery details. */}
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                Delivery Details
              </h3>

              {/* Buyer's name row displays the name provided during checkout. */}
              <div className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 p-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-white/50">Buyer's Name</span>

                <span className="text-sm font-medium text-white">
                  {trackOrder.address.name}
                </span>
              </div>

              {/* Address row displays the buyer's complete delivery address. */}
              <div className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 p-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-white/50">Delivery Address</span>

                <span className="max-w-md text-sm font-medium text-white sm:text-right">
                  {trackOrder.address.address}
                </span>
              </div>

              {/* City row displays the city where the order will be delivered. */}
              <div className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 p-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-white/50">City & State</span>

                <span className="text-sm font-medium text-white">
                  {trackOrder.address.city}
                </span>
              </div>

              {/* Contact row displays the phone number used for delivery communication. */}
              <div className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 p-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-white/50">Contact Details</span>

                <span className="text-sm font-medium text-white">
                  {trackOrder.address.phone}
                </span>
              </div>

              {/* Pincode row displays the postal code used for delivery. */}
              <div className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 p-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-white/50">Pincode</span>

                <span className="text-sm font-medium text-white">
                  {trackOrder.address.pincode}
                </span>
              </div>
            </div>

            {/* Tracking status section renders the current progress of the order. */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              {/* Section heading tells the user that the following component shows order progress. */}
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                Order Status
              </h3>

              {/* putting the current order status inside renderTrack-step function params value */}
              {renderTrackStep(trackOrder.orderStatus)}
            </motion.div>

            {/* Footer section contains the button used to close the tracking modal. */}
            <div className="mt-6 flex justify-end border-t border-white/10 pt-5">
              {/* Close button clears the selected tracking order and closes the modal. */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setTrackOrder(null)}
                className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Page;
