import useGetAllOrders from "@/hooks/useGetAllOrders";
import useGetAllProducts from "@/hooks/useGetAllProducts";
import useGetAllVendors from "@/hooks/useGetAllVendors";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { IUser } from "@/model/user.model";
import { RootState } from "@/redux/store";
import { IndianRupee } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function VenBoard() {
  // Fetch all orders from the backend and update the Redux store.
  useGetAllOrders();

  // Fetch all products from the backend and update the Redux store.
  useGetAllProducts();

  // Fetch all vendors from the backend and update the Redux store.
  useGetAllVendors();

  // Fetch the currently logged-in user's data and update the Redux store.
  useGetCurrentUser();

  // Get vendor and product data from the vendor Redux slice.
  const { allVendorsData, allProductsData } = useSelector(
    (state: RootState) => state.vendor,
  );

  // Get all order data from the user Redux slice.
  const { allOrdersData } = useSelector((state: RootState) => state.user);

  // Get the currently logged-in user's information from Redux.
  const { userData } = useSelector((state: RootState) => state.user);

  // Filter all orders and keep only the orders belonging to the
  // currently logged-in vendor by comparing the vendor IDs.
  const vendorOrders = allOrdersData.filter(
    (o) =>
      o.productVendor && String(o.productVendor._id) === String(userData?._id),
  );
  // Filter all products and keep only the products belonging to
  // the currently logged-in vendor by comparing the vendor IDs.
  const vendorProducts = allProductsData.filter(
    (o) => String(o.vendor._id) === String(userData?._id),
  );

  // Filter the vendor's orders and keep only orders whose status
  // is "returned", then use length to count the returned orders.
  const returnOrder = vendorOrders.filter((o) => o.orderStatus === "returned");

  // Start the total stock calculation from zero.
  let stockProduct = 0;

  // Loop through every product belonging to this vendor so we can
  // calculate the total number of physical units currently in stock.
  vendorProducts.forEach((sto) => {
    // Only add the stock value when the product has a stock value.
    if (sto.stock) {
      // Add the current product's stock quantity to the running
      // total stock count.
      stockProduct += sto.stock;
    }
  });

  // Filter out cancelled and returned orders so only valid orders
  // remain for the vendor's order count and sales calculation.
  const validOrders = vendorOrders.filter(
    (o) => o.orderStatus !== "cancelled" && o.orderStatus !== "returned",
  );

  // Start the vendor's total sales calculation from zero.
  let totalSales = 0;

  // Loop through every valid order and add its total amount
  // to calculate the vendor's total sales.
  validOrders.forEach((o) => {
    // Add the current order's total amount to the running
    // total sales value.
    totalSales += o.totalAmount;
  });

  // Main dashboard container; provides the full-screen dark
  // background, responsive padding, and white text styling.
  return (
    <div
      className="
        min-h-screen
        w-full
        bg-[#080808]
        px-4
        py-6
        text-white
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          max-w-[1600px]
          space-y-8
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            p-5
            shadow-xl
            shadow-black/20
            backdrop-blur-xl
            sm:p-6
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-40
              w-40
              rounded-full
              bg-white/[0.04]
              blur-3xl
            "
          />

          <div className="relative">
            <h1
              className="
                truncate
                text-2xl
                font-bold
                tracking-tight
                text-white
                sm:text-3xl
              "
            >
              {userData?.shopName}
            </h1>

            <h2
              className="
                mt-2
                text-sm
                font-medium
                text-white/60
                sm:text-base
              "
            >
              {userData?.name}
            </h2>

            <div
              className="
                mt-4
                flex
                flex-col
                gap-2
                text-xs
                text-white/40
                sm:flex-row
                sm:items-center
                sm:gap-5
              "
            >
              <p className="truncate">{userData?.email}</p>

              <p>{userData?.phone}</p>
            </div>
          </div>
        </motion.div>

        <div
          className="
            grid
            grid-cols-2
            gap-3
            md:grid-cols-3
            lg:grid-cols-5
          "
        >
          <Statebox title="Product In-Stock" value={stockProduct} />

          <Statebox
            title="Number of Listed Products"
            value={vendorProducts.length}
          />

          <Statebox title="Orders" value={validOrders.length} />

          <Statebox title="Returned Products" value={returnOrder.length} />

          <Statebox title="Total Earnings" value={`₹ ${totalSales}`} />
        </div>
      </div>
    </div>
  );
}

export default VenBoard;

// Reusable animated statistic card; receives a title and value
// so the same component can display different dashboard metrics.
function Statebox({ title, value }: { title: string; value: any }) {
  // Animated statistic card; fades into view, slides upward,
  // and slightly grows when it first appears.
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      whileHover={{
        y: -5,
        scale: 1.015,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        p-1
        shadow-lg
        shadow-black/20
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-white/20
        hover:bg-white/[0.07]
        hover:shadow-2xl
        sm:p-5
      "
    >
      <div className="relative">
        <p
          className="
            truncate
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.14em]
            text-white/35
            sm:text-[11px]
          "
        >
          {title}
        </p>
        <p
          className="
            mt-2
            text-xl
            font-bold
            tracking-tight
            text-white
            sm:text-2xl
          "
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
}
