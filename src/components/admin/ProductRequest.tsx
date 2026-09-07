'use client'

import { AppDispatch, RootState } from '@/redux/store'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CheckCircle2, Clock3, Eye, Loader2, UserRound, X } from 'lucide-react'
import axios from 'axios'
import { setAllVendorsData } from '@/redux/vendorSlice'
import useGetAllProducts from '@/hooks/useGetAllProducts'
import { IProduct } from '@/model/product.model'
import Image from 'next/image'

// This page lets admin review products submitted by vendors,
// and approve or reject them with a reason.

function ProductRequest() {

  const dispatch = useDispatch<AppDispatch>()

  // This hook fetches all products and puts them into redux for us
  useGetAllProducts()

  // Grab all products from the redux store
  const allProductsData: IProduct[] = useSelector((state: RootState) => state.vendor.allProductsData)

  // We only want to show products that are still waiting for a decision
  const pendingProducts = allProductsData.filter((p) => p.verificationStatus === 'pending')

  // Which product is currently open in the review modal
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)

  // Loading spinner state while we call the API
  const [loading, setLoading] = useState(false)

  // Controls whether the "enter a rejection reason" popup is open
  const [rejectModel, setRejectModel] = useState(false)
  const [rejectedReason, setRejectedReason] = useState("")

  // Helper: after approve/reject succeeds, remove that product from
  // the pending list in redux so the UI updates immediately without
  // needing a full refetch.
  const removeProductFromStore = (productId: string) => {
    const updatedProducts = allProductsData.filter(
      (p) => p._id?.toString() !== productId
    )
    dispatch(setAllVendorsData(updatedProducts))
  }

  // Called when admin clicks "Approved" inside the modal
  const handleApproved = async () => {
  // Stop if no product is currently selected
  if (!selectedProduct) return

  // Show loading state while the API request is running
  setLoading(true)

  try {
    // Send the selected product ID and approved status to the API
    const res = await axios.post('/api/admin/product-status', {
      // Product that the admin is currently reviewing
      productId: selectedProduct._id,

      // Tell the backend that this product is approved
      status: 'approved',
    })

    // Check whether the API returned a successful response
    if (res.data) {
      // Remove the approved product from the Redux product list
      removeProductFromStore(selectedProduct._id!.toString())

      // Close the product review modal
      setSelectedProduct(null)
    }
  } catch (error) {
    // Print any API or server error in the browser console
    console.error('APPROVE PRODUCT ERROR:', error)
  } finally {
    // Always stop the loading state after success or failure
    setLoading(false)
  }
}

  // Opens the "why are you rejecting this" text box
  const openRejectReasonArea = () => {
    setRejectModel(true)
    setRejectedReason("")
  }

  // Called when admin confirms rejection with a reason typed in
  const handleReject = async () => {
    if (!selectedProduct || !rejectedReason.trim()) return

    setLoading(true)
    try {
      const res = await axios.post('/api/admin/update-product-status', {
        productId: selectedProduct._id,
        status: 'rejected',
        rejectedReason,
      })

      if (res.data) {
        removeProductFromStore(selectedProduct._id!.toString())
        setRejectModel(false)     // close reject popup
        setSelectedProduct(null)  // close review modal too
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    // Main page wrapper
    <div className="min-h-screen mt-10 w-full overflow-hidden bg-slate-950 px-3 py-5 text-white sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* Page heading section */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Product Management
              </p>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Product Approval Requests
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Review and manage products waiting for verification.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="flex w-fit items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300 shadow-lg shadow-amber-500/5"
            >
              <Clock3 size={16} />
              {pendingProducts.length} Pending
            </motion.div>
          </div>
        </motion.div>

        {/* Check whether there are any pending products */}
        {pendingProducts.length === 0 ? (

          /* Empty state shown when there are no pending requests */
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex min-h-[350px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-xl"
          >
            <div className="max-w-sm">
              <motion.div
                animate={{ y: [0, -7, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 shadow-lg shadow-emerald-500/10"
              >
                <CheckCircle2 size={32} />
              </motion.div>
              <h2 className="mt-5 text-xl font-semibold">No Pending Requests</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                All product submissions have been reviewed. There are no requests waiting for approval.
              </p>
            </div>
          </motion.div>

        ) : (

          /* Product request content when pending products exist */
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur-xl md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px] text-left">
                  <thead className="border-b border-white/10 bg-white/[0.03]">
                    <tr>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Image</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Title</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Price</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Category</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/5">
                    {pendingProducts.map((product, index) => (
                      <motion.tr
                        key={product._id?.toString() || index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.06, duration: 0.4 }}
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.025)' }}
                        className="transition-colors"
                      >
                        <td className="px-6 py-5">
                          <Image src={product.image1} alt="product image" height={60} width={60} className="object-cover" />
                        </td>
                        <td className="px-6 py-5">{product.title}</td>
                        <td className="px-6 py-5 text-sm text-slate-300">{product.price}</td>
                        <td className="px-6 py-5">{product.category}</td>
                        <td className="px-6 py-5 capitalize">{product.verificationStatus}</td>
                        <td className="px-6 py-5">
                          <motion.button
                            whileHover={{ scale: 1.04, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedProduct(product)}
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
            <div className="grid gap-4 md:hidden">
              {pendingProducts.map((product, index) => (
                <motion.div
                  key={product._id?.toString() || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10 backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300"
                      >
                        <UserRound size={20} />
                      </motion.div>
                      <div>
                        <p className="font-semibold text-white">{product.title || 'Untitled Product'}</p>
                        <p className="text-xs text-slate-500">Product #{index + 1}</p>
                      </div>
                    </div>

                    <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold capitalize text-amber-300">
                      {product.verificationStatus}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3 rounded-xl border border-white/5 bg-black/10 p-4">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-500">Category</span>
                      <span className="max-w-[65%] truncate text-right text-slate-200">{product.category || '-'}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-500">Price</span>
                      <span className="text-right text-slate-200">{product.price ?? '-'}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedProduct(product)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
                  >
                    <Eye size={17} />
                    Review Product
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ================= REVIEW MODAL ================= */}
        <AnimatePresence mode="wait">
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 z-50 flex items-center mt-36 justify-center bg-black/70 px-4 py-6 backdrop-blur-md sm:px-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 35, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 25, scale: 0.96 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-900 p-5 shadow-2xl shadow-black/50 sm:p-7"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

                <motion.button
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelectedProduct(null)}
                  className="absolute right-4 top-4 rounded-xl border border-white/5 bg-white/[0.03] p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={20} />
                </motion.button>

                <div className="pr-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Product Review</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Selected Product Details
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Review the product information before approving or rejecting the request.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mt-6 grid gap-3 sm:grid-cols-2"
                >
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Title</p>
                    <p className="mt-2 break-words font-medium text-white">{selectedProduct.title || '-'}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Price</p>
                    <p className="mt-2 break-words font-medium text-white">{selectedProduct.price ?? '-'}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Category</p>
                    <p className="mt-2 break-words font-medium text-white">{selectedProduct.category || '-'}</p>
                  </div>

                  <div className="rounded-2xl border border-amber-400/10 bg-amber-400/[0.03] p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Status</p>
                    <p className="mt-2 font-medium capitalize text-amber-300">
                      {selectedProduct.verificationStatus || '-'}
                    </p>
                  </div>

                  {/* If your IProduct model has a description field, show it here */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:col-span-2">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Description</p>
                    <p className="mt-2 break-words text-sm leading-6 text-white">
                      {selectedProduct.description || '-'}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
                >
                  <motion.button
                    onClick={handleApproved}
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -1 }}
                    whileTap={{ scale: loading ? 1 : 0.97 }}
                    className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-slate-950 transition-colors ${
                      loading ? 'cursor-not-allowed bg-emerald-400/50' : 'bg-emerald-400 hover:bg-emerald-300'
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Approving...
                      </>
                    ) : (
                      'Approve'
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={openRejectReasonArea}
                    disabled={loading}
                    className="rounded-xl bg-red-400 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Reject
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedProduct(null)}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= REJECT REASON POPUP ================= */}
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
                <h3 className="text-xl font-semibold text-white">Reject Reason</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Please enter a reason for rejecting this product.
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
                    disabled={!rejectedReason.trim() || loading}
                    className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? 'Rejecting...' : 'Confirm Reject'}
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

export default ProductRequest