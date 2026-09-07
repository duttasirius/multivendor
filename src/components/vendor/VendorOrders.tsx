"use client";

import useGetAllOrders from "@/hooks/useGetAllOrders";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { IOrder } from "@/model/order.model";
import { AppDispatch, RootState } from "@/redux/store";
import { setAllOrdersData } from "@/redux/userSlice";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function VendorOrders() {
  // Get Redux dispatch function
  const dispatch = useDispatch<AppDispatch>();

  // Get the currently logged-in user
  useGetCurrentUser();

  // Get all orders from the backend
  useGetAllOrders();

  // Read current user data from Redux
  const { userData } = useSelector((state: RootState) => state.user);

  // Read all orders from Redux
  const { allOrdersData } = useSelector((state: RootState) => state.user);

  // Keep only the orders where the current user is the vendor
  const orders = allOrdersData.filter(
    (order) => String(order.productVendor?._id) === String(userData?._id),
  );

  // These are the statuses the vendor can choose
  const statusOptions = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "returned",
    "cancelled",
  ];
  const [otpModel, setOtpModel] = useState<IOrder | null>(null);
  const [otp, setOtp] = useState("");

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const result = await axios.post("/api/order/update-status", {
        orderId,
        status,
      });
      dispatch(
        setAllOrdersData(
          // Loop through all orders, find the matching order by ID, and return a new copy with its status updated
          allOrdersData.map((o: IOrder) =>
            o._id?.toString() === orderId.toString()
              ? { ...o, orderStatus: status }
              : o,
          ),
        ),
      );

      alert("Order status updated");
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await axios.post("/api/order/verify-delivery-otp", {
        otp: otp,
        orderId: otpModel?._id,
      });

      dispatch(
        setAllOrdersData(
          // Loop through all orders, find the matching order by ID, and return a new copy with its status updated to "delivered".
          allOrdersData.map((o: IOrder) =>
            o._id?.toString() === otpModel?._id?.toString()
              ? { ...o, orderStatus: "delivered" }
              : o,
          ),
        ),
      );
      setOtpModel(null);
      setOtp("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Main container for the vendor orders page
    <div className="w-full p-4 sm:p-8 text-white">
      {/* Top section containing page title and total order count */}
      <div className="flex justify-between items-center mb-6">
        {/* Page title */}
        <h1 className="text-2xl font-bold">Vendor Orders</h1>

        {/* Show how many orders this vendor has */}
        <span className="text-gray-300">{orders.length} orders</span>
      </div>

      {/* ========================= */}
      {/* MOBILE GRID VIEW           */}
      {/* This appears below sm size */}
      {/* ========================= */}

      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {/* Loop through every vendor order */}
        {orders.map((order: IOrder, index: number) => (
          /* Animated mobile order card */
          <motion.div
            key={order._id?.toString() || index}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.06,
              duration: 0.4,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            {/* Order ID and current status */}
            <div className="flex items-center justify-between mb-4">
              <div>
                {/* Show the last 8 characters of order ID */}
                <p className="text-xs text-slate-400">Order</p>

                <p className="font-semibold">#{String(order._id).slice(-8)}</p>
              </div>

              {/* Show current order status */}
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs capitalize">
                {order.orderStatus}
              </span>
            </div>
            {/* Buyer information */}
            <div className="mb-4">
              {/* Section title */}
              <p className="text-xs text-slate-400 mb-1">Buyer</p>

              <p className="font-medium">{order.address?.name}</p>

              <p className="text-xs text-slate-400 mt-1">
                {order.buyer?.email}
              </p>

              <p className="text-xs text-slate-400">{order.address?.phone}</p>
            </div>
            {/* Product information */}
            <div className="mb-4">
              {/* Section title */}
              <p className="text-xs text-slate-400 mb-2">Products Info</p>

              {/* Show every product in this order */}
              <div className="space-y-1 border-t-2 border-white/10">
                {order.products.map((product, productIndex) => (
                  <div key={productIndex} className="text-sm text-slate-300">
                    {product.product?.title} × {product.quantity}
                  </div>
                ))}
              </div>
            </div>
            {/* Payment information */}
            <div className="mb-4">
              {/* Section title */}
              <p className="text-xs text-slate-400 mb-1">Payment</p>

              <p className="font-medium">{order.paymentMethod.toUpperCase()}</p>

              <p
                className={`text-xs mt-1 ${
                  order.isPaid ? "text-green-400" : "text-yellow-400"
                }`}
              >
                {order.isPaid ? "Paid" : "Pending"}
              </p>
            </div>
            {/* Status update section */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
              {/* Current status */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                  Current Status
                </p>

                {/* Display the current order status using premium badges with subtle borders, gradients, and status indicators. */}
                {order.orderStatus === "cancelled" && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-gradient-to-r from-red-500/10 to-red-500/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-red-300 shadow-[0_0_18px_rgba(239,68,68,0.08)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
                    Cancelled
                  </span>
                )}

                {order.orderStatus === "delivered" && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.08)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    Delivered
                  </span>
                )}

                {order.orderStatus === "returned" && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.08)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                    Returned
                  </span>
                )}
              </div>

              {/* Update status */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                  Update Status
                </p>

                {/* Dropdown to change order status */}
                {order.orderStatus !== "returned" &&
                  order.orderStatus !== "delivered" &&
                  order.orderStatus !== "cancelled" && (
                    <select
                      value={order.orderStatus}
                      onChange={async (e) => {
                        // Handle the selected order status; if "delivered" is selected, open the OTP modal first, otherwise update the status directly.
                        if (e.target.value === "delivered") {
                          // updateStatus calls the API with orderId and status as parameters.
                          updateStatus(String(order._id), "delivered");

                          // Store the entire selected order object in otpModel so its _id and other order details can be accessed during OTP verification.
                          // Example: otpModel = { _id, buyer, address, products, totalAmount, orderStatus, paymentMethod, isPaid, ... }
                          setOtpModel(order);
                        } else {
                          updateStatus(String(order._id), e.target.value);
                        }
                      }}
                      className="w-full cursor-pointer appearance-none rounded-xl border border-white/15 bg-gradient-to-r from-white/[0.08] to-white/[0.04] px-4 py-3 text-sm font-medium text-white shadow-inner outline-none backdrop-blur-sm transition-all duration-200 hover:border-white/25 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    >
                      {statusOptions.map((status) => (
                        <option
                          value={status}
                          key={status}
                          className="bg-zinc-950 text-white"
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ========================= */}
      {/* DESKTOP TABLE VIEW        */}
      {/* This appears from sm size */}
      {/* ========================= */}

      <div className="hidden sm:block overflow-x-auto rounded-xl border border-white/10">
        {/* Orders table */}
        <table className="w-full min-w-[750px] text-left">
          {/* Table header */}
          <thead className="border-b border-white/10 bg-white/[0.03]">
            <tr>
              {/* Order column */}
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Order
              </th>

              {/* Buyer column */}
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Buyer
              </th>

              {/* Product column */}
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Product
              </th>

              {/* Payment column */}
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Payment
              </th>

              {/* Status column */}
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>

              {/* Update column */}
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Update
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody className="divide-y divide-white/5">
            {/* Loop through every vendor order */}
            {orders.map((order: IOrder, index: number) => (
              /* Animated desktop table row */
              <motion.tr
                key={order._id?.toString() || index}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.4,
                }}
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.025)",
                }}
                className="transition-colors"
              >
                {/* Show the order ID */}
                <td className="px-6 py-5">
                  <p className="font-medium">#{String(order._id).slice(-8)}</p>
                </td>

                {/* Show buyer information */}
                <td className="px-6 py-5">
                  <p className="font-medium">{order.address?.name}</p>

                  <p className="text-xs text-slate-400 mt-1">
                    {order.buyer?.email}
                  </p>

                  <p className="text-xs text-slate-400">
                    {order.address?.phone}
                  </p>
                </td>

                {/* Show all products inside this order */}
                <td className="px-6 py-5 text-sm text-slate-300">
                  {order.products.map((product, productIndex) => (
                    <div key={productIndex} className="mb-1">
                      {product.product?.title} × {product.quantity}
                    </div>
                  ))}
                </td>

                {/* Show payment method and payment status */}
                <td className="px-6 py-5">
                  <p className="font-medium">
                    {order.paymentMethod.toUpperCase()}
                  </p>

                  <p
                    className={`text-xs mt-1 ${
                      order.isPaid ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </p>
                </td>

                {/* Show current order status */}
                <td className="px-6 py-5">
                  <span className="capitalize">{order.orderStatus}</span>
                </td>

                {/* Allow vendor to select a new order status */}
                <td className="px-6 py-5">
                  {order.orderStatus === "cancelled" && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-gradient-to-r from-red-500/10 to-red-500/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-red-300 shadow-[0_0_18px_rgba(239,68,68,0.08)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
                      Cancelled
                    </span>
                  )}

                  {order.orderStatus === "delivered" && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.08)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      Delivered
                    </span>
                  )}

                  {order.orderStatus === "returned" && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.08)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                      Returned
                    </span>
                  )}
                  {order.orderStatus !== "cancelled" &&
                    order.orderStatus !== "delivered" &&
                    order.orderStatus !== "returned" && (
                      <select
                        value={order.orderStatus}
                        onChange={async (e) => {
                          // Handle the selected order status; if "delivered" is selected, open the OTP modal first, otherwise update the status directly.
                          if (e.target.value === "delivered") {
                            updateStatus(String(order._id), "delivered");
                            // updateStatus is the func called API(parms are orderId & status)
                            //---------------------------------------------
                            // Store the entire selected order object in otpModel so its _id and other order details can be accessed during OTP verification.
                            // Example: otpModel = { _id, buyer, address, products, totalAmount, orderStatus, paymentMethod, isPaid, ... }
                            setOtpModel(order);
                          } else {
                            updateStatus(String(order._id), e.target.value);
                          }
                        }}
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm outline-none"
                      >
                        {statusOptions.map((status) => (
                          <option
                            value={status}
                            key={status}
                            className="bg-black"
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                    )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ++++++++++++++++++ OTP OPEN SECTION ------+++++++++++++++++++++++++++++++++ */}
      {otpModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">
                Enter Delivery OTP
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                Enter the OTP provided by the customer to confirm delivery.
              </p>
            </div>

            {/* OTP Input */}
            <div className="mb-6">
              <label
                htmlFor="delivery-otp"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Delivery OTP
              </label>

              <input
                id="delivery-otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-center text-lg font-semibold tracking-[0.4em] text-white outline-none transition placeholder:tracking-normal placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                onClick={verifyOtp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Verify & Delivered
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => setOtpModel(null)}
                className="rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-3 font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default VendorOrders;
