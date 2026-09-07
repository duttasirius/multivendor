"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Store, BadgeCheck, Loader2, ArrowRight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

function EditVendorDetails() {
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    if(!shopName || !shopAddress || !gstNumber){
        alert("KINDLY FILL ALL DETAILS")
    }
    try {
        const result = await axios.post('/api/vendor/editDetails' , {shopName ,shopAddress ,gstNumber});
        console.log("THIS IS VENDOR EDIT PAGE",result.data);
        alert("VENDOR DETAILS UPDATE SUCCESSFULLY");
        setLoading(false)
        router.push('/')
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full max-w-lg"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">
            <div className="mb-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 180 }}
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-400 shadow-lg shadow-indigo-950/30"
              >
                <Store size={30} />
              </motion.div>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Complete Your Shop Details
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
                Add your store information so you can start managing your
                vendor account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="shopName"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Shop Name
                </label>

                <div className="relative">
                  <Store
                    size={20}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="shopName"
                    type="text"
                    placeholder="Enter your shop name"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/40 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500/60 focus:bg-slate-950/60 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="shopAddress"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Shop Address
                </label>

                <div className="relative">
                  <MapPin
                    size={20}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="shopAddress"
                    type="text"
                    placeholder="Enter your shop address"
                    value={shopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/40 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500/60 focus:bg-slate-950/60 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="gstNumber"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  GST Number
                </label>

                <div className="relative">
                  <BadgeCheck
                    size={20}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="gstNumber"
                    type="text"
                    placeholder="Enter your GST number"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/40 py-3.5 pl-12 pr-4 text-sm uppercase tracking-wide text-white outline-none transition placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-500 focus:border-indigo-500/60 focus:bg-slate-950/60 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:from-indigo-500 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Saving Details...
                  </>
                ) : (
                  <>
                    Submit
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-500"
            >
              <BadgeCheck size={15} className="text-emerald-400" />
              Your store information is securely stored.
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default EditVendorDetails;