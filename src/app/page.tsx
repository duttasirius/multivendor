import { auth } from "@/auth";

import AdminDashBoard from "@/components/admin/AdminDashBoard";
import EditRoleAndPhone from "@/components/EditRoleAndPhone";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MainUserBoard from "@/components/user/MainUserBoard";
import EditVendorDetails from "@/components/vendor/EditVendorDetails";
import VendorPage from "@/components/vendor/VendorPage";

import connectDB from "@/lib/connectDB";
import User from "@/model/user.model";

import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  await connectDB();

  // Get the current logged-in session
  const session = await auth();

  // Find the user from the database
  const user = await User.findById(session?.user?.id);

  // If no user exists, send them to login
  if (!user) {
    redirect("/login");
  }

  // Check if the user still needs to select role or phone
  const inComplete =
    !user.role || !user.phone || (!user.phone && user.role === "user");

  if (inComplete) {
    return <EditRoleAndPhone />;
  }

  // Check if vendor details are incomplete
  if (user.role === "vendor") {
    const inCompleteDetails =
      !user.shopName || !user.shopAddress || !user.gstNumber;

    if (inCompleteDetails) {
      return <EditVendorDetails />;
    }
  }

  // Convert MongoDB user document into a plain JavaScript object
  const plainUser = JSON.parse(JSON.stringify(user));

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white flex flex-col min-h-screen">
      {/* Show Navbar for everyone */}
      <div
        className={user.role === "user" ? "w-full" : "hidden lg:block w-full"}
      >
        {/* 
          User:
          Navbar is visible on all screen sizes.

          Vendor/Admin:
          Navbar is hidden on small screens
          and visible on large screens.
        */}
        <Navbar user={plainUser} />
      </div>

      {/* Show the correct dashboard based on the user's role */}
      {user.role === "user" ? (
        <MainUserBoard />
      ) : user.role === "vendor" ? (
        <VendorPage user={plainUser} />
      ) : (
        <AdminDashBoard />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
