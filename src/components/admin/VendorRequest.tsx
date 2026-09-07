
'use client'
import { IUser } from '@/model/user.model'
import { AppDispatch, RootState } from '@/redux/store'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CheckCircle2, Clock3, Eye, Loader2, Store, UserRound, X } from 'lucide-react'
import axios from 'axios'
import useGetAllVendors from '@/hooks/useGetAllVendors'
import { setAllVendorsData } from '@/redux/vendorSlice'
import useGetCurrentUser from '@/hooks/useGetCurrentUser'
import useGetAllProducts from '@/hooks/useGetAllProducts'


// this is the page where admin see & take action to approved & reject vendors

function VendorRequest() {

  const dispatch = useDispatch<AppDispatch>()

  useGetCurrentUser();
  useGetAllProducts();
  useGetAllVendors();


  // Get all vendors from the Redux store
  const allVendorsData: IUser[] = useSelector((state: RootState) => state.vendor.allVendorsData)

  // Only keep vendors whose verification status is pending
  const pendingVendors = allVendorsData.filter((v) => v.verificationStatus === 'pending')

  // Stores the vendor currently selected for review
  const [selectedVendor, setSelectedVendor] = useState<IUser | null>(null)
  const [loading , setLoading] = useState(false)
  const [rejectModel , setRejectModel] = useState(false);
  const [rejectedReason , setRejectedReason] = useState("")


  // for approving vendor 
const handleApproved = async () => {
  
    if (!selectedVendor) return
    setLoading(true)
   
    try {
        await axios.post('/api/admin/update-vendor-status', {
            vendorId: selectedVendor._id,
            status: 'approved'
        })
        // Creates a new array containing every vendor except the vendor that was just approved.
// `filter()` does not modify the original Redux array; it returns a new array.
        const updated = allVendorsData.filter((v) => v._id !== selectedVendor._id)
        // Sends the updated vendor list to Redux so the UI immediately removes the approved vendor.
// `setAllVendorsData()` is the Redux action created in your vendor slice.
        dispatch(setAllVendorsData(updated))
        // Clears the selected vendor from state.
// This closes the vendor details modal after successful approval.
        setSelectedVendor(null)

        setLoading(false)
        // Shows a simple browser alert informing the admin that the update was successful.
        alert('VENDOR STATUS UPDATED')
  
    } catch (error) {
        console.log(error)
    }
}

  // for rejecting vendor popup
const openRejectReasonArea = async()=>{
  setRejectModel(true);
  setRejectedReason("")

}

// for rejecting vendor func
const handleReject = async()=>{
    if(!selectedVendor) return
    setLoading(true)
    try {
        await axios.post('/api/admin/update-vendor-status' , {vendorId:selectedVendor._id , status:"rejected" , rejectedReason})

        const updated = allVendorsData.filter((v)=>v._id !== selectedVendor._id);
          dispatch(setAllVendorsData(updated))
          setSelectedVendor(null)
          setLoading(false)
          alert("VENDOR STATUS Rejected")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    // Main page wrapper
    <div className="min-h-screen w-full overflow-hidden bg-slate-950 px-3 py-5 text-white sm:px-6 lg:px-10 lg:py-8">
      {/* Center the dashboard content and limit its maximum width */}
      <div className="mx-auto w-full max-w-7xl">

        {/* Page heading section */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-6"
        >
          {/* Heading container - column on mobile, row on larger screens */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            {/* Page title and description */}
            <div>
              {/* Small section label */}
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Vendor Management
              </p>

              {/* Main page title */}
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Vendor Approval Requests
              </h1>

              {/* Page description */}
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Review and manage vendors waiting for verification.
              </p>
            </div>

            {/* Number of pending vendors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="flex w-fit items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300 shadow-lg shadow-amber-500/5"
            >
              <Clock3 size={16} />
              {pendingVendors.length} Pending
            </motion.div>
          </div>
        </motion.div>

        {/* Check whether there are any pending vendors */}
        {pendingVendors.length === 0 ? (

          /* Empty state shown when there are no pending requests */
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex min-h-[350px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-xl"
          >
            {/* Empty state content */}
            <div className="max-w-sm">

              {/* Animated success icon */}
              <motion.div
                animate={{
                  y: [0, -7, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 shadow-lg shadow-emerald-500/10"
              >
                <CheckCircle2 size={32} />
              </motion.div>

              {/* Empty state title */}
              <h2 className="mt-5 text-xl font-semibold">
                No Pending Requests
              </h2>

              {/* Empty state description */}
              <p className="mt-2 text-sm leading-6 text-slate-400">
                All vendor applications have been reviewed. There are no requests waiting for approval.
              </p>
            </div>
          </motion.div>

        ) : (

          /* Vendor request content when pending vendors exist */
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >

            {/* ================= DESKTOP TABLE ================= */}

            {/* Hidden on mobile, visible from md and above */}
            <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur-xl md:block">

              {/* Allows horizontal scrolling if the table becomes too wide */}
              <div className="overflow-x-auto">

                {/* Desktop vendor table */}
                <table className="w-full min-w-[750px] text-left">

                  {/* Table header */}
                  <thead className="border-b border-white/10 bg-white/[0.03]">
                    <tr>

                      {/* Vendor name column */}
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Vendor
                      </th>

                      {/* Shop name column */}
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Shop
                      </th>

                      {/* Phone column */}
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Phone
                      </th>

                      {/* Verification status column */}
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Status
                      </th>

                      {/* Action column */}
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Action
                      </th>
                    </tr>
                  </thead>

                  {/* Table body */}
                  <tbody className="divide-y divide-white/5">

                    {/* Loop through pending vendors */}
                    {pendingVendors.map((vendor, index) => (

                      /* Animated table row */
                      <motion.tr
                        key={vendor._id?.toString() || index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.06,
                          duration: 0.4
                        }}
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.025)' }}
                        className="transition-colors"
                      >

                        {/* Vendor information */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">

                            {/* Vendor avatar icon */}
                            <motion.div
                              whileHover={{ scale: 1.08, rotate: 3 }}
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300"
                            >
                              <UserRound size={19} />
                            </motion.div>

                            {/* Vendor name and number */}
                            <div>
                              <p className="font-medium text-white">
                                {vendor?.name || 'Unknown Vendor'}
                              </p>

                              <p className="text-xs text-slate-500">
                                Vendor #{index + 1}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Shop information */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Store size={16} className="text-slate-500" />
                            {vendor?.shopName || '-'}
                          </div>
                        </td>

                        {/* Vendor phone number */}
                        <td className="px-6 py-5 text-sm text-slate-300">
                          {vendor?.phone || '-'}
                        </td>

                        {/* Verification status */}
                        <td className="px-6 py-5">
                          <motion.span
                            whileHover={{ scale: 1.03 }}
                            className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold capitalize text-amber-300"
                          >

                            {/* Small status dot */}
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />

                            {vendor.verificationStatus}
                          </motion.span>
                        </td>

                        {/* Review button */}
                        <td className="px-6 py-5">
                          <motion.button
                            whileHover={{ scale: 1.04, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedVendor(vendor)}
                            className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-sm font-medium text-cyan-300 transition-all hover:border-cyan-400/30 hover:bg-cyan-400/15"
                          >
                            <Eye size={16} />
                            Review
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ================= MOBILE CARDS ================= */}

            {/* Visible only on screens smaller than md */}
            <div className="grid gap-4 md:hidden">

              {/* Create one responsive card for each vendor */}
              {pendingVendors.map((vendor, index) => (
                <motion.div
                  key={vendor._id?.toString() || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.07,
                    duration: 0.4
                  }}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10 backdrop-blur-xl"
                >

                  {/* Vendor name + status */}
                  <div className="flex items-start justify-between gap-3">

                    {/* Vendor identity */}
                    <div className="flex items-center gap-3">

                      {/* Vendor icon */}
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300"
                      >
                        <UserRound size={20} />
                      </motion.div>

                      {/* Vendor name */}
                      <div>
                        <p className="font-semibold text-white">
                          {vendor?.name || 'Unknown Vendor'}
                        </p>

                        <p className="text-xs text-slate-500">
                          Vendor #{index + 1}
                        </p>
                      </div>
                    </div>

                    {/* Vendor status badge */}
                    <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold capitalize text-amber-300">
                      {vendor.verificationStatus}
                    </span>
                  </div>

                  {/* Shop and phone information */}
                  <div className="mt-5 space-y-3 rounded-xl border border-white/5 bg-black/10 p-4">

                    {/* Shop row */}
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-500">
                        Shop
                      </span>

                      <span className="max-w-[65%] truncate text-right text-slate-200">
                        {vendor?.shopName || '-'}
                      </span>
                    </div>

                    {/* Phone row */}
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-500">
                        Phone
                      </span>

                      <span className="text-right text-slate-200">
                        {vendor?.phone || '-'}
                      </span>
                    </div>
                  </div>

                  {/* Mobile review button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedVendor(vendor)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
                  >
                    <Eye size={17} />
                    Review Vendor
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ================= REVIEW MODAL ================= */}

        {/* AnimatePresence allows the modal to animate when entering and leaving */}
        <AnimatePresence mode="wait">

          {/* Only render the modal when a vendor is selected */}
          {selectedVendor && (
            /* Dark overlay behind the modal */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVendor(null)}
              className="fixed inset-0 z-50 flex items-center mt-36 justify-center bg-black/70 px-4 py-6 backdrop-blur-md sm:px-6"
            >

              {/* Modal box */}
              <motion.div
                initial={{ opacity: 0, y: 35, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 25, scale: 0.96 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut'
                }}
                onClick={(e) => e.stopPropagation()}
                className="relative  w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-900 p-5 shadow-2xl shadow-black/50 sm:p-7"
              >

                {/* Decorative top gradient */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelectedVendor(null)}
                  className="absolute right-4 top-4 rounded-xl border border-white/5 bg-white/[0.03] p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={20} />
                </motion.button>

                {/* Modal heading */}
                <div className="pr-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    Vendor Review
                  </p>

                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Selected Vendor Details
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Review the vendor information before approving or rejecting the request.
                  </p>
                </div>

                {/* Vendor details container */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mt-6 grid gap-3 sm:grid-cols-2"
                >

                  {/* Vendor name */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Name
                    </p>
                    <p className="mt-2 break-words font-medium text-white">
                      {selectedVendor.name || '-'}
                    </p>
                  </div>

                  {/* Vendor email */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Email
                    </p>
                    <p className="mt-2 break-all font-medium text-white">
                      {selectedVendor.email || '-'}
                    </p>
                  </div>

                  {/* Shop name */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Shop Name
                    </p>
                    <p className="mt-2 break-words font-medium text-white">
                      {selectedVendor.shopName || '-'}
                    </p>
                  </div>

                  {/* GST number */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      GST Number
                    </p>
                    <p className="mt-2 break-words font-medium text-white">
                      {selectedVendor.gstNumber || '-'}
                    </p>
                  </div>

                  {/* Phone number */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Phone
                    </p>
                    <p className="mt-2 font-medium text-white">
                      {selectedVendor.phone || '-'}
                    </p>
                  </div>

                  {/* Verification status */}
                  <div className="rounded-2xl border border-amber-400/10 bg-amber-400/[0.03] p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Status
                    </p>
                    <p className="mt-2 font-medium capitalize text-amber-300">
                      {selectedVendor.verificationStatus || '-'}
                    </p>
                  </div>

                  {/* Shop address */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:col-span-2">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Shop Address
                    </p>
                    <p className="mt-2 break-words text-sm leading-6 text-white">
                      {selectedVendor.shopAddress || '-'}
                    </p>
                  </div>
                </motion.div>

                {/* Modal action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
                >

                  {/* Approve vendor */}
                 <motion.button
  onClick={handleApproved}
  disabled={loading}
  whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -1 }}
  whileTap={{ scale: loading ? 1 : 0.97 }}
  className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-slate-950 transition-colors ${
    loading
      ? 'cursor-not-allowed bg-emerald-400/50'
      : 'bg-emerald-400 hover:bg-emerald-300'
  }`}
>
  {loading ? (
    <>
      <Loader2 size={18} className="animate-spin" />
      Approving...
    </>
  ) : (
    'Approved'
  )}
</motion.button>

                  {/* Reject vendor */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={openRejectReasonArea}
                    className="rounded-xl bg-red-400 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-300"
                  >
                    Reject
                  </motion.button>

                  {/* Close modal */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedVendor(null)}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


      <AnimatePresence mode="wait">
  {rejectModel && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.05, duration: 0.2 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
      >
        <h3 className="text-xl font-semibold text-white">
          Reject Reason
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Please enter a reason for rejecting this vendor request.
        </p>

        <textarea
          value={rejectedReason}
          onChange={(e) => setRejectedReason(e.target.value)}
          placeholder="Enter rejection reason..."
          rows={5}
          className="mt-5 w-full resize-none rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
        />

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setRejectModel(false)}
            className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Cancel
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleReject}
            disabled={!rejectedReason.trim()}
            className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm Reject
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      </div>
    </div>
  )
}

export default VendorRequest

