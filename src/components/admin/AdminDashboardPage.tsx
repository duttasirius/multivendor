import useGetAllOrders from "@/hooks/useGetAllOrders";
import useGetAllProducts from "@/hooks/useGetAllProducts";
import useGetAllVendors from "@/hooks/useGetAllVendors";
import { IUser } from "@/model/user.model";
import { RootState } from "@/redux/store";
import { IndianRupee } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function AdminDashboardPage() {
  // Fetch all orders from the backend and store/update the result in the Redux store.
  useGetAllOrders();

  // Fetch all products from the backend and store/update the result in the Redux store.
  useGetAllProducts();

  // Fetch all vendors from the backend and store/update the result in the Redux store.
  useGetAllVendors();

  // Read vendor and product data from the vendor slice of the Redux store.
  const { allVendorsData, allProductsData } = useSelector(
    (state: RootState) => state.vendor,
  );

  // Read order data from the user slice of the Redux store.
  const { allOrdersData } = useSelector((state: RootState) => state.user);

  // Use an empty array while vendor data is unavailable so map/filter do not throw an error.
  const vendors = allVendorsData || [];

  // Find all vendors that are still waiting for admin approval.
  const pendingVendors = vendors.filter(
    (v) => v.verificationStatus === "pending",
  );

  // Use an empty array while product data is unavailable.
  const AllProducts = allProductsData || [];

  // Use an empty array while order data is unavailable.
  const orders = allOrdersData || [];

  // Find all products that are still waiting for admin approval.
  const pendingProducts = AllProducts.filter(
    (p) => p.verificationStatus === "pending",
  );

  // Find all delivered orders because only delivered orders are considered for earnings.
  const deliverOrders = orders.filter((o) => o.orderStatus === "delivered");

  // Start the overall platform earning calculation from zero.
  let totalEarning = 0;

  // Go through every delivered order to calculate the total earning.
  deliverOrders.forEach((o) => {
    // Only include an order in earnings when the delivered order has also been paid.
    if (o.isPaid) {
      // Add the current order amount to the overall earning.
      totalEarning += o.totalAmount;
    }
  });

  // Main dashboard container; provides full-screen height, dark background, responsive padding, and white text.
  return (
    <div className="min-h-screen w-full bg-[#080808] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Admin Dashboard
          </h1>

          <p className="text-sm text-white/40">
            Monitor vendors, products, orders, approvals, and earnings.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          <Statebox title="Total Vendors" value={vendors.length} />

          <Statebox title="Total Products" value={AllProducts.length} />

          <Statebox title="Total Orders" value={orders.length} />

          <Statebox title="Total Earnings" value={`₹ ${totalEarning}`} />

          <Statebox title="Pending Vendors" value={pendingVendors.length} />

          <Statebox title="Pending Products" value={pendingProducts.length} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* // Loop through every vendor and calculate that vendor's products, orders, cancellations, returns, and earnings. */}
          {vendors.map((vendor: IUser, index: number) => {
            // Loop through every vendor; `vendor` represents the current vendor being processed.
            const vendorProducts = allProductsData.filter(
              // `p` represents the current product being checked from allProductsData.
              (p: any) =>
                // Get the vendor ID from the product and compare it with the current vendor's ID.
                String(p.vendor?._id || p.vendor) === String(vendor._id),
            );

            // Filter all orders and keep only orders that belong to the current vendor.
            const vendorOrders = allOrdersData.filter(
              // `o` represents the current order being checked from allOrdersData.
              (o: any) =>
                // Get the vendor ID from the order and compare it with the current vendor's ID.
                String(o.productVendor?._id || o.productVendor) ===
                String(vendor._id),
            );

            // Filter this vendor's orders and count only cancelled orders.
            const cancelled = vendorOrders.filter(
              // Check whether the current order has a cancelled status.
              (o: any) => o.orderStatus === "cancelled",
            ).length;

            // Filter this vendor's orders and count only returned orders.
            const returned = vendorOrders.filter(
              // Check whether the current order has a returned status.
              (o: any) => o.orderStatus === "returned",
            ).length;

            // Start the current vendor's earning calculation from zero.
            let vendorEarning = 0;

            // Go through every order belonging to this vendor to calculate its earnings.
            vendorOrders.forEach((o: any) => {
              // Only delivered and paid orders are included in vendor earnings.
              if (o.orderStatus === "delivered" && o.isPaid) {
                // Add the current order's total amount to the vendor's running earnings.
                vendorEarning += o.totalAmount;
              }
            });

            // Animated vendor card; fades in, slides upward, appears with a staggered delay, and lifts slightly when hovered.
            return (
              <motion.div
                key={vendor._id?.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -5,
                }}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-2xl"
              >
                {/* Vendor header; displays the shop name and verification status. */}
                <div className="mb-5 flex items-start justify-between gap-4">
                  {/* Vendor information; keeps the shop name from overflowing the card. */}
                  <div className="min-w-0">
                    {/* Display the current vendor's shop name with truncation for long names. */}
                    <h2 className="truncate text-base font-semibold tracking-tight text-white sm:text-lg">
                      {vendor.shopName}
                    </h2>

                    {/* Small label explaining what the status badge represents. */}
                    <p className="mt-1 text-xs text-white/35">
                      Vendor verification
                    </p>
                  </div>

                  {/* Verification badge; green represents approved while yellow represents a non-approved status. */}
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      vendor.verificationStatus === "approved"
                        ? "border-green-400/20 bg-green-400/10 text-green-400"
                        : "border-yellow-400/20 bg-yellow-400/10 text-yellow-400"
                    }`}
                  >
                    {vendor.verificationStatus}
                  </span>
                </div>

                {/* Vendor statistics container; groups product, order, cancelled, returned, and earning information together. */}
                <div className="space-y-2">
                  {/* Product statistic row; displays how many products belong to this vendor. */}
                  <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-3 transition-colors hover:bg-white/[0.05]">
                    <p className="text-sm text-white/45">Products</p>

                    <p className="text-sm font-semibold text-white">
                      {vendorProducts.length}
                    </p>
                  </div>

                  {/* Order statistic row; displays how many orders belong to this vendor. */}
                  <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-3 transition-colors hover:bg-white/[0.05]">
                    <p className="text-sm text-white/45">Orders</p>

                    <p className="text-sm font-semibold text-white">
                      {vendorOrders.length}
                    </p>
                  </div>

                  {/* Cancelled statistic row; displays the number of cancelled orders using a red warning color. */}
                  <div className="flex items-center justify-between rounded-xl border border-red-400/[0.08] bg-red-400/[0.025] px-3.5 py-3 transition-colors hover:bg-red-400/[0.05]">
                    <p className="text-sm text-white/45">Cancelled</p>

                    <p className="text-sm font-semibold text-red-400">
                      {cancelled}
                    </p>
                  </div>

                  {/* Returned statistic row; displays the number of returned orders using an orange warning color. */}
                  <div className="flex items-center justify-between rounded-xl border border-orange-400/[0.08] bg-orange-400/[0.025] px-3.5 py-3 transition-colors hover:bg-orange-400/[0.05]">
                    <p className="text-sm text-white/45">Returned</p>

                    <p className="text-sm font-semibold text-orange-400">
                      {returned}
                    </p>
                  </div>

                  {/* Earnings section; visually separates the financial information from the other vendor statistics. */}
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-green-400/10 bg-green-400/[0.04] px-3.5 py-3.5">
                    {/* Earnings label; identifies the financial value displayed on the right. */}
                    <p className="text-sm font-medium text-white/50">
                      Earnings
                    </p>

                    {/* Earnings amount; displays the vendor's total delivered-and-paid earnings with the Rupee icon. */}
                    <p className="flex items-center gap-1 text-base font-bold text-green-400">
                      <IndianRupee className="h-4 w-4" />
                      {vendorEarning}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;

// Reusable dashboard statistic card; receives a title and value so the same UI can display different platform statistics.
function Statebox({ title, value }: { title: string; value: any }) {
  // Animated statistic card; fades upward into view and slightly moves upward when the administrator hovers over it.
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      whileHover={{
        y: -3,
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
    >
      <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35 sm:text-[11px]">
        {title}
      </p>

      <p className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
        {value}
      </p>
    </motion.div>
  );
}

// Reusable metric row; keeps Products, Orders, Cancelled, and Returned statistics visually consistent inside vendor cards.
