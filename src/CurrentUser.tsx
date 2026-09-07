"use client";
import React from "react";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import useGetAllVendors from "./hooks/useGetAllVendors";
import useGetAllProducts from "./hooks/useGetAllProducts";
import useGetAllOrders from "./hooks/useGetAllOrders";

function CurrentUser() {
  useGetCurrentUser();
  useGetAllVendors();
  useGetAllProducts();
  useGetAllOrders();
  return null;
}

export default CurrentUser;
