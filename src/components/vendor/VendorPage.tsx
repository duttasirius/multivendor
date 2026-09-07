'use client';
import { IUser } from '@/model/user.model';
import React, { useState } from 'react';
import VendorDashBoardLayout from './VendorDashBoard';
import { ClockAlert, ShieldCheck, Store, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import axios from 'axios';



function VendorPage({ user }: { user: IUser }) {
 const [showVerifyForm, setShowVerifyForm] = useState(false);
  const [shopName, setShopName] = useState(user?.shopName || "");
  const [businessAddress, setBusinessAddress] = useState(user?.businessAddress || "");
  const [gstNumber, setGstNumber] = useState(user?.gstNumber || "");
  const [loading, setLoading] = useState(false);


  const handleVerifyAgain = async()=>{
    setLoading(true)
    if (!shopName || !businessAddress || !gstNumber) {
      alert("All fields are required");
      return;
    }

    try {
      const result = await axios.post('/api/vendor/verify-again',{shopName , businessAddress, gstNumber});
      setLoading(false)
      alert("VERIFICATION AGAIN SUCCESSFULLY")
      console.log(result.data)
      setShopName("")
      setBusinessAddress("")
      setGstNumber("")

    } catch (error) {
      console.log(error)
    }
  }
  
  if (!user) {
    return (
      <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} className="h-12 w-12 rounded-full border-4 border-slate-700 border-t-cyan-400" />
          <p className="text-sm font-medium text-slate-400 tracking-wide">Loading vendor dashboard...</p>
        </motion.div>
      </div>
    );
  }
 if (user.verificationStatus === 'approved') {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full max-w-none"
    >
      <VendorDashBoardLayout />
    </motion.div>
  );
}


// pending status
  if (user.verificationStatus === 'pending') {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-[#050816] flex items-center justify-center px-4 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.14),transparent_30%)]" />
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="relative w-full max-w-2xl">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-12">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
            <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.5 }} className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-500/10">
              <ClockAlert size={30} />
            </motion.div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              <Sparkles size={14} />
              Vendor Verification
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Verification Pending</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">Your vendor account has been submitted successfully and is currently being reviewed by our team. You will be able to access your dashboard once the verification is approved.</p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Verification Status</p>
                    <p className="mt-1 text-sm font-semibold capitalize text-white">{user.verificationStatus}</p>
                  </div>
                </div>
                <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold capitalize text-amber-300">{user.verificationStatus}</span>
              </div>
            </div>
            <div className="mt-5 flex items-start gap-4 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                <Store size={19} />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-300">Almost there</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">Verification usually takes around <span className="font-semibold text-slate-200">2–3 hours</span>. Please check again later.</p>
              </div>
            </div>
            <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </div>
            <p className="mt-4 text-center text-xs text-slate-600">We appreciate your patience while we review your account.</p>
          </div>
        </motion.div>
      </div>
    );
  }


  // reject status
  if (user.verificationStatus === "rejected") {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4">
        <div className="bg-white/10 backdrop-blur-md p-12 rounded-2xl shadow-2xl border border-white/30 max-w-2xl w-full text-center">
          <h2 className="text-4xl font-bold mb-4 text-red-400">
            Verification Rejected ❌
          </h2>

          <p className="text-gray-200 text-lg mb-4">
            Your business verification was rejected by admin.
          </p>

          <div className="text-sm text-red-300 mb-6">
            Reason: {user.rejectedReason || "No reason provided"}
          </div>

          {!showVerifyForm ? (
            <button
              onClick={() => setShowVerifyForm(true)}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold"
            >
              Verify Again
            </button>
          ) : (
            <div className="mt-6 text-left space-y-4">
              <input
                type="text"
                placeholder="Shop Name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full p-3 rounded bg-white/10 border border-white/20"
              />

              <input
                type="text"
                placeholder="Business Address"
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                className="w-full p-3 rounded bg-white/10 border border-white/20"
              />

              <input
                type="text"
                placeholder="GST Number"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                className="w-full p-3 rounded bg-white/10 border border-white/20"
              />

              <button
                onClick={handleVerifyAgain}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold"
              >
                {loading ? "Submitting..." : "Submit & Verify Again"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }



  
  return (
    <div className="min-h-screen w-full bg-[#050816] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border border-white/10 bg-white/[0.05] p-10 text-center backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white">Unknown Verification Status</h2>
        <p className="mt-3 text-sm text-slate-400">Please contact support for assistance.</p>
      </motion.div>
    </div>
  );
}
export default VendorPage;