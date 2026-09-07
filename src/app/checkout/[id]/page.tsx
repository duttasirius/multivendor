"use client";

import { IProduct } from "@/model/product.model";
import axios from "axios";
import { CreditCard, IndianRupee } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CartItem {
  product: IProduct;
  quantity: number;
}

function Page() {
  const params = useParams();
  const productId = params.id as string;

  const [item, setItem] = useState<CartItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "stripe">("cod");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!productId) return;

    const loadItem = async () => {
      try {
        const result = await axios.get("/api/user/cart/get");

        const foundItem = result.data.cart.find(
          (i: CartItem) => i.product._id!.toString() === productId,
        );

        if (!foundItem) {
          router.replace("/cart");
          return;
        }

        setItem(foundItem);

        if (!foundItem.product.payOnDelivery) {
          setPaymentMethod("stripe");
        }
      } catch (error) {
        console.error(error);
        router.replace("/cart");
      }
    };

    loadItem();
  }, [productId, router]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white text-lg font-medium"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  const productTotal = item.product.price * item.quantity;

  const deliveryCharge = item.product.freeDelivery ? 0 : 50;

  const serviceCharge = 50;

  const finalTotal = productTotal + deliveryCharge + serviceCharge;

  const codDisabled = !item.product.payOnDelivery;

  const handlePlaceOrder = async () => {
    if (!name || !phone || !address || !city || !pinCode) {
      alert("Fill All Details");
      return;
    }

    try {
      const payLoad = {
        productId,
        quantity: item.quantity,
        address: { name, phone, city, address, pincode: pinCode },
        amount: finalTotal,
        deliveryCharge,
        serviceCharge,
      };

      setLoading(true);
      if (paymentMethod === "cod") {
        const result = await axios.post("/api/order/cod", payLoad);
        console.log(result.data);
        router.push("/orders");
        setLoading(false);
      } else {
        const result = await axios.post("/api/order/online-pay", payLoad);
        window.location.href = result.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 py-10 md:px-6 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto grid w-full max-w-6xl gap-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl md:p-8 lg:grid-cols-2"
      >
        {/* LEFT SIDE - DELIVERY INFORMATION */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-5"
        >
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Delivery Information
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Enter your delivery details below.
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-4 text-white outline-none placeholder:text-white/40 transition-all duration-300 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20"
            />

            <input
              type="tel"
              placeholder="Enter Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-4 text-white outline-none placeholder:text-white/40 transition-all duration-300 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20"
            />

            <textarea
              rows={4}
              placeholder="Enter Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full resize-none rounded-xl border border-white/10 bg-black/50 px-4 py-4 text-white outline-none placeholder:text-white/40 transition-all duration-300 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Enter City Name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-4 text-white outline-none placeholder:text-white/40 transition-all duration-300 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20"
              />

              <input
                type="text"
                placeholder="Enter Pin Code"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-4 text-white outline-none placeholder:text-white/40 transition-all duration-300 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20"
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - ORDER SUMMARY */}

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Order Summary
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Review your order before payment.
            </p>
          </div>

          {/* PRODUCT CARD */}

          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-4"
          >
            <Image
              src={item.product.image1 || "/placeholder.png"}
              alt={item.product.title}
              width={120}
              height={120}
              className="h-24 w-24 rounded-xl object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-bold text-white">
                {item.product.title}
              </p>

              <p className="mt-1 text-sm text-white/50">
                Quantity:{" "}
                <span className="font-semibold text-green-400">
                  {item.quantity}
                </span>
              </p>

              <p className="mt-2 text-lg font-bold text-green-400">
                ₹{productTotal.toLocaleString("en-IN")}
              </p>
            </div>
          </motion.div>

          {/* PRICE DETAILS */}

          <div className="space-y-4 rounded-2xl border border-white/10 bg-black/30 p-5">
            <div className="flex items-center justify-between text-sm text-white/60">
              <span>Product Total</span>

              <span className="font-medium text-white">
                ₹{productTotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-white/60">
              <span>Delivery Charge</span>

              <span className="font-medium text-white">
                {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-white/60">
              <span>Service Charge</span>

              <span className="font-medium text-white">₹{serviceCharge}</span>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-white">
                  Total Amount
                </span>

                <span className="text-xl font-bold text-green-400">
                  ₹{finalTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* PAYMENT METHOD */}

          <div className="space-y-4">
            <p className="text-lg font-semibold text-white">Payment Method</p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <motion.button
                type="button"
                whileHover={!codDisabled ? { scale: 1.02 } : {}}
                whileTap={!codDisabled ? { scale: 0.97 } : {}}
                disabled={codDisabled}
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-4 text-sm font-semibold transition-all duration-300 ${
                  codDisabled
                    ? "cursor-not-allowed border-white/5 bg-white/5 text-white/20"
                    : paymentMethod === "cod"
                      ? "border-green-400 bg-green-400/10 text-green-400 shadow-lg shadow-green-500/10"
                      : "border-white/10 bg-black/40 text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                <IndianRupee size={18} />
                Cash On Delivery
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPaymentMethod("stripe")}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-4 text-sm font-semibold transition-all duration-300 ${
                  paymentMethod === "stripe"
                    ? "border-blue-400 bg-blue-400/10 text-blue-400 shadow-lg shadow-blue-500/10"
                    : "border-white/10 bg-black/40 text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                <CreditCard size={18} />
                Stripe Payment
              </motion.button>
            </div>

            {/* PAYMENT BUTTON */}

            <motion.button
              type="button"
              onClick={handlePlaceOrder}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl bg-green-500 px-6 py-4 font-bold text-black shadow-lg shadow-green-500/20 transition-all duration-300 hover:bg-green-400"
            >
              {paymentMethod === "cod"
                ? "Place Order"
                : "Proceed To Secure Payment"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Page;
