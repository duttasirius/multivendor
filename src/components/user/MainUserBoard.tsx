import React from "react";
import CategorySlider from "./CategorySlider";
import UserDashBoard from "./UserDashBoard";

import ProductCardPage from "./ProductCardPage";
import ShopPage from "@/app/shop/page";
import FAQ from "./FAQPage";
import FAQPage from "./FAQPage";
import Testimonial from "@/components/user/Testimonial";
import AIChat from "./AIChat";
import TrustedBand from "./TrustredBand";
import Price from "./Price";
import WhyMultiCart from "./WhyMultiCart";
import Newsletter from "./Newsletter";

function MainUserBoard() {
  return (
    <div className="w-full">
      <UserDashBoard />
      <CategorySlider />
      <ProductCardPage />
      <AIChat />
      <ShopPage />
      <FAQPage />
      <Testimonial />
      <TrustedBand />
      <Price />
      <WhyMultiCart />
      <Newsletter />
    </div>
  );
}

export default MainUserBoard;
