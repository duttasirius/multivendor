"use client";

import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";
import {
  User2,
  Mail,
  Phone,
  Store,
  MapPin,
  FileText,
  Package,
  Edit3,
  Settings,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setUserData } from "@/redux/userSlice";

function Profile() {
  // Get the latest logged-in user information.
  useGetCurrentUser();

  // Get user data from Redux.
  const user = useSelector((state: RootState) => state.user.userData);

  // Router helps us move between pages.
  const router = useRouter();

  // These states control which edit section is visible.
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditShop, setShowEditShop] = useState(false);

  // Profile image states.
  const [previewImage, setPreviewImage] = useState<string>(user?.image || "");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  // User profile form states.
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  // Shop form states.
  const [shopName, setShopName] = useState(user?.shopName || "");
  const [shopAddress, setShopAddress] = useState(user?.shopAddress || "");
  const [gstNumber, setGstNumber] = useState(user?.gstNumber || "");
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch<AppDispatch>()

  // Create a preview URL when the user selects a new image.
  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

// loading user details if have
useEffect(() => {
  if (user) {
    setName(user.name || "");
    setPhone(user.phone || "");

    setPreviewImage(user.image || "");

    setShopName(user.shopName || "");
    setShopAddress(user.shopAddress || "");
    setGstNumber(user.gstNumber || "");
  }
}, [user]);


const handleVerifyAgain = async()=>{
    setLoading(true)
    if (!shopName || !shopAddress || !gstNumber) {
      alert("All fields are required");
      return;
    }

    try {
      const result = await axios.post('/api/vendor/verify-again',{shopName , shopAddress, gstNumber});
      setLoading(false)
      alert(" SHOP DETAILS UPDATED SUCCESSFULLY")
      router.push('/')
      setShopName("")
      setShopAddress("")
      setGstNumber("")

    } catch (error) {
      console.log(error)
    }
  }


  const handleUpdateProfile = async () => {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("phone", phone);

  if (profileImage) {
    formData.append("image", profileImage);
  }

  setLoading(true);

  try {
    const result = await axios.post(
      "/api/user/update-profile",
      formData
    );

   

    // API returns { updateUser: {...} }
    dispatch(setUserData(result.data.updateUser));
    alert("PROFILE UPDATED SUCCESSFULLY");
    router.push('/')

  } catch (error) {
    console.error(error);
  } finally {
    // Always stop loading, even if the request fails.
    setLoading(false);
  }
};

  return (
    // Main page wrapper with dark background and spacing.
    <div className="min-h-screen bg-slate-950 px-4 py-24 text-white">
      
      {/* Decorative background glow. This is only for visual styling. */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-0 top-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* Main profile card. It fades and moves upward when the page loads. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-8"
      >

        {/* Profile header containing image, name, email and role. */}
        <div className="flex flex-col items-center text-center">

          {/* Profile image container with a small entrance animation. */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Gradient ring around the profile image. */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-sm" />

            {/* Actual profile image area. */}
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-slate-900 bg-slate-800 sm:h-32 sm:w-32">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="Profile"
                  width={140}
                  height={140}
                  className="h-full w-full object-cover"
                />
              ) : (
                // Show this icon when the user does not have a profile image.
                <div className="flex h-full w-full items-center justify-center">
                  <User2 size={50} className="text-slate-400" />
                </div>
              )}
            </div>
          </motion.div>

          {/* User name. */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-2xl font-bold sm:text-3xl"
          >
            {user?.name || "User"}
          </motion.h2>

          {/* User email. */}
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
            <Mail size={15} />
            {user?.email || "No email available"}
          </p>

          {/* User role badge. */}
          <span className="mt-4 rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
            {user?.role || "user"}
          </span>
        </div>

        {/* Account information section. */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          {/* Section title. */}
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Account Information
          </h3>

          {/* Account information cards are placed in two columns on larger screens. */}
          <div className="grid gap-3 sm:grid-cols-2">

            {/* Phone information card. */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-indigo-500/40">
              <div className="flex items-center gap-3">

                {/* Phone icon box. */}
                <div className="rounded-lg bg-indigo-500/10 p-3 text-indigo-400">
                  <Phone size={20} />
                </div>

                {/* Phone text. */}
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="truncate font-medium text-slate-200">
                    {user?.phone || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Email information card. */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-purple-500/40">
              <div className="flex items-center gap-3">

                {/* Email icon box. */}
                <div className="rounded-lg bg-purple-500/10 p-3 text-purple-400">
                  <Mail size={20} />
                </div>

                {/* Email text. */}
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="truncate font-medium text-slate-200">
                    {user?.email || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vendor information is shown only when the user's role is vendor. */}
        {user?.role === "vendor" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            {/* Vendor section title. */}
            <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-400">
              Shop Information
            </h3>

            {/* Shop information cards. */}
            <div className="space-y-3">

              {/* Shop name card. */}
              <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-emerald-500/40">
                <div className="rounded-lg bg-emerald-500/10 p-3 text-emerald-400">
                  <Store size={21} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">Shop Name</p>
                  <p className="font-medium text-slate-200">
                    {user.shopName || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Shop address card. */}
              <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-blue-500/40">
                <div className="rounded-lg bg-blue-500/10 p-3 text-blue-400">
                  <MapPin size={21} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">Shop Address</p>
                  <p className="font-medium text-slate-200">
                    {user.shopAddress || "Not provided"}
                  </p>
                </div>
              </div>

              {/* GST number card. */}
              <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-orange-500/40">
                <div className="rounded-lg bg-orange-500/10 p-3 text-orange-400">
                  <FileText size={21} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">GST Number</p>
                  <p className="font-medium uppercase text-slate-200">
                    {user.gstNumber || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action buttons section. */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid gap-3 sm:grid-cols-2"
        >
          {/* Buttons for normal users. */}
          {user?.role === "user" && (
            <>
              {/* Orders button. */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/orders")}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold transition hover:bg-indigo-500"
              >
                <Package size={19} />
                My Orders
              </motion.button>

              {/* Edit profile button. */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowEditProfile((prev) => !prev);
                }}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3.5 font-semibold text-slate-200 transition hover:bg-slate-700"
              >
                <Edit3 size={19} />
                Edit Profile
              </motion.button>
            </>
          )}

          {/* Buttons for vendors. */}
          {user?.role === "vendor" && (
            <>
              {/* Vendor profile edit button. */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowEditShop(false);
                  setShowEditProfile((prev) => !prev);
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold transition hover:bg-indigo-500"
              >
                <Edit3 size={19} />
                Edit Profile
              </motion.button>

              {/* Shop details edit button. */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowEditProfile(false);
                  setShowEditShop((prev) => !prev);
                }}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3.5 font-semibold text-slate-200 transition hover:bg-slate-700"
              >
                <Settings size={19} />
                Edit Shop Details
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Edit profile form appears with a simple fade and slide animation. */}
        <AnimatePresence mode="wait">
          {showEditProfile && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50 p-5"
            >
              {/* Edit profile heading. */}
              <h3 className="mb-6 text-xl  text-center font-semibold">
                Edit Profile
              </h3>

              {/* Profile image upload area. */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 flex flex-col items-center"
              >
                {/* Preview selected profile image. */}
                <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-slate-700 bg-slate-800">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt="Selected profile"
                      width={120}
                      height={120}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    // Show User2 icon when no image has been selected.
                    <div className="flex h-full w-full items-center justify-center">
                      <User2 size={40} className="text-slate-400" />
                    </div>
                  )}
                </div>

                {/* Image upload button. */}
                <label className="mt-4 cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium transition hover:bg-indigo-500">
                  Choose Image

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handlePreviewImage}
                  />
                </label>
              </motion.div>

              {/* Profile input fields. */}
              <div className="space-y-4">

                {/* Name input. */}
                <div>
                  <label className="mb-1 block text-sm text-slate-400">
                    Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
                  />
                </div>

                {/* Phone input. */}
                <div>
                  <label className="mb-1 block text-sm text-slate-400">
                    Phone
                  </label>

                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
                  />
                </div>

                {/* Update profile button. */}
                <motion.button
  onClick={handleUpdateProfile}
  whileHover={{ y: loading ? 0 : -2 }}
  whileTap={{ scale: loading ? 1 : 0.98 }}
  disabled={loading}
  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
>
  {loading ? (
    <>
      {/* Spinner shows while the profile is being updated */}
      <Loader2 className="h-5 w-5 animate-spin" />

      <span>Updating...</span>
    </>
  ) : (
    <span>Update Profile</span>
  )}
</motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit shop form appears only when showEditShop is true. */}
        <AnimatePresence>
          {showEditShop && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50 p-5"
            >
              {/* Edit shop heading. */}
              <h3 className="mb-6 text-xl font-semibold">
                Edit Shop Details
              </h3>

              {/* Shop input fields. */}
              <div className="space-y-4">

                {/* Shop name input. */}
                <div>
                  <label className="mb-1 block text-sm text-slate-400">
                    Shop Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter Shop Name"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
                  />
                </div>

                {/* Shop address input. */}
                <div>
                  <label className="mb-1 block text-sm text-slate-400">
                    Shop Address
                  </label>

                  <input
                    type="text"
                    placeholder="Enter Shop Address"
                    value={shopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
                  />
                </div>

                {/* GST input. */}
                <div>
                  <label className="mb-1 block text-sm text-slate-400">
                    GST Number
                  </label>

                  <input
                    type="text"
                    placeholder="Enter GST Number"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
                  />
                </div>

                {/* Update shop button. */}
            <motion.button
  whileHover={{ y: loading ? 0 : -2 }}
  whileTap={{ scale: loading ? 1 : 0.98 }}
  onClick={handleVerifyAgain}
  disabled={loading}
  className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 font-semibold transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-70"
>
  {loading ? (
    <>
      {/* Lucide loading icon spins while the request is running */}
      <Loader2 className="h-5 w-5 animate-spin" />

      <span>Updating...</span>
    </>
  ) : (
    <>
      {/* Edit/update icon shown normally */}
      <Settings className="h-5 w-5" />

      <span>Update Shop Details</span>
    </>
  )}
</motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Profile;